import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { TDateElement } from "../data-element/tdate-element";

export class ValidityInfo {

    signed: TDateElement;
    validFrom: TDateElement;
    validUntil: TDateElement;
    expectedUpdate: TDateElement | null = null;

    constructor(signed: Date, 
                validFrom: Date, 
                validUntil: Date,
                expectedUpdate: Date | null = null) {
        this.signed = new TDateElement(signed);
        this.validFrom = new TDateElement(validFrom);
        this.validUntil = new TDateElement(validUntil);
        this.expectedUpdate = expectedUpdate ? new TDateElement(expectedUpdate) : null;
    }
    
    static fromMapElement(element: MapElement): ValidityInfo {
        const signed = element.get(new MapKey('signed'));
        const validFrom = element.get(new MapKey('validFrom'));
        const validUntil = element.get(new MapKey('validUntil'));
        const expectedUpdate = element.get(new MapKey('expectedUpdate'));
        return new ValidityInfo((<TDateElement>signed).getValue(), (<TDateElement>validFrom).getValue(), (<TDateElement>validUntil).getValue(), expectedUpdate ? (<TDateElement>expectedUpdate).getValue() : null);
    }

    toMapElement(): MapElement {
        const map = new Map<MapKey, CborDataItem2>();
        map.set(new MapKey('signed'), this.signed);
        map.set(new MapKey('validFrom'), this.validFrom);
        map.set(new MapKey('validUntil'), this.validUntil);
        if (this.expectedUpdate) map.set(new MapKey('expectedUpdate'), this.expectedUpdate);
        return new MapElement(map);
    }
}