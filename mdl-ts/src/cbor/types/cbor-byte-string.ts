import { CborDataItem } from "../cbor-data-item";

export class CborByteString implements CborDataItem {

    readonly majorType: number;
    
    private data: ArrayBuffer;

    constructor(value: ArrayBuffer) {
        this.data = value;
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.byteString).type;
    }

    public getValue(): ArrayBuffer {
        return this.data;
    }
    
}