import { CborDataItem2 } from "./cbor-data-item2";

export class ListElement extends CborDataItem2 {
    
    constructor(private value: CborDataItem2[] = []) {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.list));
    }

    public getValue(): CborDataItem2[] {
        return this.value;
    }

}