import { Cbor } from "../cbor/cbor";
import { COSEMac0 } from "../cose/cose-mac-0";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { ListElement } from "../data-element/list-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";

export class DeviceAuth {

    deviceMac: COSEMac0;

    deviceSignature: COSESign1;

    constructor(deviceMac: COSEMac0 | null = null, deviceSignature: COSESign1 | null = null) {
        this.deviceMac = deviceMac;
        this.deviceSignature = deviceSignature;
    }

    toMapElement(): MapElement {
        const map = new Map<MapKey, CborDataItem2>();
        if (this.deviceMac) map.set(new MapKey('deviceMac'), CborDataItem2.from(this.deviceMac));
        if (this.deviceSignature) map.set(new MapKey('deviceSignature'), CborDataItem2.from(this.deviceSignature));
        return new MapElement(map);
    }

    static fromMapElement(mapElement: MapElement): DeviceAuth {
        let deviceMac = mapElement.get(new MapKey('deviceMac'));
        if (!deviceMac) deviceMac = null;
        let deviceSignature = mapElement.get(new MapKey('deviceSignature'));
        if (!deviceSignature) deviceSignature = null;
        return new DeviceAuth(CborDataItem2.to(COSEMac0, new ListElement(deviceMac.getValue())), 
                              deviceSignature ? CborDataItem2.to(COSESign1, new ListElement(deviceSignature.getValue())) : null);
    }
}