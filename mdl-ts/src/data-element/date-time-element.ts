import { CborDataItem2 } from "./cbor-data-item2";

export class DateTimeElement extends CborDataItem2 {

    constructor(private value: Date, subType: CborDataItem2.DateTimeMode = CborDataItem2.DateTimeMode.tdate) {
        super(new CborDataItem2.DatetimeAttribute(subType));
    }

    public getValue(): Date {
        return this.value;
    }

}