import { CborDataItem2 } from "./cbor-data-item2";
import { MapKey } from "./map-key";

export class MapElement extends CborDataItem2 {

    constructor(private value: Map<MapKey, CborDataItem2>) {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.map));
    }

    get(mapKey: MapKey): CborDataItem2 {
        for (const [key, value] of this.value) {
            if (key.str === mapKey.str) return value;
        }
        return null;
    }

    public getValue(): Map<MapKey, CborDataItem2> {
        return this.value;
    }

}