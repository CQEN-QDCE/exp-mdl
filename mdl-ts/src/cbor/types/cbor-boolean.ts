import { CborDataItem } from "../cbor-data-item";

export class CborBoolean extends Boolean implements CborDataItem {

    readonly majorType: number;

    constructor(value: boolean) {
        super(value);
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.boolean).type;
    }

    public getValue(): boolean {
        return this.valueOf();
    }
    
}

