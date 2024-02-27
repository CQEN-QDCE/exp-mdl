import { CborDataItem2 } from "./cbor-data-item2";

export class CborNil extends CborDataItem2 {
    
    private readonly value: null = null;

    constructor() {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.nil));
    }
    
    public getValue(): null {
        return this.value;
    }

}