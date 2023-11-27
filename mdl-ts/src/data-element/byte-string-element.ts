import { DataElement } from "./data-element";

export class ByteStringElement extends DataElement<Buffer> {

    constructor(value: Buffer) {
        super(value, new DataElement.Attribute(DataElement.Type.textString));
    }
}