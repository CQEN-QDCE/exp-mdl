import { CborByteString } from "../cbor/types/cbor-byte-string";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborDecoder } from "../cbor/cbor-decoder";
import { CborMap } from "../cbor/types/cbor-map";
import { CborNumber } from "../cbor/types/cbor-number";
import { CoseHeaderLabel } from "./cose-header-label.enum";
import { CoseHeaders } from "./cose-headers";
import { CoseAlgorithm } from "./cose-algorithm.enum";
import { CborEncoder } from "../cbor/cbor-encoder";

export abstract class COSEObject<T> {

    // TODO: Remove this.
    protected dataElements: CborDataItem[] = [];

    protected readonly coseHeaders = new CoseHeaders();

    protected content: ArrayBuffer | null = null;

    constructor() {
    }

    get headers(): CoseHeaders {
        return this.coseHeaders;
    }

    get payload(): ArrayBuffer | null {
        return this.content;
    }

    get x5Chain(): ArrayBuffer | null {
        return this.headers.x5Chain.value;
    }

    get protectedHeader(): ArrayBuffer {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        return (<CborByteString>this.dataElements[0]).getValue();
    }

    get algorithm(): number {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        const protectedHeaderMapElement = <CborMap>CborDecoder.decode(this.protectedHeader);
        const numberElement = <CborNumber>protectedHeaderMapElement.get(CoseHeaderLabel.ALG);
        return numberElement.getValue();
    }

    get signatureOrTag(): ArrayBuffer {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        return (<CborByteString>this.dataElements[3]).getValue();
    }

    abstract detachPayload(): T;

    abstract attachPayload(payload: Buffer): T

    protected encodeProtectedHeaders(): ArrayBuffer {
        const cborMap = new CborMap();
        cborMap.set(CoseHeaderLabel.ALG, new CborNumber(this.headers.algorithm.value));
        return CborEncoder.encode(cborMap);
    }

    protected decodeProtectedHeaders(protectedHeaders: CborByteString): void {
        for(const [key, cborDataItem] of CborDecoder.decode(protectedHeaders.getValue()) as CborMap) {
            switch(key) {
                case CoseHeaderLabel.ALG:
                    this.headers.algorithm.value = cborDataItem.getValue() as CoseAlgorithm;
                    break;
            }
        };
    }

    protected encodeUnprotectedHeaders(): CborMap {
        const cborMap = new CborMap();
        if (this.headers.x5Chain.value) {
            cborMap.set(CoseHeaderLabel.X5_CHAIN, new CborByteString(this.headers.x5Chain.value));
        }
        return cborMap;
    }

    protected decodeUnprotectedHeaders(unprotectedHeaders: CborMap): void {
        for(const [key, cborDataItem] of unprotectedHeaders) {
            switch(key) {
                case CoseHeaderLabel.ALG:
                    throw new Error('Algorithm must be in protected headers');
                 case CoseHeaderLabel.X5_CHAIN:
                    this.headers.x5Chain.value = cborDataItem.getValue();
                    break;
                }
        };
    }

}