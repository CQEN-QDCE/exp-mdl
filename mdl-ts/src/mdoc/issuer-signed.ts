import { COSESign1 } from "../cose/cose-sign-1";
import { DataElement } from "../data-element/data-element";
import { EncodedCBORElement } from "../data-element/encoded-cbor-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";

export class IssuerSigned {

    private nameSpaces: Map<string, EncodedCBORElement[]>;
    private issuerAuth: COSESign1;
    
    constructor(nameSpaces: Map<string, EncodedCBORElement[]>, issuerAuth: COSESign1) {
        this.nameSpaces = nameSpaces;
        this.issuerAuth = issuerAuth;
    }

    toMapElement(): MapElement {
        let map = new Map<MapKey, DataElement>();
        map.set(new MapKey('deviceMac'), this.deviceMac.toDataElement());
        map.set(new MapKey('issuerAuth'), this.issuerAuth.toDataElement());
        return new MapElement(map);
    }
}