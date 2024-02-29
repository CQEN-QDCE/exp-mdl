import { CborDataItem2 } from "./cbor-data-item2";

export class CborFullDate extends CborDataItem2 {

    constructor(private value: Date, mode: CborDataItem2.FullDateMode = CborDataItem2.FullDateMode.string) {
        super(new CborDataItem2.FullDateAttribute(mode));
    }
    
    public getValue(): Date {
        return this.value;
    }

}