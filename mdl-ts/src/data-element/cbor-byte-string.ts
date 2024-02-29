import { CborDataItem2 } from "./cbor-data-item2";

export class CborByteString extends CborDataItem2 {
    
    constructor(private readonly value: ArrayBuffer) {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.byteString));
    }

    public getValue(): ArrayBuffer {
        return this.value;
    }
   
}