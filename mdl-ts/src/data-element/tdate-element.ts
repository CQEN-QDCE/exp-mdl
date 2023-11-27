import { DataElement } from "./data-element";
import { DateTimeElement } from "./date-time-element";

export class TDateElement extends DateTimeElement {

    constructor(value: Date) {
        super(value, DataElement.DateTimeMode.tdate);
    }
}