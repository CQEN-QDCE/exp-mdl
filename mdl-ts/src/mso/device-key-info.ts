import { DataElement } from "../data-element/data-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";

export class DeviceKeyInfo {

    private deviceKey: MapElement;
    private keyAuthorizations: MapElement | null = null;
    private keyInfo: MapElement | null = null;

    constructor(deviceKey: MapElement, 
                keyAuthorizations: MapElement | null = null, 
                keyInfo: MapElement | null = null) {
        this.deviceKey = deviceKey;
        this.keyAuthorizations = keyAuthorizations;
        this.keyInfo = keyInfo;
    }

    toMapElement(): MapElement {
        let map = new Map<MapKey, DataElement>();
        map.set(new MapKey('deviceKey'), this.deviceKey);
        map.set(new MapKey('keyAuthorizations'), this.keyAuthorizations);
        map.set(new MapKey('keyInfo'), this.keyInfo);
        return new MapElement(map);
    }
}