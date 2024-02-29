import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { ListElement } from "../data-element/list-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { CborNumber } from "../data-element/cbor-number";
import { CborTextString } from "../data-element/cbor-text-string";
import { MobileDocument } from "../mobile-document";
import { DeviceResponseStatus } from "./device-response-status.enum";
import { CborConvertable } from "../cbor/cbor-convertable";

export class DeviceResponse implements CborConvertable {

    public readonly documents: MobileDocument[] = [];
    private readonly version: string;
    private readonly status: DeviceResponseStatus;
    private readonly documentErrors: MapElement;

    constructor(documents: MobileDocument[], 
                version: string = "1.0", 
                status: DeviceResponseStatus = DeviceResponseStatus.OK, 
                documentErrors: MapElement = null) {
        this.documents = documents;
        this.version = version;
        this.status = status;
        this.documentErrors = documentErrors;
    }

    fromCborDataItem(dataItem: CborDataItem2): DeviceResponse {
        const mapElement = <MapElement>dataItem;
        const documents = mapElement.get(new MapKey('documents'));
        const mobileDocuments = [];
        
        for (const documentDataItem of (<ListElement>documents).getValue()) {
            mobileDocuments.push(CborDataItem2.to(MobileDocument, documentDataItem));
        }

        return new DeviceResponse(mobileDocuments, 
                                  mapElement.get(new MapKey('version')).getValue(), 
                                  (<CborNumber>mapElement.get(new MapKey('status'))).getValue(), 
                                  <MapElement>mapElement.get(new MapKey('documentErrors')));
    }

    toCborDataItem(): CborDataItem2 {
        const map = new Map<MapKey, CborDataItem2>();
        const documents = [];
        for (const document of this.documents) {
            documents.push(CborDataItem2.from(document));
        }
        map.set(new MapKey('version'), new CborTextString(this.version));
        map.set(new MapKey('documents'), new ListElement(documents));
        map.set(new MapKey('status'), new CborNumber(this.status));
        if (this.documentErrors) map.set(new MapKey('documentErrors'), this.documentErrors);
        return new MapElement(map);
    }

}