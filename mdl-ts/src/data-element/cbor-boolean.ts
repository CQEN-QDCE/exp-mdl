import { CborDataItem2 } from "./cbor-data-item2";

export class CborBoolean extends CborDataItem2 implements Boolean {

    constructor(private value: boolean) {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.boolean));
    }

    valueOf(): boolean {
        return this.value;
    }

    public getValue(): boolean {
        return this.value;
    }
    
}

