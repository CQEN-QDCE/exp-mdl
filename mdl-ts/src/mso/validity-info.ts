import { DataElement } from "../data-element/data-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { TDateElement } from "../data-element/tdate-element";

export class ValidityInfo {

    private signed: TDateElement;
    private validFrom: TDateElement;
    private validUntil: TDateElement;
    private expectedUpdate: TDateElement | null = null;

    constructor(signed: Date, 
                validFrom: Date, 
                validUntil: Date,
                expectedUpdate: Date | null = null) {
        this.signed = new TDateElement(signed);
        this.validFrom = new TDateElement(validFrom);
        this.validUntil = new TDateElement(validUntil);
        this.expectedUpdate = expectedUpdate ? new TDateElement(expectedUpdate) : null;
    }

    toMapElement(): MapElement {
        let map = new Map<MapKey, DataElement>();
        map.set(new MapKey('signed'), this.signed);
        map.set(new MapKey('validFrom'), this.validFrom);
        map.set(new MapKey('validUntil'), this.validUntil);
        if (this.expectedUpdate) map.set(new MapKey('expectedUpdate'), this.expectedUpdate);
        return new MapElement(map);
    }
}