import { CborDataItem } from "../cbor-data-item";
import { DateTimeElement } from "./date-time-element";

export class TDateElement extends DateTimeElement {

    constructor(value: Date) {
        super(value, CborDataItem.DateTimeMode.tdate);
    }
    
}