import { Crypto } from "@peculiar/webcrypto";
import { CborByteString } from "../data-element/cbor-byte-string";
import { COSEObject } from "./cose-object";
import { ListElement } from "../data-element/list-element";
import { CborDecoder } from "../cbor/cbor-decoder";
import { CoseHeaderLabel } from "./cose-header-label.enum";
import { CoseAlgorithm } from "./cose-algorithm.enum";
import { MapElement } from "../data-element/map-element";
import { CborEncoder } from "../cbor/cbor-encoder";
import { MapKey } from "../data-element/map-key";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { CborNumber } from "../data-element/cbor-number";
import { CborTextString } from "../data-element/cbor-text-string";
import { CborConvertable } from "../cbor/cbor-convertable";

export class COSESign1 extends COSEObject<COSESign1> implements CborConvertable {
   
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
        const crypto = new Crypto();
        // TODO: Faire une mappage avec this.headers.algorithm.value
        const algo =   {
            name: "ECDSA",
            hash: { name: "SHA-256" },
        };
        const cborArray = [];
        cborArray.push(new CborTextString(this.context));
        cborArray.push(new CborByteString(this.encodeProtectedHeaders()));
        cborArray.push(new CborByteString(new ArrayBuffer(0)));
        cborArray.push(new CborByteString(this.content));
        const data = CborEncoder.encode(new ListElement(cborArray));
        this.signature = await crypto.subtle.sign(algo, privateKey, data);
    }

    public async verify(publicKey: CryptoKey): Promise<boolean> {
        const crypto = new Crypto();
        // TODO: Faire une mappage avec this.headers.algorithm.value
        const algo =   {
            name: "ECDSA",
            hash: { name: "SHA-256" },
        };
        const cborArray = [];
        cborArray.push(new CborTextString(this.context));
        cborArray.push(new CborByteString(this.encodeProtectedHeaders()));
        cborArray.push(new CborByteString(new ArrayBuffer(0)));
        cborArray.push(new CborByteString(this.content));
        const data = CborEncoder.encode(new ListElement(cborArray));
        return await crypto.subtle.verify(algo, publicKey, this.signature, data);
    }

    private encodeProtectedHeaders(): ArrayBuffer {
        let map = new Map<MapKey, CborDataItem2>();
        map.set(new MapKey(CoseHeaderLabel.ALG), new CborNumber(this.headers.algorithm.value));
        return CborEncoder.encode(new MapElement(map));
    }

    private decodeProtectedHeaders(protectedHeaders: CborByteString, message: COSESign1): void {
        for(const [key, value] of CborDecoder.decode(protectedHeaders.getValue()).getValue()) {
            switch(key.int) {
                case CoseHeaderLabel.ALG:
                    message.headers.algorithm.value = <CoseAlgorithm>value.asValue();
                    break;
            }
        };
    }

    private decodeUnprotectedHeaders(unprotectedHeaders: MapElement, message: COSESign1): void {
        for(const [key, value] of unprotectedHeaders.getValue()) {
            switch(key.int) {
                case CoseHeaderLabel.ALG:
                    throw new Error('Algorithm must be in protected headers');
                 case CoseHeaderLabel.X5_CHAIN:
                    message.headers.x5Chain.value = value.getValue();
                    break;
                }
        };
    }

    fromCborDataItem(dataItem: CborDataItem2): COSESign1 {
        const dataElement = <ListElement>dataItem;
        const message = new COSESign1();
        this.decodeProtectedHeaders(dataElement.getValue()[0], message);
        this.decodeUnprotectedHeaders(<MapElement>dataElement.getValue()[1], message);
        message.dataElements = dataElement.getValue();
        message.content = dataElement.getValue()[2].getValue();
        message.signature = dataElement.getValue()[3].getValue();
        return message;
    }

    toCborDataItem(): CborDataItem2 {
        let list: CborDataItem2[] = [];
        list.push(new CborByteString(this.encodeProtectedHeaders()));
        let map = new Map<MapKey, CborDataItem2>();
        if (this.headers.x5Chain.value) {
            map.set(new MapKey(CoseHeaderLabel.X5_CHAIN), new CborByteString(this.headers.x5Chain.value));
        }
        list.push(new MapElement(new Map<MapKey, CborDataItem2>()));
        list.push(new CborByteString(this.content));
        list.push(new CborByteString(this.signature));
        return new ListElement(list);
    }
}