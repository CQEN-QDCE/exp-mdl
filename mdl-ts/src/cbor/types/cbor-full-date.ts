import { CborDataItem } from "../cbor-data-item";

export class CborFullDate implements CborDataItem {

    constructor(private value: Date, private mode: CborDataItem.FullDateMode = CborDataItem.FullDateMode.string) {
    }
    majorType: number;
    
    get type(): CborDataItem.Type {
        return new CborDataItem.FullDateAttribute(this.mode).type;
    }

    public getValue(): Date {
        return this.value;
    }

}