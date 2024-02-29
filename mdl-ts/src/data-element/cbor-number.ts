import { CborDataItem2 } from "./cbor-data-item2";

export class CborNumber extends CborDataItem2 {

    constructor(private value: number) {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.number));
    }
    
    public getValue(): number {
        return this.value;
    }

}