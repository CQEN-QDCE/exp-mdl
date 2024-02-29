import { CborDataItem2 } from "./cbor-data-item2";
import { DateTimeElement } from "./date-time-element";

export class TDateElement extends DateTimeElement {

    constructor(value: Date) {
        super(value, CborDataItem2.DateTimeMode.tdate);
    }
    
}