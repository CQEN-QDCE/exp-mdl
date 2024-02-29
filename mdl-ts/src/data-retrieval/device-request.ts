import { CborConvertible } from "../cbor/cbor-convertible";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { MobileDocumentRequest } from "../doc-request/mobile-document-request";
import { CborArray } from "../cbor/types/cbor-array";

export class DeviceRequest implements CborConvertible {

    constructor(public readonly mobileDocumentRequests: MobileDocumentRequest[], 
                public readonly version: string = '1.0') {
    }

    fromCborDataItem(dataItem: CborDataItem): DeviceRequest {
        const cborMap = <CborMap>dataItem;
        const docRequests = cborMap.get('docRequests') as CborArray;
        const docRequests2: MobileDocumentRequest[] = [];
        if (docRequests) {
            for (const mdocRequest of docRequests) {
                const itemsRequest = <CborEncodedDataItem>(mdocRequest as CborMap).get('itemsRequest');
                const readerAuth = <CborArray>(mdocRequest as CborMap).get('readerAuth');
                docRequests2.push(new MobileDocumentRequest(itemsRequest, readerAuth ? CborDataItem.to(COSESign1, readerAuth) : null));
            }
        }
        let version = cborMap.get('version');
        if (!version) version = null;
        return new DeviceRequest(docRequests2, version.getValue());
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        const mdocRequests = new CborArray();
        for (const mdocRequest of this.mobileDocumentRequests) mdocRequests.push(mdocRequest.toMapElement());
        cborMap.set('docRequests', mdocRequests);
        cborMap.set('version', new CborTextString(this.version));
        return cborMap;
    }

}