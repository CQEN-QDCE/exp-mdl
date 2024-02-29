import { DeviceRequest } from "./device-request";
import { MobileDocumentRequest } from "../doc-request/mobile-document-request";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborBoolean } from "../cbor/types/cbor-boolean";
import { CborMap } from "../cbor/types/cbor-map";
import { ItemsRequest } from "../doc-request/items-request";

export class DeviceRequestBuilder {

    private readonly mobileDocumentRequests: MobileDocumentRequest[] = [];

    constructor() {
        this.mobileDocumentRequests = [];
    }

    public addMobileDocumentRequest(docType: string): DeviceRequestBuilder.MobileDocumentRequestBuilder {
        return new DeviceRequestBuilder.MobileDocumentRequestBuilder(docType, this, this.mobileDocumentRequests);
    }

    public build(): DeviceRequest {
        return new DeviceRequest(this.mobileDocumentRequests);
    }

}


export namespace DeviceRequestBuilder {
    
    export class MobileDocumentRequestBuilder {

        private readonly mobileDocumentRequests: MobileDocumentRequest[];

        private readonly parent: DeviceRequestBuilder;

        docType: string;
    
        itemRequestsNameSpaces: Map<string, Map<string, boolean>>;

        readerAuthentication: COSESign1 | null = null

        constructor(docType: string, parent: DeviceRequestBuilder, mobileDocumentRequests: MobileDocumentRequest[]) {
            this.docType = docType;
            this.itemRequestsNameSpaces = new Map<string, Map<string, boolean>>();
            this.mobileDocumentRequests = mobileDocumentRequests;
            this.parent = parent;
        }   

        public addItemRequest(namespace: string, elementIdentifier: string, intentToRetain: boolean): MobileDocumentRequestBuilder {
            if (!this.itemRequestsNameSpaces.has(namespace)) {
                this.itemRequestsNameSpaces.set(namespace, new Map<string, boolean>());
            }
            const itemRequests = this.itemRequestsNameSpaces.get(namespace);
            itemRequests.set(elementIdentifier, intentToRetain);
            return this;
        }

        public setReaderAuthentication(readerAuthentication: COSESign1 | null): MobileDocumentRequestBuilder {
            this.readerAuthentication = readerAuthentication;
            return this;
        }

        public end(): DeviceRequestBuilder {
            this.mobileDocumentRequests.push(new MobileDocumentRequest(this.buildEncodedItemsRequest(), this.readerAuthentication));
            return this.parent;
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
}
