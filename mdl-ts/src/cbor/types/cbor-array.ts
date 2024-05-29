import { CborDataItem } from "../cbor-data-item";
import { CborBoolean } from "./cbor-boolean";
import { CborByteString } from "./cbor-byte-string";
import { CborEncodedDataItem } from "./cbor-encoded-data-item";
import { CborNil } from "./cbor-nil";
import { CborNumber } from "./cbor-number";
import { CborMap } from "./cbor-map";

/*
export class CborArray extends Array<CborArray | CborNumber | CborBoolean | CborNil | CborByteString | CborByteString | CborEncodedDataItem | MapElement> implements CborDataItem {
    majorType: number;
    constructor(...value: (CborArray | CborNumber | CborBoolean | CborNil | CborByteString | CborByteString | CborEncodedDataItem | MapElement)[]) {
        super();
        this.push(...value);
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.list).type;
    }

    public getValue(): CborDataItem[] {
        return this;
    }
}
*/
export class CborArray extends Array<CborDataItem> implements CborDataItem {
    majorType: number;
    constructor(...value: (CborArray | CborNumber | CborBoolean | CborNil | CborByteString | CborByteString | CborEncodedDataItem | CborMap)[]) {
        super();
        this.push(...value);
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.list).type;
    }

    public getValue(): CborDataItem[] {
        return this;
    }
}