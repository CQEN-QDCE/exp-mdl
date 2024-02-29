import { CborDataItem2 } from "./cbor-data-item2";
import { CborDecoder } from '../cbor/cbor-decoder';
import { CborEncoder } from "../cbor/cbor-encoder";

export class CborEncodedDataItem extends CborDataItem2 {
    
    constructor(private value: ArrayBuffer) {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.encodedCbor));
    }

    static encode(dataElement: CborDataItem2): CborEncodedDataItem {
        return new CborEncodedDataItem(CborEncoder.encode(dataElement));
    }

    decode(): CborDataItem2 {
        return CborDecoder.decode(this.value);
    }

    public getValue(): ArrayBuffer {
        return this.value;
    }
    
}