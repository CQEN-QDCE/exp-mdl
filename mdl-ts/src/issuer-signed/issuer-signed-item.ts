import { CborByteString } from "../cbor/types/cbor-byte-string";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborNumber } from "../cbor/types/cbor-number";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { SecureRandom } from "../utils/secure-random";
import { CborConvertible } from "../cbor/cbor-convertible";
import { Text } from "../utils/text";


export class IssuerSignedItem implements CborConvertible {

    public constructor(public readonly digestID: number, 
                        public readonly randomSalt: ArrayBuffer, 
                        public readonly elementIdentifier: string, 
                        public readonly elementValue: CborDataItem) {
    }

    public static build(digestID: number, elementIdentifier: string, elementValue: CborDataItem): IssuerSignedItem {
        return new IssuerSignedItem(digestID, 
                                    new Uint8Array(Text.encode(SecureRandom.generate(16))).buffer, 
                                    elementIdentifier, 
                                    elementValue);
    }
    
    toMapElement(): CborMap {
        const cborMap = new CborMap();
        cborMap.set('digestID', new CborNumber(this.digestID));
        cborMap.set('random', new CborByteString(this.randomSalt));
        cborMap.set('elementIdentifier', new CborTextString(this.elementIdentifier));
        cborMap.set('elementValue', this.elementValue);
        return cborMap;
    }

    static fromMapElement(cborMap: CborMap): IssuerSignedItem {
        const digestID = cborMap.get('digestID');
        const random = cborMap.get('random');
        const elementIdentifier = cborMap.get('elementIdentifier');
        const elementValue = cborMap.get('elementValue');
        return new IssuerSignedItem(digestID.getValue(), random.getValue(), elementIdentifier.getValue(), elementValue);
    }

    fromCborDataItem(dataItem: CborDataItem): IssuerSignedItem {
        const cborMap = <CborMap>dataItem;
        const digestID = cborMap.get('digestID');
        const random = cborMap.get('random');
        const elementIdentifier = cborMap.get('elementIdentifier');
        const elementValue = cborMap.get('elementValue');
        return new IssuerSignedItem(digestID.getValue(), random.getValue(), elementIdentifier.getValue(), elementValue);
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        cborMap.set('digestID', new CborNumber(this.digestID));
        cborMap.set('random', new CborByteString(this.randomSalt));
        cborMap.set('elementIdentifier', new CborTextString(this.elementIdentifier));
        cborMap.set('elementValue', this.elementValue);
        return cborMap;
    }

}