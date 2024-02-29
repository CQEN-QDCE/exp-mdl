import cbor, { Tagged } from 'cbor';
import { MapElement } from '../data-element/map-element';
import { CborDataItem2 } from '../data-element/cbor-data-item2';
import { ListElement } from '../data-element/list-element';
import { MapKeyType } from '../data-element/map-key-type.enum';
import { CborEncodedDataItem } from '../data-element/cbor-encoded-data-item';
import { TDateElement } from '../data-element/tdate-element';

export class CborEncoder {

    static encode(dataItem: CborDataItem2): ArrayBuffer {
        const object: unknown = CborEncoder.convertToPlainObject(dataItem);
        return cbor.encode(object);
    }

    private static convertToPlainObject(dataItem: CborDataItem2): any {
        if (dataItem instanceof MapElement) {
            return CborEncoder.convertToMap(dataItem);
        } else if (dataItem instanceof ListElement) {
            return CborEncoder.convertToArray(dataItem);
        } else if (dataItem instanceof CborEncodedDataItem) {
            return new EncodedCBOR(dataItem.getValue());
        } else if (dataItem instanceof TDateElement) {
            return new TDate(dataItem.getValue());
        } else {
            return dataItem.getValue();
        }
    }

    private static convertToMap(cborMap: MapElement): Map<string | number, any> {
        const map = new Map<string | number, any>();
        for (const [mapKey, dataElement] of cborMap.getValue()) {
            if (dataElement === null) continue;
            if (mapKey.type == MapKeyType.string) map.set(mapKey.str, CborEncoder.convertToPlainObject(dataElement));
            if (mapKey.type == MapKeyType.int) map.set(mapKey.int, CborEncoder.convertToPlainObject(dataElement));
        }
        return map;
    }

    private static convertToArray(listElement: ListElement): any[] {
        const array: any[] = [];
        for (const dataElement of listElement.getValue()) {
            array.push(CborEncoder.convertToPlainObject(dataElement));
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
