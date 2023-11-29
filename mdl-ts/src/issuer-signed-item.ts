import { ByteStringElement } from "./data-element/byte-string-element";
import { DataElement } from "./data-element/data-element";
import { MapElement } from "./data-element/map-element";
import { MapKey } from "./data-element/map-key";
import { NumberElement } from "./data-element/number-element";
import { StringElement } from "./data-element/string-element";
import { SecureRandom } from "./secure-random";

export class IssuerSignedItem {

    digestID: NumberElement;
    random: ByteStringElement;
    elementIdentifier: StringElement;
    elementValue: DataElement;

    constructor(digestID: NumberElement, 
                random: ByteStringElement, 
                elementIdentifier: StringElement, 
                elementValue: DataElement) {
        this.digestID = digestID;
        this.random = random;
        this.elementIdentifier = elementIdentifier;
        this.elementValue = elementValue;
    }
    
    toMapElement(): MapElement {
        let map = new Map<MapKey, DataElement>();
        map.set(new MapKey('digestID'), this.digestID);
        map.set(new MapKey('random'), this.random);
        map.set(new MapKey('elementIdentifier'), this.elementIdentifier);
        map.set(new MapKey('elementValue'), this.elementValue);
        return new MapElement(map);
    }

    static fromMapElement(element: MapElement): IssuerSignedItem {
        let digestID = element.value.get(new MapKey('digestID'));
        let random = element.value.get(new MapKey('random'));
        let elementIdentifier = element.value.get(new MapKey('elementIdentifier'));
        let elementValue = element.value.get(new MapKey('elementValue'));
        return new IssuerSignedItem(digestID, random, elementIdentifier, elementValue);
    }

    static createWithRandomSalt(digestID: number, elementIdentifier: string, elementValue: DataElement): IssuerSignedItem {
        return new IssuerSignedItem(new NumberElement(digestID), 
                                    new ByteStringElement(Buffer.from(SecureRandom.generate(16), 'utf-8')), 
                                    new StringElement(elementIdentifier), 
                                    elementValue);
    }
}