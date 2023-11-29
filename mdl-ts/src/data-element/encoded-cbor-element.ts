import { DataElement } from "./data-element";

export class EncodedCBORElement extends DataElement<Buffer> {
    constructor(value: Buffer) {
        super(value, new DataElement.Attribute(DataElement.Type.encodedCbor));
    }

    decode(): DataElement {
        return DataElement.fromCBOR(this._value)
    }
}