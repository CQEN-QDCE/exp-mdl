import { CborConvertible } from "../cbor/cbor-convertible";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { TDateElement } from "../cbor/types/tdate-element";

export class ValidityInfo implements CborConvertible {

    constructor(public readonly signed: Date, 
                public readonly validFrom: Date, 
                public readonly  validUntil: Date,
                public readonly  expectedUpdate: Date | null = null) {
    }

    fromCborDataItem(dataItem: CborDataItem): ValidityInfo {
        const cborMap = dataItem as CborMap;
        const signed = cborMap.get('signed') as TDateElement;
        const validFrom = cborMap.get('validFrom') as TDateElement;
        const validUntil = cborMap.get('validUntil') as TDateElement;
        const expectedUpdate = cborMap.get('expectedUpdate') as TDateElement;
        return new ValidityInfo(signed.getValue(), 
                                validFrom.getValue(), 
                                validUntil.getValue(), 
                                expectedUpdate ? expectedUpdate.getValue() : null);
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        cborMap.set('signed', new TDateElement(this.signed));
        cborMap.set('validFrom', new TDateElement(this.validFrom));
        cborMap.set('validUntil', new TDateElement(this.validUntil));
        if (this.expectedUpdate) cborMap.set('expectedUpdate', new TDateElement(this.expectedUpdate));
        return cborMap;
    }
}