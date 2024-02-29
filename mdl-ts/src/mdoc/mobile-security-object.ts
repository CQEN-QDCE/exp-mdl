import { CborByteString } from "../cbor/types/cbor-byte-string";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { DeviceKeyInfo } from "../mso/device-key-info";
import { IssuerSignedItem } from "../issuer-signed/issuer-signed-item";
import { ValidityInfo } from "../mso/validity-info";
import { DigestAlgorithm } from "./digest-algorithm.enum";
import { Crypto } from "@peculiar/webcrypto";
import { CborEncoder } from "../cbor/cbor-encoder";
import { ArrayBufferComparer } from "../utils/array-buffer-comparer";
import { CborConvertible } from "../cbor/cbor-convertible";

// Mobile security object (MSO), representing the payload of the issuer signature, for the issuer signed part of the mdoc.
export class MobileSecurityObject implements CborConvertible {

    public readonly version: string;
    public readonly digestAlgorithm: DigestAlgorithm;

    // Digests of all data elements per namespace
    public readonly valueDigests: Map<string, Map<number, ArrayBuffer>>;
    
    public readonly docType: string;
    public readonly validity: ValidityInfo;
    private readonly deviceKeyInfo: DeviceKeyInfo;

    public constructor(version: string, 
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

    fromCborDataItem(dataItem: CborDataItem): MobileSecurityObject {
        const cborMap = <CborMap>dataItem;
        const version = <CborTextString>cborMap.get('version');
        const digestAlgorithm = <CborTextString>cborMap.get('digestAlgorithm');
        const valueDigests = <CborMap>cborMap.get('valueDigests');
        const deviceKeyInfo = DeviceKeyInfo.fromMapElement(<CborMap>cborMap.get('deviceKeyInfo'));
        const docType = <CborTextString>cborMap.get('docType');
        const validityInfo = ValidityInfo.fromMapElement(<CborMap>cborMap.get('validityInfo'));

        let valueDigests2 = new Map<string, Map<number, ArrayBuffer>>;
        for(const [key, value] of valueDigests.getValue()) {
            const digestMap = new Map<number, ArrayBuffer>();
            for (const [key2, value2] of (<CborMap>value).getValue()) {
                if (value2 instanceof CborByteString) {
                    digestMap.set(key2 as number, value2.getValue());
                }
            }
            valueDigests2.set(key as string, digestMap);
        }

        return new MobileSecurityObject(version.getValue(), 
                                        <DigestAlgorithm>digestAlgorithm.getValue(), 
                                        valueDigests2, 
                                        deviceKeyInfo, 
                                        docType.getValue(), 
                                        validityInfo);
    }

    toCborDataItem(): CborDataItem {
        const valueDigestNamespaces = new Map<string | number, CborDataItem>();
        for (const [namespace, valueDigests2] of this.valueDigests) {
            const nameSpaceDigests = new Map<string | number, CborDataItem>();
            for (const [digestID, valueDigest] of valueDigests2) {
                nameSpaceDigests.set(digestID, new CborByteString(valueDigest));
            }
            valueDigestNamespaces.set(namespace, new CborMap(nameSpaceDigests));
        }
        const cborMap = new CborMap();
        cborMap.set('version', new CborTextString(this.version));
        cborMap.set('digestAlgorithm', new CborTextString(this.digestAlgorithm));
        cborMap.set('valueDigests', new CborMap(valueDigestNamespaces));
        cborMap.set('deviceKeyInfo', this.deviceKeyInfo.toMapElement());
        cborMap.set('docType', new CborTextString(this.docType));
        cborMap.set('validityInfo', this.validity.toMapElement());
        return cborMap;
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