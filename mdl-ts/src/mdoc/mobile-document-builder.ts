import { COSECryptoProvider } from "../cose/cose-crypto-provider";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborEncoder } from "../cbor/cbor-encoder";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { IssuerSignedItem } from "../issuer-signed/issuer-signed-item";
import { MobileDocument } from "./mobile-document";
import { DeviceSigned } from "./device-signed";
import { IssuerSigned } from "../issuer-signed/issuer-signed";
import { MobileSecurityObject } from "./mobile-security-object";
import { DeviceKeyInfo } from "../mso/device-key-info";
import { ValidityInfo } from "../mso/validity-info";

export class MobileDocumentBuilder {

    private UNSIGNED_INTEGER_MAX_VALUE = 4294967295;

    private docType: string;

    private issuerNamespaces = new Map<string, IssuerSignedItem[]>();

    constructor(docType: string) {
        if (!docType) throw new Error('docType must not be null');
        this.docType = docType;
    }

    addIssuerNamespace(namespace: string, issuerSignedItems: IssuerSignedItem[]): MobileDocumentBuilder {
        this.getIssuerSignedItemsByNameSpace(namespace).concat(issuerSignedItems);
        return this;
    }

    addItemToSign(namespace: string, elementIdentifier: string, elementValue: CborDataItem): MobileDocumentBuilder {
        const issuerSignedItems = this.getIssuerSignedItemsByNameSpace(namespace);
        issuerSignedItems.push(IssuerSignedItem.build(this.getNextDigestID(issuerSignedItems), elementIdentifier, elementValue));
        return this;
    }

    public build(issuerAuthentication: COSESign1, deviceSigned: DeviceSigned | null = null): MobileDocument {
        return new MobileDocument(this.docType,
                                  new IssuerSigned(this.issuerNamespaces, issuerAuthentication),
                                  deviceSigned);
    }

    public async sign(validityInfo: ValidityInfo, deviceKeyInfo: DeviceKeyInfo, cryptoProvider: COSECryptoProvider, keyID: string | null = null): Promise<MobileDocument> {
        const mso = await MobileSecurityObject.build(this.issuerNamespaces, deviceKeyInfo, this.docType, validityInfo);
        const payload = CborEncoder.encode(CborEncodedDataItem.encode(CborDataItem.from(mso)));
        const issuerAuth = await cryptoProvider.sign1(payload, keyID);
        return this.build(issuerAuth);
    }

    private getIssuerSignedItemsByNameSpace(nameSpace: string): IssuerSignedItem[] {
        let issuerSignedItems = this.issuerNamespaces.get(nameSpace);
        if (!issuerSignedItems) {
            issuerSignedItems = [];
            this.issuerNamespaces.set(nameSpace, issuerSignedItems);
        } 
        return issuerSignedItems;
    }

    private getNextDigestID(issuerSignedItems: IssuerSignedItem[]): number {
        let maxDigestID: number = 0;
        if (issuerSignedItems.length == 0) return 0;
        for (const issuerSignedItem of issuerSignedItems) {
            if (issuerSignedItem.digestID > maxDigestID) maxDigestID = issuerSignedItem.digestID;
        }
        return maxDigestID + 1 > this.UNSIGNED_INTEGER_MAX_VALUE ? 0 : maxDigestID + 1;
    }
}