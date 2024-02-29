import { CborDataItem2 } from "./data-element/cbor-data-item2";
import { CborEncodedDataItem } from "./data-element/cbor-encoded-data-item";
import { ListElement } from "./data-element/list-element";
import { CborTextString } from "./data-element/cbor-text-string";
import { CborEncoder } from './cbor/cbor-encoder';
import { ItemsRequest } from "./doc-request/items-request";

export class ReaderAuthentication {

    dataElements: CborDataItem2[] = [];
   
    constructor(sessionTranscript: ListElement, itemsRequest: ItemsRequest) {
        this.dataElements.push(new CborTextString('ReaderAuthentication'));
        this.dataElements.push(sessionTranscript);
        const encodedItemsRequest = new CborEncodedDataItem(CborEncoder.encode(itemsRequest.toMapElement()));
        this.dataElements.push(encodedItemsRequest);
    }

    toCBOR(): ArrayBuffer {
        return CborEncoder.encode(new ListElement(this.dataElements));
    }

    toListElement(): ListElement {
        return new ListElement(this.dataElements);
    }
}