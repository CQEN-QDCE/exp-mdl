import { CborConvertable } from "../cbor/cbor-convertable";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { CborEncodedDataItem } from "../data-element/cbor-encoded-data-item";
import { ListElement } from "../data-element/list-element";
import { CborTextString } from "../data-element/cbor-text-string";

export class DeviceAuthentication implements CborConvertable {

    public dataItems: CborDataItem2[] = [];

    constructor(sessionTranscript: ListElement, docType: string, deviceNameSpaces: CborEncodedDataItem) {
        this.dataItems.push(new CborTextString("DeviceAuthentication"));
        this.dataItems.push(sessionTranscript);
        this.dataItems.push(new CborTextString(docType));
        this.dataItems.push(deviceNameSpaces);
    }

    fromCborDataItem(dataItem: CborDataItem2): DeviceAuthentication {
        const cborArray = <ListElement>dataItem;
        const elements = <CborDataItem2[]>cborArray.getValue();
        return new DeviceAuthentication(<ListElement>elements[1],(<CborTextString>elements[2]).getValue(),<CborEncodedDataItem>elements[3]);
    }

    toCborDataItem(): CborDataItem2 {
        return new ListElement(this.dataItems);
    }
}