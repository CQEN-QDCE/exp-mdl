import { DataElement } from "../data-element/data-element";
import { EncodedCBORElement } from "../data-element/encoded-cbor-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { StringElement } from "../data-element/string-element";
import { IssuerSignedItem } from "../issuer-signed-item";
import { DeviceKeyInfo } from "../mso/device-key-info";
import { ValidityInfo } from "../mso/validity-info";
import { DigestAlgorithm } from "./digest-algorithm.enum";

// Mobile security object, representing the payload of the issuer signature, for the issuer signed part of the mdoc.
export class MSO {

    private version: StringElement;
    private digestAlgorithm: StringElement;
    private valueDigests: MapElement;
    private deviceKeyInfo: DeviceKeyInfo;
    private docType: StringElement;
    private validityInfo: ValidityInfo;

    constructor(version: StringElement, 
                digestAlgorithm: StringElement,
                valueDigests: MapElement,
                deviceKeyInfo: DeviceKeyInfo,
                docType: StringElement,
                validityInfo: ValidityInfo) {
        this.version = version;
        this.digestAlgorithm = digestAlgorithm;
        this.valueDigests = valueDigests;
        this.deviceKeyInfo = deviceKeyInfo;
        this.docType = docType;
        this.validityInfo = validityInfo;
    }

    getValueDigestsFor(nameSpace: string): Map<number, Buffer> {
        let nameSpaceElement = this.valueDigests.value.get(new MapKey(nameSpace));
        if (!nameSpaceElement) return new  Map<number, Buffer>();
        dfefsd
    }

    get nameSpaces(): string[] {
        let keys = this.valueDigests.value.keys;
        let nameSpaces: string[] = [];
        for (let key of keys) {
            nameSpaces.push(key.)
        }
        return nameSpaces;
    }

    toMapElement(): MapElement {
        let map = new Map<MapKey, DataElement>();
        map.set(new MapKey('version'), this.version);
        map.set(new MapKey('digestAlgorithm'), this.digestAlgorithm);
        map.set(new MapKey('valueDigests'), this.valueDigests);
        map.set(new MapKey('deviceKeyInfo'), this.deviceKeyInfo.toMapElement());
        map.set(new MapKey('docType'), this.docType);
        map.set(new MapKey('validityInfo'), this.validityInfo.toMapElement());
        return new MapElement(map);
    }

    verifySignedItems(nameSpace: string, items: EncodedCBORElement[]): boolean {
        let msoDigests = this.getValueDigestsFor(nameSpace);
        let algorithm: DigestAlgorithm = DigestAlgorithm[this.digestAlgorithm.value];
        return items.all {
            val digestId = it.decode<IssuerSignedItem>().digestID.value.toInt()
            return msoDigests.containsKey(digestId) && msoDigests[digestId]!!.contentEquals(digestItem(it, algorithm))
        }
    }

    digestItem(encodedItem: EncodedCBORElement, digestAlgorithm: DigestAlgorithm): Buffer {
        return digestAlgorithm.getHasher().digest(encodedItem.toCBOR()).bytes
    }

    static createFor(nameSpaces: Map<string, IssuerSignedItem[]>,
        deviceKeyInfo: DeviceKeyInfo,
        docType: string,
        validityInfo: ValidityInfo,
        digestAlgorithm: DigestAlgorithm = DigestAlgorithm.SHA256): MSO {
        let valueDigests = new MapElement(null);
        let mso = new MSO(new StringElement('1.0'), new StringElement(digestAlgorithm.toString()), valueDigests, deviceKeyInfo, new StringElement(docType), validityInfo);
        return mso;
    }
}