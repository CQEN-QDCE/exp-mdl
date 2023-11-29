import { DataElement } from "./data-element";

export class DateTimeElement extends DataElement<Date> {

    constructor(value: Date, subType: DataElement.DateTimeMode = DataElement.DateTimeMode.tdate) {
        super(value, new DataElement.DatetimeAttribute(subType));
    }
}