import { ByteStringElement } from "../data-element/byte-string-element";
import { DataElement } from "../data-element/data-element";
import { ListElement } from "../data-element/list-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { COSEConstants } from "./cose-constants";

export abstract class COSESimpleBase<T> {

    protected dataElements: DataElement[] = [];

    constructor(dataElements: DataElement[]) {
        this.dataElements = dataElements;
    }

    get payload(): Buffer | null {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        if (this.dataElements[2].type === DataElement.Type.nil) return null;
        if (this.dataElements[2].type === DataElement.Type.byteString) return (<ByteStringElement>this.dataElements[2]).value
        throw 'Invalid COSE_Sign1 payload.';
    }

    get x5Chain(): Buffer | null {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        let unprotectedHeader = this.dataElements[1] as MapElement;
        let x5Chain = unprotectedHeader.value.get(new MapKey(COSEConstants.X5_CHAIN)) as ByteStringElement;
        return x5Chain.value;
    }

    get protectedHeader(): Buffer {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        return (<ByteStringElement>this.dataElements[0]).value;
    }

    get algorithm(): number {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        DataElement.fromCBOR
        return -1;
    }

    get signatureOrTag(): Buffer {
        if (this.dataElements.length !== 4) throw 'Invalid COSE_Sign1/COSE_Mac0 array.';
        return (<ByteStringElement>this.dataElements[3]).value;
    }

    protected replacePayload(payloadElement: DataElement): DataElement[] {
        throw 'Not implemented';
    }

    abstract detachPayload(): T;

    abstract attachPayload(payload: Buffer): T

    toDataElement(): ListElement {
        return new ListElement(this.dataElements);
    }

    toCBOR(): Buffer {
        return this.toDataElement().toCBOR();
    }

    toCBORHex(): string {
        return this.toDataElement().toCBORHex();
    }
}