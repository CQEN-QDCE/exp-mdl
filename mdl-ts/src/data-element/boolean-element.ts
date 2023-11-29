import { DataElement } from "./data-element";

export class BooleanElement extends DataElement<boolean> {

    constructor(value: boolean) {
        super(value, new DataElement.Attribute(DataElement.Type.boolean));
    }
}