import { CborDataItem } from "../cbor/cbor-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborNumber } from "../cbor/types/cbor-number";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { MobileDocument } from "../mdoc/mobile-document";
import { DeviceResponseStatus } from "./device-response-status.enum";
import { CborConvertible } from "../cbor/cbor-convertible";
import { CborArray } from "../cbor/types/cbor-array";

export class DeviceResponse implements CborConvertible {

    public readonly documents: MobileDocument[] = [];
    private readonly version: string;
    private readonly status: DeviceResponseStatus;
    private readonly documentErrors: CborMap;

    constructor(documents: MobileDocument[], 
                version: string = "1.0", 
                status: DeviceResponseStatus = DeviceResponseStatus.OK, 
                documentErrors: CborMap = null) {
        this.documents = documents;
        this.version = version;
        this.status = status;
        this.documentErrors = documentErrors;
    }

    fromCborDataItem(dataItem: CborDataItem): DeviceResponse {
        const cborMap = <CborMap>dataItem;
        const documentDataItems = <CborArray>cborMap.get('documents');
        const mobileDocuments = [];
        
        for (const documentDataItem of documentDataItems) {
            mobileDocuments.push(CborDataItem.to(MobileDocument, documentDataItem));
        }

        return new DeviceResponse(mobileDocuments, 
                                  cborMap.get('version').getValue(), 
                                  (<CborNumber>cborMap.get('status')).getValue(), 
                                  <CborMap>cborMap.get('documentErrors'));
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        const documents = new CborArray();
        for (const document of this.documents) {
            documents.push(CborDataItem.from(document));
        }
        cborMap.set('version', new CborTextString(this.version));
        cborMap.set('documents', documents);
        cborMap.set('status', new CborNumber(this.status));
        if (this.documentErrors) cborMap.set('documentErrors', this.documentErrors);
        return cborMap;
    }

}