import { CborDataItem } from "./cbor/cbor-data-item";
import { CborEncodedDataItem } from "./cbor/types/cbor-encoded-data-item";
import { CborTextString } from "./cbor/types/cbor-text-string";
import { CborEncoder } from './cbor/cbor-encoder';
import { ItemsRequest } from "./doc-request/items-request";
import { CborArray } from "./cbor/types/cbor-array";

export class ReaderAuthentication {

    dataItems: CborDataItem[] = [];
   
    constructor(sessionTranscript: CborArray, itemsRequest: ItemsRequest) {
        this.dataItems.push(new CborTextString('ReaderAuthentication'));
        this.dataItems.push(sessionTranscript);
        const encodedItemsRequest = new CborEncodedDataItem(CborEncoder.encode(itemsRequest.toMapElement()));
        this.dataItems.push(encodedItemsRequest);
    }

    toListElement(): CborArray {
        const cborArray = new CborArray();
        for (const dataItem of this.dataItems) {
            cborArray.push(dataItem);
        }
        return cborArray;
    }
}