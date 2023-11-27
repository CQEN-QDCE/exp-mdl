import { DataElement } from "./data-element";

export class NullElement extends DataElement<null> {

    constructor() {
        super(null, new DataElement.Attribute(DataElement.Type.nil));
    }
}