import { Crypto } from "@peculiar/webcrypto";
import { CborByteString } from "../cbor/types/cbor-byte-string";
import { COSEObject } from "./cose-object";
import { CborDecoder } from "../cbor/cbor-decoder";
import { CoseHeaderLabel } from "./cose-header-label.enum";
import { CoseAlgorithm } from "./cose-algorithm.enum";
import { CborMap } from "../cbor/types/cbor-map";
import { CborEncoder } from "../cbor/cbor-encoder";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborNumber } from "../cbor/types/cbor-number";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { CborConvertible } from "../cbor/cbor-convertible";
import { CborArray } from "../cbor/types/cbor-array";

export class COSESign1 extends COSEObject<COSESign1> implements CborConvertible {
   
    private readonly crypto = new Crypto();

    private readonly context = 'Signature1';

    private signature: ArrayBuffer  | null = null;

    constructor() {
        super();
    }

    detachPayload(): COSESign1 {
        this.content = null;
        return this;
    }

    attachPayload(payload: ArrayBuffer): COSESign1 {
        this.content = payload;
        return this;
    }

    public async sign(privateKey: CryptoKey): Promise<void> {

        const cborArray = new CborArray();

        cborArray.push(new CborTextString(this.context));
        cborArray.push(new CborByteString(this.encodeProtectedHeaders()));
        cborArray.push(new CborByteString(new ArrayBuffer(0)));
        cborArray.push(new CborByteString(this.content));

        this.signature = await this.crypto.subtle.sign(this.getAlgorithm(), privateKey, CborEncoder.encode(cborArray));
    }

    public async verify(publicKey: CryptoKey): Promise<boolean> {

        const cborArray = new CborArray();

        cborArray.push(new CborTextString(this.context));
        cborArray.push(new CborByteString(this.encodeProtectedHeaders()));
        cborArray.push(new CborByteString(new ArrayBuffer(0)));
        cborArray.push(new CborByteString(this.content));

        return await this.crypto.subtle.verify(this.getAlgorithm(), publicKey, this.signature, CborEncoder.encode(cborArray));
    }

    private getAlgorithm(): AlgorithmIdentifier | RsaPssParams | EcdsaParams {
        return CoseAlgorithm.toSubtleCryptoAlgorithm(this.headers.algorithm.value);
    }

    private encodeProtectedHeaders(): ArrayBuffer {
        const cborMap = new CborMap();
        cborMap.set(CoseHeaderLabel.ALG, new CborNumber(this.headers.algorithm.value));
        return CborEncoder.encode(cborMap);
    }

    private decodeProtectedHeaders(protectedHeaders: CborByteString, message: COSESign1): void {
        for(const [key, cborDataItem] of CborDecoder.decode(protectedHeaders.getValue()) as CborMap) {
            switch(key) {
                case CoseHeaderLabel.ALG:
                    message.headers.algorithm.value = cborDataItem.getValue() as CoseAlgorithm;
                    break;
            }
        };
    }

    private encodeUnprotectedHeaders(): CborMap {
        const cborMap = new CborMap();
        if (this.headers.x5Chain.value) {
            cborMap.set(CoseHeaderLabel.X5_CHAIN, new CborByteString(this.headers.x5Chain.value));
        }
        return cborMap;
    }

    private decodeUnprotectedHeaders(unprotectedHeaders: CborMap, message: COSESign1): void {
        for(const [key, cborDataItem] of unprotectedHeaders) {
            switch(key) {
                case CoseHeaderLabel.ALG:
                    throw new Error('Algorithm must be in protected headers');
                 case CoseHeaderLabel.X5_CHAIN:
                    message.headers.x5Chain.value = cborDataItem.getValue();
                    break;
                }
        };
    }

    fromCborDataItem(dataItem: CborDataItem): COSESign1 {
        const cborArray = dataItem as CborArray;
        const message = new COSESign1();
        this.decodeProtectedHeaders(cborArray[0] as CborByteString, message);
        this.decodeUnprotectedHeaders(cborArray[1] as CborMap, message);
        message.dataElements = cborArray.getValue();
        message.content = cborArray[2].getValue();
        message.signature = cborArray[3].getValue();
        return message;
    }

    toCborDataItem(): CborDataItem {
        const cborArray = new CborArray();
        cborArray.push(new CborByteString(this.encodeProtectedHeaders()));
        cborArray.push(this.encodeUnprotectedHeaders());
        cborArray.push(new CborByteString(this.content));
        cborArray.push(new CborByteString(this.signature));
        return cborArray;
    }
}