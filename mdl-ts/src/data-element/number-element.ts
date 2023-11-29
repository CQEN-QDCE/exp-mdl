import { DataElement } from "./data-element";

export class NumberElement extends DataElement<number> {

    constructor(value: number) {
        super(value, new DataElement.Attribute(DataElement.Type.number));
    }
}