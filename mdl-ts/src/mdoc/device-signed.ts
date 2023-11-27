import { DataElement } from "../data-element/data-element";
import { EncodedCBORElement } from "../data-element/encoded-cbor-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { DeviceAuth } from "./device-auth";

export class DeviceSigned {
    private nameSpaces: EncodedCBORElement;
    private deviceAuth: DeviceAuth;
    constructor(nameSpaces: EncodedCBORElement, deviceAuth: DeviceAuth) {
        this.nameSpaces = nameSpaces;
        this.deviceAuth = deviceAuth;
    }

    toMapElement(): MapElement {
        let map = new Map<MapKey, DataElement>();
        map.set(new MapKey('nameSpaces'), this.nameSpaces);
        map.set(new MapKey('deviceAuth'), this.deviceAuth.toMapElement());
        return new MapElement(map);
    }

    static fromMapElement(mapElement: MapElement): DeviceSigned {
        let nameSpaces = mapElement.value.get(new MapKey('nameSpaces')) as EncodedCBORElement;
        let deviceAuth = DeviceAuth.fromMapElement(mapElement.value.get(new MapKey('deviceAuth')));
        return new DeviceSigned(nameSpaces, deviceAuth);
    }
}