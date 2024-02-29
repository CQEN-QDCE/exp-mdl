import { CborConvertable } from "../cbor/cbor-convertable";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { CborEncodedDataItem } from "../data-element/cbor-encoded-data-item";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { DeviceAuth } from "./device-auth";

export class DeviceSigned implements CborConvertable {
    
    private nameSpaces: CborEncodedDataItem;
    
    public deviceAuth: DeviceAuth;

    constructor(nameSpaces: CborEncodedDataItem, deviceAuth: DeviceAuth) {
        this.nameSpaces = nameSpaces;
        this.deviceAuth = deviceAuth;
    }

    fromCborDataItem(dataItem: CborDataItem2): DeviceSigned {
        const mapElement = <MapElement>dataItem;
        const nameSpaces = mapElement.get(new MapKey('nameSpaces')) as CborEncodedDataItem;
        const deviceAuth = mapElement.get(new MapKey('deviceAuth'));
        return new DeviceSigned(nameSpaces, DeviceAuth.fromMapElement(<MapElement>deviceAuth));
    }

    toCborDataItem(): CborDataItem2 {
        const map = new Map<MapKey, CborDataItem2>();
        map.set(new MapKey('nameSpaces'), this.nameSpaces);
        map.set(new MapKey('deviceAuth'), this.deviceAuth.toMapElement());
        return new MapElement(map);
    }

}