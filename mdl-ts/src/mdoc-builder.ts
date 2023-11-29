import { COSESign1 } from "./cose/cose-sign-1";
import { DataElement } from "./data-element/data-element";
import { IssuerSignedItem } from "./issuer-signed-item";
import { DeviceSigned } from "./mdoc/device-signed";

export class MDocBuilder {

    private UNSIGNED_INTEGER_MAX_VALUE = 4294967295;

    private docType: string;

    private nameSpacesMap = new Map<string, IssuerSignedItem[]>();

    constructor(docType: string) {
        this.docType = docType;
    }

    addIssuerSignedItems(nameSpace: string, issuerSignedItems: IssuerSignedItem[]): MDocBuilder {
        this.getIssuerSignedItemsByNameSpace(nameSpace).concat(issuerSignedItems);
        return this;
    }

    addItemToSign(nameSpace: string, elementIdentifier: string, elementValue: DataElement): MDocBuilder {
        let issuerSignedItems = this.getIssuerSignedItemsByNameSpace(nameSpace);
        issuerSignedItems.push(IssuerSignedItem.createWithRandomSalt(this.getNextDigestID(issuerSignedItems), elementIdentifier, elementValue));
        return this;
    }

    build(issuerAuth: COSESign1, deviceSigned: DeviceSigned | null = null): MDoc {
        
    }

    private getIssuerSignedItemsByNameSpace(nameSpace: string): IssuerSignedItem[] {
        let issuerSignedItems = this.nameSpacesMap.get(nameSpace);
        if (!issuerSignedItems) {
            issuerSignedItems = [];
            this.nameSpacesMap.set(nameSpace, issuerSignedItems);
        } 
        return issuerSignedItems;
    }

    private getNextDigestID(issuerSignedItems: IssuerSignedItem[]): number {
        let maxDigestID: number = 0;
        for (let issuerSignedItem of issuerSignedItems) {
            if (issuerSignedItem.digestID.value > maxDigestID) maxDigestID = issuerSignedItem.digestID.value;
        }
        return maxDigestID + 1 > this.UNSIGNED_INTEGER_MAX_VALUE ? 0 : maxDigestID + 1;
    }
}