import { CborDataItem } from "../cbor-data-item";

export class CborNumber extends Number implements CborDataItem {

    readonly majorType: number;

    constructor(value: number) {
        super(value);
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.number).type;
    }

    public getValue(): number {
        return this.valueOf();
    }
    
}