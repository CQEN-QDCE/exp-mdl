import { COSEMac0 } from "../cose/cose-mac-0";
import { COSESign1 } from "../cose/cose-sign-1";
import { DataElement } from "../data-element/data-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";

export class DeviceAuth {

    private deviceMac: COSEMac0;

    private deviceSignature: COSESign1;

    constructor(deviceMac: COSEMac0 | null = null, deviceSignature: COSESign1 | null = null) {
        this.deviceMac = deviceMac;
        this.deviceSignature = deviceSignature;
    }

    toMapElement(): MapElement {
        let map = new Map<MapKey, DataElement>();
        map.set(new MapKey('deviceMac'), this.deviceMac.toDataElement());
        map.set(new MapKey('deviceSignature'), this.deviceSignature.toDataElement());
        return new MapElement(map);
    }

    static fromMapElement(mapElement: MapElement): DeviceAuth {
        let deviceMac = mapElement.value.get(new MapKey('deviceMac'));
        if (!deviceMac) deviceMac = null;
        let deviceSignature = mapElement.value.get(new MapKey('deviceSignature'));
        if (!deviceSignature) deviceSignature = null;
        return new DeviceAuth(new COSEMac0(deviceMac.value), new COSESign1(deviceSignature.value));
    }
}