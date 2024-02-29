import { COSECryptoProvider } from "../cose/cose-crypto-provider";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborBoolean } from "../data-element/cbor-boolean";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { CborEncodedDataItem } from "../data-element/cbor-encoded-data-item";
import { ListElement } from "../data-element/list-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { CborTextString } from "../data-element/cbor-text-string";
import { ItemsRequest } from "./items-request";
import { MobileDocumentRequest } from "./mobile-document-request";
import { ReaderAuthentication } from "../reader-authentication";
import { CborEncoder } from '../cbor/cbor-encoder';
import { CborDecoder } from "../cbor/cbor-decoder";

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

    public async sign(sessionTranscript: ListElement, cryptoProvider: COSECryptoProvider, keyID: string | null = null): Promise<MobileDocumentRequest> {
        const encodedItemsRequest = this.buildEncodedItemsRequest();
        const readerAuthentication = new ReaderAuthentication(sessionTranscript, this.buildItemsRequest(encodedItemsRequest));
        const payload = CborEncoder.encode(CborEncodedDataItem.encode(readerAuthentication.toListElement()));
        const readerAuth = await cryptoProvider.sign1(payload, keyID)
        return new MobileDocumentRequest(encodedItemsRequest, readerAuth.detachPayload());
    }

    private buildItemsRequest(encodedItemsRequest: CborEncodedDataItem): ItemsRequest {
        const dataElement = CborDecoder.decode(encodedItemsRequest.getValue());
        const mapElement = <MapElement>dataElement;
        const docType = mapElement.get(new MapKey('docType'));
        const nameSpaces = mapElement.get(new MapKey('nameSpaces'));
        return new ItemsRequest((<CborTextString>docType).getValue(), <MapElement>nameSpaces);
    }
    
    private buildEncodedItemsRequest(): CborEncodedDataItem {
        const outerMap = new Map<MapKey, CborDataItem2>();
        for (const nameSpace of this.itemRequestsNameSpaces.keys()) {
            const value = this.itemRequestsNameSpaces.get(nameSpace);
            const innerMap = new Map<MapKey, CborDataItem2>();
            for (const elementIdentifier of value.keys()) {
                innerMap.set(new MapKey(elementIdentifier), new CborBoolean(value.get(elementIdentifier)));
            }
            outerMap.set(new MapKey(nameSpace), new MapElement(innerMap));
        }
        const itemsRequest = new ItemsRequest(this.docType, new MapElement(outerMap));
        return CborEncodedDataItem.encode(itemsRequest.toMapElement());
    }
}