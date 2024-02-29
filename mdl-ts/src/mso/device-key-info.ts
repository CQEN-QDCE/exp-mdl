import { CoseKey } from "../cose/cose-key";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborMap } from "../cbor/types/cbor-map";

export class DeviceKeyInfo {

    private deviceKey: CoseKey | null = null;
    private keyAuthorizations: CborMap | null = null;
    private keyInfo: CborMap | null = null;

    constructor(deviceKey: CoseKey, 
                keyAuthorizations: CborMap | null = null, 
                keyInfo: CborMap | null = null) {
        this.deviceKey = deviceKey;
        this.keyAuthorizations = keyAuthorizations;
        this.keyInfo = keyInfo;
    }

    static fromMapElement(cborMap: CborMap): DeviceKeyInfo {
        const deviceKey = cborMap.get('deviceKey');
        const keyAuthorizations = cborMap.get('keyAuthorizations');
        const keyInfo = cborMap.get('keyInfo');
        return new DeviceKeyInfo(deviceKey.getValue() === null ? null : CborDataItem.to(CoseKey, <CborMap>deviceKey), <CborMap>keyAuthorizations, <CborMap>keyInfo);
    }
    
    toMapElement(): CborMap {
        const cborMap = new CborMap();
        cborMap.set('deviceKey', CborDataItem.from(this.deviceKey));
        if (this.keyAuthorizations) cborMap.set('keyAuthorizations', this.keyAuthorizations);
        if (this.keyInfo) cborMap.set('keyInfo', this.keyInfo);
        return cborMap;
    }
}