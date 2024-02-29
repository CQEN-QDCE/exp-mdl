import { CborDataItem } from "./cbor-data-item";
import { CborDecoder } from "./cbor-decoder";
import { CborEncoder } from "./cbor-encoder";
import { CborConvertible } from "./cbor-convertible";

export class Cbor {

    public static encode(obj: CborConvertible | CborDataItem): ArrayBuffer {
        if ((<CborConvertible>obj).toCborDataItem !== undefined) {
            return CborEncoder.encode((<CborConvertible>obj).toCborDataItem());
        }
        if (obj instanceof CborDataItem) {
            return CborEncoder.encode(obj);
        }
        throw new Error("Invalid object");
    }

    public static decode<T extends CborConvertible>(type: Constructable<T>, data: ArrayBuffer): T {
        const dataItem = CborDecoder.decode(data);
        const unInitializedIntance = new type();
        const instance = <T>unInitializedIntance.fromCborDataItem(dataItem);
        if (instance === unInitializedIntance) throw new Error("Invalid data item");
        return instance;
    }
}

interface Constructable<T> {
    new (...args: any[]): T;
}