import { CborDataItem } from "../cbor-data-item";

export class CborNil implements CborDataItem {

    readonly majorType: number;

    constructor() {
        this.majorType = 0;
    }

    get type(): CborDataItem.Type {
        return new CborDataItem.Attribute(CborDataItem.Type.nil).type;
    }

    public getValue(): null {
        return null;
    }
    
}

