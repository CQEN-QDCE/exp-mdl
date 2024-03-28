import { CoseKey } from "../cose/cose-key";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborConvertible } from "../cbor/cbor-convertible";

export class DeviceKeyInfo implements CborConvertible {

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

    fromCborDataItem(dataItem: CborDataItem): DeviceKeyInfo {
        const cborMap = dataItem as CborMap;
        const deviceKey = cborMap.get('deviceKey');
        const keyAuthorizations = cborMap.get('keyAuthorizations');
        const keyInfo = cborMap.get('keyInfo');
        return new DeviceKeyInfo(deviceKey.getValue() === null ? null : CborDataItem.to(CoseKey, <CborMap>deviceKey), <CborMap>keyAuthorizations, <CborMap>keyInfo);
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        cborMap.set('deviceKey', CborDataItem.from(this.deviceKey));
        if (this.keyAuthorizations) cborMap.set('keyAuthorizations', this.keyAuthorizations);
        if (this.keyInfo) cborMap.set('keyInfo', this.keyInfo);
        return cborMap;
    }
}