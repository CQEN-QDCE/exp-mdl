import { CborByteString } from "../data-element/cbor-byte-string";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { CborEncodedDataItem } from "../data-element/cbor-encoded-data-item";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { CborTextString } from "../data-element/cbor-text-string";
import { DeviceKeyInfo } from "../mso/device-key-info";
import { IssuerSignedItem } from "../issuer-signed/issuer-signed-item";
import { ValidityInfo } from "../mso/validity-info";
import { DigestAlgorithm } from "./digest-algorithm.enum";
import { Crypto } from "@peculiar/webcrypto";
import { CborEncoder } from "../cbor/cbor-encoder";
import { ArrayBufferComparer } from "../utils/array-buffer-comparer";

// Mobile security object (MSO), representing the payload of the issuer signature, for the issuer signed part of the mdoc.
export class MobileSecurityObject {

    public readonly version: string;
    public readonly digestAlgorithm: DigestAlgorithm;

    // Digests of all data elements per namespace
    public readonly valueDigests: Map<string, Map<number, ArrayBuffer>>;
    
    public readonly docType: string;
    public readonly validity: ValidityInfo;
    private readonly deviceKeyInfo: DeviceKeyInfo;

    private constructor(version: string, 
                        digestAlgorithm: DigestAlgorithm,
                        valueDigests: Map<string, Map<number, ArrayBuffer>>,
                        deviceKeyInfo: DeviceKeyInfo,
                        docType: string,
                        validityInfo: ValidityInfo) {
        this.version = version;
        this.digestAlgorithm = digestAlgorithm;
        this.valueDigests = valueDigests;
        this.deviceKeyInfo = deviceKeyInfo;
        this.docType = docType;
        this.validity = validityInfo;
    }

    public static async build(issuerNamespaces: Map<string, IssuerSignedItem[]>,
                              deviceKeyInfo: DeviceKeyInfo,
                              docType: string,
                              validityInfo: ValidityInfo,
                              digestAlgorithm: DigestAlgorithm = DigestAlgorithm.SHA256): Promise<MobileSecurityObject> {

        const valueDigests = new Map<string, Map<number, ArrayBuffer>>();
        
        for (const [namespace, issuerSignedItems] of issuerNamespaces) {
            valueDigests.set(namespace, await this.digestItems(issuerSignedItems, digestAlgorithm));
        }

        const mso = new MobileSecurityObject('1.0', 
                                             digestAlgorithm, 
                                             valueDigests, 
                                             deviceKeyInfo, 
                                             docType, 
                                             validityInfo);
        return mso;
    }

    static fromMapElement(mapElement: MapElement): MobileSecurityObject {
        const version = <CborTextString>mapElement.get(new MapKey('version'));
        const digestAlgorithm = <CborTextString>mapElement.get(new MapKey('digestAlgorithm'));
        const valueDigests = <MapElement>mapElement.get(new MapKey('valueDigests'));
        const deviceKeyInfo = DeviceKeyInfo.fromMapElement(<MapElement>mapElement.get(new MapKey('deviceKeyInfo')));
        const docType = <CborTextString>mapElement.get(new MapKey('docType'));
        const validityInfo = ValidityInfo.fromMapElement(<MapElement>mapElement.get(new MapKey('validityInfo')));

        let valueDigests2 = new Map<string, Map<number, ArrayBuffer>>;
        for(const [key, value] of valueDigests.getValue()) {
            const digestMap = new Map<number, ArrayBuffer>();
            for (const [key2, value2] of (<MapElement>value).getValue()) {
                if (value2 instanceof CborByteString) {
                    digestMap.set(key2.int, value2.getValue());
                }
            }
            valueDigests2.set(key.str, digestMap);
        }

        return new MobileSecurityObject(version.getValue(), 
                                        <DigestAlgorithm>digestAlgorithm.getValue(), 
                                        valueDigests2, 
                                        deviceKeyInfo, 
                                        docType.getValue(), 
                                        validityInfo);
    }

    toMapElement(): MapElement {
        const valueDigestNamespaces = new Map<MapKey, CborDataItem2>();
        for (const [namespace, valueDigests2] of this.valueDigests) {
            const nameSpaceDigests = new Map<MapKey, CborDataItem2>();
            for (const [digestID, valueDigest] of valueDigests2) {
                nameSpaceDigests.set(new MapKey(digestID), new CborByteString(valueDigest));
            }
            valueDigestNamespaces.set(new MapKey(namespace), new MapElement(nameSpaceDigests));
        }
        const map = new Map<MapKey, CborDataItem2>();
        map.set(new MapKey('version'), new CborTextString(this.version));
        map.set(new MapKey('digestAlgorithm'), new CborTextString(this.digestAlgorithm));
        map.set(new MapKey('valueDigests'), new MapElement(valueDigestNamespaces));
        map.set(new MapKey('deviceKeyInfo'), this.deviceKeyInfo.toMapElement());
        map.set(new MapKey('docType'), new CborTextString(this.docType));
        map.set(new MapKey('validityInfo'), this.validity.toMapElement());
        return new MapElement(map);
    }

    public async verifySignedItems(namespace: string, issuerSignedItems: IssuerSignedItem[]): Promise<boolean> {
        
        const valueDigests = this.valueDigests.get(namespace);
        
        for (const issuerSignedItem of issuerSignedItems) {
            const digestID = issuerSignedItem.digestID;
            if (!valueDigests.has(digestID)) return false;
            const valueDigest = valueDigests.get(digestID);
            const itemDigest = await MobileSecurityObject.digestItem(issuerSignedItem, this.digestAlgorithm);
            if (!ArrayBufferComparer.equals(valueDigest, itemDigest)) return false;
        }
        
        return true;
    }

    private static async digestItems(issuerSignedItems: IssuerSignedItem[], digestAlgorithm: DigestAlgorithm): Promise<Map<number, ArrayBuffer>> {
        const digestIDs = new Map<number, ArrayBuffer>();
        for (const issuerSignedItem of issuerSignedItems) {
            const digest = await this.digestItem(issuerSignedItem, digestAlgorithm);
            digestIDs.set(issuerSignedItem.digestID, digest);
        }
        return digestIDs;
    }

    private static async digestItem(issuerSignedItem: IssuerSignedItem, digestAlgorithm: DigestAlgorithm): Promise<ArrayBuffer> {
        const encodedItem = new CborEncodedDataItem(CborEncoder.encode(issuerSignedItem.toMapElement()));
        const crypto = new Crypto();
        const hash = await crypto.subtle.digest(digestAlgorithm, CborEncoder.encode(encodedItem));
        return hash
    }
}