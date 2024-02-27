import { Cbor } from "../cbor/cbor";
import { CborConvertable } from "../cbor/cbor-convertable";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { CborEncodedDataItem } from "../data-element/cbor-encoded-data-item";
import { ListElement } from "../data-element/list-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { CborTextString } from "../data-element/cbor-text-string";
import { MobileDocumentRequest } from "../doc-request/mobile-document-request";

export class DeviceRequest implements CborConvertable {

    constructor(public readonly mobileDocumentRequests: MobileDocumentRequest[], 
                public readonly version: string = '1.0') {
    }

    fromCborDataItem(dataItem: CborDataItem2): DeviceRequest {
        const mapElement = <MapElement>dataItem;
        const docRequests = mapElement.get(new MapKey('docRequests'));
        const docRequests2: MobileDocumentRequest[] = [];
        if (docRequests) {
            for (const mdocRequest of docRequests.getValue()) {
                const itemsRequest = <CborEncodedDataItem>mdocRequest.get(new MapKey('itemsRequest'));
                const readerAuth = <ListElement>mdocRequest.get(new MapKey('readerAuth'));
                docRequests2.push(new MobileDocumentRequest(itemsRequest, readerAuth ? CborDataItem2.to(COSESign1, new ListElement(readerAuth.getValue())) : null));
            }
        }
        let version = mapElement.get(new MapKey('version'));
        if (!version) version = null;
        return new DeviceRequest(docRequests2, version.getValue());
    }

    toCborDataItem(): CborDataItem2 {
        const map = new Map<MapKey, CborDataItem2>();
        const mdocRequests: MapElement[] = [];
        for (const mdocRequest of this.mobileDocumentRequests) mdocRequests.push(mdocRequest.toMapElement());
        map.set(new MapKey('docRequests'), new ListElement(mdocRequests));
        map.set(new MapKey('version'), new CborTextString(this.version));
        return new MapElement(map);
    }

}