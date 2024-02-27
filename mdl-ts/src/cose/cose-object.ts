import { CborByteString } from "../data-element/cbor-byte-string";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { CborDecoder } from "../cbor/cbor-decoder";
import { ListElement } from "../data-element/list-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { CborNumber } from "../data-element/cbor-number";
import { CoseHeaderLabel } from "./cose-header-label.enum";
import { CoseHeaders } from "./cose-headers";

export abstract class COSEObject<T> {

    protected dataElements: CborDataItem2[] = [];

    protected readonly coseHeaders = new CoseHeaders();

    protected content: ArrayBuffer | null = null;

    constructor() {
    }

    get headers(): CoseHeaders {
        return this.coseHeaders;
    }

    public setContent(content: ArrayBuffer): void {
        this.content = content;
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
        const protectedHeaderMapElement = <MapElement>CborDecoder.decode(this.protectedHeader);
        const numberElement = <CborNumber>protectedHeaderMapElement.get(new MapKey(CoseHeaderLabel.ALG));
        return numberElement.getValue();
    }

    get signatureOrTag(): ArrayBuffer {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        return (<CborByteString>this.dataElements[3]).getValue();
    }

    protected replacePayload(payloadElement: CborDataItem2): CborDataItem2[] {
        const newData: CborDataItem2[] = [];
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