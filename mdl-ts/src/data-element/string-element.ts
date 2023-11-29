import { DataElement } from "./data-element";

export class StringElement extends DataElement<string> {

    constructor(value: string) {
        super(value, new DataElement.Attribute(DataElement.Type.textString));
    }
}