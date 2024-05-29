import { CborConvertible } from "../cbor/cbor-convertible";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { CborArray } from "../cbor/types/cbor-array";

export class DeviceAuthentication implements CborConvertible {

    public dataItems: CborDataItem[] = [];

    constructor(sessionTranscript: CborArray, docType: string, deviceNameSpaces: CborEncodedDataItem) {
        this.dataItems.push(new CborTextString("DeviceAuthentication"));
        this.dataItems.push(sessionTranscript);
        this.dataItems.push(new CborTextString(docType));
        this.dataItems.push(deviceNameSpaces);
    }

    fromCborDataItem(dataItem: CborDataItem): DeviceAuthentication {
        const cborArray = <CborArray>dataItem;
        return new DeviceAuthentication(<CborArray>cborArray[1],(<CborTextString>cborArray[2]).getValue(),<CborEncodedDataItem>cborArray[3]);
    }

    toCborDataItem(): CborDataItem {
        const cborArray = new CborArray();
        for (const dataItem of this.dataItems) {
            cborArray.push(dataItem);
        }
        return cborArray;
    }
}