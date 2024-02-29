import { CborDataItem } from "../cbor-data-item";

export class DateTimeElement implements CborDataItem {

    constructor(private value: Date, private subType: CborDataItem.DateTimeMode = CborDataItem.DateTimeMode.tdate) {
    }
    
    majorType: number;

    get type(): CborDataItem.Type {
        return new CborDataItem.DatetimeAttribute(this.subType).type;
    }

    public getValue(): Date {
        return this.value;
    }

}