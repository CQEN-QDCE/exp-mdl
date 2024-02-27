import { Cbor } from "../cbor/cbor";
import { CoseKey } from "../cose/cose-key";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";

export class DeviceKeyInfo {

    private deviceKey: CoseKey | null = null;
    private keyAuthorizations: MapElement | null = null;
    private keyInfo: MapElement | null = null;

    constructor(deviceKey: CoseKey, 
                keyAuthorizations: MapElement | null = null, 
                keyInfo: MapElement | null = null) {
        this.deviceKey = deviceKey;
        this.keyAuthorizations = keyAuthorizations;
        this.keyInfo = keyInfo;
    }

    static fromMapElement(element: MapElement): DeviceKeyInfo {
        const deviceKey = element.get(new MapKey('deviceKey'));
        const keyAuthorizations = element.get(new MapKey('keyAuthorizations'));
        const keyInfo = element.get(new MapKey('keyInfo'));
        return new DeviceKeyInfo(deviceKey.getValue() === null ? null : CborDataItem2.to(CoseKey, <MapElement>deviceKey), <MapElement>keyAuthorizations, <MapElement>keyInfo);
    }
    
    toMapElement(): MapElement {
        const map = new Map<MapKey, CborDataItem2>();
        map.set(new MapKey('deviceKey'), CborDataItem2.from(this.deviceKey));
        if (this.keyAuthorizations) map.set(new MapKey('keyAuthorizations'), this.keyAuthorizations);
        if (this.keyInfo) map.set(new MapKey('keyInfo'), this.keyInfo);
        return new MapElement(map);
    }
}