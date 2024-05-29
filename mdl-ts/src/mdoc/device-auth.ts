import { COSEMac0 } from "../cose/cose-mac-0";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborArray } from "../cbor/types/cbor-array";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborConvertible } from "../cbor/cbor-convertible";

export class DeviceAuth implements CborConvertible {
 
    deviceMac: COSEMac0;

    deviceSignature: COSESign1;

    constructor(deviceMac: COSEMac0 | null = null, deviceSignature: COSESign1 | null = null) {
        this.deviceMac = deviceMac;
        this.deviceSignature = deviceSignature;
    }
    
    fromCborDataItem(dataItem: CborDataItem): DeviceAuth {
        const cborMap = <CborMap>dataItem;
        let deviceMac = cborMap.get('deviceMac');
        if (!deviceMac) deviceMac = null;
        let deviceSignature = cborMap.get('deviceSignature');
        if (!deviceSignature) deviceSignature = null;
        return new DeviceAuth(CborDataItem.to(COSEMac0, <CborArray>deviceMac), 
                              deviceSignature ? CborDataItem.to(COSESign1, <CborArray>deviceSignature) : null);
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        if (this.deviceMac) cborMap.set('deviceMac', CborDataItem.from(this.deviceMac));
        if (this.deviceSignature) cborMap.set('deviceSignature', CborDataItem.from(this.deviceSignature));
        return new CborMap(cborMap);
    }
}