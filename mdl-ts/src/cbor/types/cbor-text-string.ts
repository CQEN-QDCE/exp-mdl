import { CborDataItem } from "../cbor-data-item";

export class CborTextString extends String implements CborDataItem {

    readonly majorType: number;

    constructor(value: string) {
        super(value);
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.textString).type;
    }

    public getValue(): string {
        return this.valueOf();
    }
    
}