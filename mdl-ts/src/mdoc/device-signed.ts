import { CborConvertible } from "../cbor/cbor-convertible";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { DeviceAuth } from "./device-auth";

export class DeviceSigned implements CborConvertible {
    
    private nameSpaces: CborEncodedDataItem;
    
    public deviceAuth: DeviceAuth;

    constructor(nameSpaces: CborEncodedDataItem, deviceAuth: DeviceAuth) {
        this.nameSpaces = nameSpaces;
        this.deviceAuth = deviceAuth;
    }

    fromCborDataItem(dataItem: CborDataItem): DeviceSigned {
        const mapElement = <CborMap>dataItem;
        const nameSpaces = mapElement.get('nameSpaces') as CborEncodedDataItem;
        const deviceAuth = mapElement.get('deviceAuth');
        return new DeviceSigned(nameSpaces, CborDataItem.to(DeviceAuth, <CborMap>deviceAuth));
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        cborMap.set('nameSpaces', this.nameSpaces);
        cborMap.set('deviceAuth', CborDataItem.from(this.deviceAuth));
        return cborMap;
    }

}