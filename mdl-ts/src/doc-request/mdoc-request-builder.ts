import { COSECryptoProvider } from "../cose/cose-crypto-provider";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborBoolean } from "../cbor/types/cbor-boolean";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { ItemsRequest } from "./items-request";
import { MobileDocumentRequest } from "./mobile-document-request";
import { ReaderAuthentication } from "../reader-authentication";
import { CborEncoder } from '../cbor/cbor-encoder';
import { CborDecoder } from "../cbor/cbor-decoder";
import { CborArray } from "../cbor/types/cbor-array";

export class MDocRequestBuilder {
    
    docType: string;
    
    itemRequestsNameSpaces: Map<string, Map<string, boolean>>;
    
    constructor(docType: string) {
        this.docType = docType;
        this.itemRequestsNameSpaces = new Map<string, Map<string, boolean>>();
    }

    addItemRequest(namespace: string, elementIdentifier: string, intentToRetain: boolean): MDocRequestBuilder {
        let itemRequests = this.itemRequestsNameSpaces.get(namespace);
        if (!itemRequests) {
            itemRequests = new Map<string, boolean>();
            this.itemRequestsNameSpaces.set(namespace, itemRequests);
        }
        itemRequests.set(elementIdentifier, intentToRetain);
        return this;
    }

    public build(readerAuth: COSESign1 | null = null): MobileDocumentRequest {
        return new MobileDocumentRequest(this.buildEncodedItemsRequest(), readerAuth);
    }

    public async sign(sessionTranscript: CborArray, cryptoProvider: COSECryptoProvider, keyID: string | null = null): Promise<MobileDocumentRequest> {
        const encodedItemsRequest = this.buildEncodedItemsRequest();
        const readerAuthentication = new ReaderAuthentication(sessionTranscript, this.buildItemsRequest(encodedItemsRequest));
        const payload = CborEncoder.encode(CborEncodedDataItem.encode(readerAuthentication.toListElement()));
        const readerAuth = await cryptoProvider.sign1(payload, keyID)
        return new MobileDocumentRequest(encodedItemsRequest, readerAuth.detachPayload());
    }

    private buildItemsRequest(encodedItemsRequest: CborEncodedDataItem): ItemsRequest {
        const dataItem = CborDecoder.decode(encodedItemsRequest.getValue());
        const cborMap = <CborMap>dataItem;
        const docType = cborMap.get('docType');
        const nameSpaces = cborMap.get('nameSpaces');
        return new ItemsRequest((<CborTextString>docType).getValue(), <CborMap>nameSpaces);
    }
    
    private buildEncodedItemsRequest(): CborEncodedDataItem {
        const outerMap = new Map<string | number, CborDataItem>();
        for (const nameSpace of this.itemRequestsNameSpaces.keys()) {
            const value = this.itemRequestsNameSpaces.get(nameSpace);
            const innerMap = new Map<string | number, CborDataItem>();
            for (const elementIdentifier of value.keys()) {
                innerMap.set(elementIdentifier, new CborBoolean(value.get(elementIdentifier)));
            }
            outerMap.set(nameSpace, new CborMap(innerMap));
        }
        const itemsRequest = new ItemsRequest(this.docType, new CborMap(outerMap));
        return CborEncodedDataItem.encode(itemsRequest.toMapElement());
    }
}