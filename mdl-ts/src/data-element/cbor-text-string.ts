import { CborDataItem2 } from "./cbor-data-item2";

export class CborTextString extends CborDataItem2 {

    constructor(private value: string) {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.textString));
    }
    
    public getValue(): string {
        return this.value;
    }

}