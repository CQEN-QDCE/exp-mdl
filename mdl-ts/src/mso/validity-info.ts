import { CborMap } from "../cbor/types/cbor-map";
import { TDateElement } from "../cbor/types/tdate-element";

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
    
    static fromMapElement(cborMap: CborMap): ValidityInfo {
        const signed = cborMap.get('signed');
        const validFrom = cborMap.get('validFrom');
        const validUntil = cborMap.get('validUntil');
        const expectedUpdate = cborMap.get('expectedUpdate');
        return new ValidityInfo((<TDateElement>signed).getValue(), (<TDateElement>validFrom).getValue(), (<TDateElement>validUntil).getValue(), expectedUpdate ? (<TDateElement>expectedUpdate).getValue() : null);
    }

    toMapElement(): CborMap {
        const cborMap = new CborMap();
        cborMap.set('signed', this.signed);
        cborMap.set('validFrom', this.validFrom);
        cborMap.set('validUntil', this.validUntil);
        if (this.expectedUpdate) cborMap.set('expectedUpdate', this.expectedUpdate);
        return cborMap;
    }
}