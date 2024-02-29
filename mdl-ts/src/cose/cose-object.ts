import { CborByteString } from "../cbor/types/cbor-byte-string";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborDecoder } from "../cbor/cbor-decoder";
import { CborMap } from "../cbor/types/cbor-map";
import { CborNumber } from "../cbor/types/cbor-number";
import { CoseHeaderLabel } from "./cose-header-label.enum";
import { CoseHeaders } from "./cose-headers";

export abstract class COSEObject<T> {

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

    protected replacePayload(payloadElement: CborDataItem): CborDataItem[] {
        const newData: CborDataItem[] = [];
        for (let i = 0; i < this.dataElements.length; i++) {
            if (i === 2) {
                newData.push(payloadElement);
            } else {
                newData.push(this.dataElements[i]);
            }
        }
        this.dataElements = newData;
        return newData;
    }

    abstract detachPayload(): T;

    abstract attachPayload(payload: Buffer): T

}