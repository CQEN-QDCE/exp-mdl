import { CborByteString } from "../cbor/types/cbor-byte-string";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborEncoder } from "../cbor/cbor-encoder";
import { CborMap } from "../cbor/types/cbor-map";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { ArrayBufferComparer } from "../utils/array-buffer-comparer";
import { COSEObject } from "./cose-object";
import { CoseAlgorithm } from "./cose-algorithm.enum";
import { CborConvertible } from "../cbor/cbor-convertible";
import { CborArray } from "../cbor/types/cbor-array";
import rs from "jsrsasign";
import { Hex } from "../utils/hex";

export class COSEMac0 extends COSEObject<COSEMac0> implements CborConvertible {
   
    private readonly context = 'MAC0';

    private digest: ArrayBuffer | null = null;

    constructor() {
        super();
        this.headers.algorithm.value = CoseAlgorithm.HMAC256;
    }

    detachPayload(): COSEMac0 {
        this.content = null;
        return this;
    }

    attachPayload(payload: ArrayBuffer): COSEMac0 {
        this.content = payload;
        return this;
    }

    public async mac(secret: ArrayBuffer, externalData: ArrayBuffer = new ArrayBuffer(0)): Promise<void> {
        
        //const algorithm = CoseAlgorithm.toSubtleCryptoAlgorithm(this.headers.algorithm.value);

        const cborArray = new CborArray();

        cborArray.push(new CborTextString(this.context));
        cborArray.push(new CborByteString(this.encodeProtectedHeaders()));
        cborArray.push(new CborByteString(externalData));
        cborArray.push(new CborByteString(this.content));

        const mac = new rs.KJUR.crypto.Mac({alg: "HmacSHA256", "pass": {"hex": Hex.encode(secret)}});
        mac.updateHex(Hex.encode(CborEncoder.encode(cborArray)));
        this.digest = Hex.decode(mac.doFinal());
    }

    get tag(): ArrayBuffer {
        return this.digest;
    }

    public async verify(sharedSecret: ArrayBuffer, externalData: ArrayBuffer = new ArrayBuffer(0)): Promise<boolean> {
        
        if (!this.payload) throw 'No payload given.';
        
        if (this.headers.algorithm.value !== CoseAlgorithm.HMAC256_64 && 
            this.headers.algorithm.value !== CoseAlgorithm.HMAC256) {
            throw 'Algorithm currently not supported, only supported algorithm is HMAC256.';
        }
        
        //const algorithm = CoseAlgorithm.toSubtleCryptoAlgorithm(this.headers.algorithm.value);

        const cborArray = new CborArray();

        cborArray.push(new CborTextString(this.context));
        cborArray.push(new CborByteString(this.encodeProtectedHeaders()));
        cborArray.push(new CborByteString(externalData));
        cborArray.push(new CborByteString(this.content));

        const data = CborEncoder.encode(cborArray);

        const mac1 = new rs.KJUR.crypto.Mac({alg: "HmacSHA256", "pass": {"hex":  Hex.encode(sharedSecret)}});
        mac1.updateHex(Hex.encode(data));
        const tag = Hex.decode(mac1.doFinal());

        return ArrayBufferComparer.equals(this.tag, tag);
    }

    fromCborDataItem(dataItem: CborDataItem): COSEMac0 {
        const cborArray = dataItem as CborArray;
        const message = new COSEMac0();
        message.decodeProtectedHeaders(cborArray[0] as CborByteString);
        message.decodeUnprotectedHeaders(cborArray[1] as CborMap);
        message.dataElements = cborArray.getValue();
        message.content = cborArray[2].getValue();
        message.digest = cborArray[3].getValue();
        return message;
    }

    toCborDataItem(): CborDataItem {
        const cborArray = new CborArray();
        cborArray.push(new CborByteString(this.encodeProtectedHeaders()));
        cborArray.push(this.encodeUnprotectedHeaders());
        cborArray.push(new CborByteString(this.content));
        cborArray.push(new CborByteString(this.tag));
        return cborArray;
    }
}