import cbor, { Tagged } from 'cbor';
import { CborMap } from './types/cbor-map';
import { CborDataItem } from './cbor-data-item';
import { CborEncodedDataItem } from './types/cbor-encoded-data-item';
import { TDateElement } from './types/tdate-element';
import { CborArray } from './types/cbor-array';

export class CborEncoder {

    static encode(dataItem: CborDataItem): ArrayBuffer {
        const object: unknown = CborEncoder.convertToPlainObject(dataItem);
        return cbor.encode(object);
    }

    private static convertToPlainObject(dataItem: CborDataItem): any {
        if (dataItem instanceof CborMap) {
            return CborEncoder.convertToMap(dataItem);
        } else if (dataItem instanceof CborArray) {
            return CborEncoder.convertToArray(dataItem);
        } else if (dataItem instanceof CborEncodedDataItem) {
            return new EncodedCBOR(dataItem.getValue());
        } else if (dataItem instanceof TDateElement) {
            return new TDate(dataItem.getValue());
        } else {
            return dataItem.getValue();
        }
    }

    private static convertToMap(cborMap: CborMap): Map<string | number, any> {
        const map = new Map<string | number, any>();
        for (const [key, dataItem] of cborMap) {
            if (dataItem === null) continue;
            map.set(key, CborEncoder.convertToPlainObject(dataItem));
        }
        return map;
    }

    private static convertToArray(cborArray: CborArray): any[] {
        const array: any[] = [];
        for (const cborDataItem of cborArray) {
            array.push(CborEncoder.convertToPlainObject(cborDataItem));
        }
        return array;
    }
}

class EncodedCBOR {
    private value: ArrayBuffer;
    constructor(value: ArrayBuffer) {
      this.value = value;
    }
  
    encodeCBOR(encoder) {
      const tagged = new Tagged(24, this.value);
      return encoder.pushAny(tagged)
    }
}

class TDate {
    private value: Date;
    constructor(value: Date) {
      this.value = value;
    }
  
    encodeCBOR(encoder) {
      const tagged = new Tagged(0, this.value.toISOString());
      return encoder.pushAny(tagged)
    }
}
