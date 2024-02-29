import { CborDataItem } from "../cbor-data-item";
import { CborEncoder } from "../cbor-encoder";

export class CborEncodedDataItem implements CborDataItem {

    readonly majorType: number;

    private data: ArrayBuffer;

    constructor(value: ArrayBuffer) {
        this.data = value;
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.encodedCbor).type;
    }

    public getValue(): ArrayBuffer {
        return this.data;
    }

    static encode(dataElement: CborDataItem): CborEncodedDataItem {
        return new CborEncodedDataItem(CborEncoder.encode(dataElement));
    }
    
}