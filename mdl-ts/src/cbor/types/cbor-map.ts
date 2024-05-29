import { CborDataItem } from "../cbor-data-item";

export class CborMap extends Map<string | number, CborDataItem> implements CborDataItem {

    majorType: number;

    constructor(value2: Map<string | number, CborDataItem> = new Map<string | number, CborDataItem>()) {
        super();
        for (const [key, value] of value2) {
            this.set(key, value);
        }
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.map).type;
    }

    public getValue(): Map<string | number, CborDataItem> {
        const map = new Map<string | number, CborDataItem>();
        this.forEach((value, key) => {
            map.set(key, value);
        });
        return map;
    }

}