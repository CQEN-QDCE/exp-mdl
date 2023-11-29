import { DataElement } from "./data-element";

export class ListElement extends DataElement<DataElement[]> {
    constructor(value: DataElement[]) {
        super(value, new DataElement.Attribute(DataElement.Type.list));
    }
}