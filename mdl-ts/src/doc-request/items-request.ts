import { CborConvertible } from "../cbor/cbor-convertible";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborTextString } from "../cbor/types/cbor-text-string";

export class ItemsRequest implements CborConvertible {

    public readonly docType: string;
    
    public readonly namespaces: CborMap;

    constructor(docType: string, 
                nameSpaces: CborMap) {
        this.docType = docType;
        this.namespaces = nameSpaces;
    }

    static fromMapElement(cborMap: CborMap): ItemsRequest {
        const docType = <CborTextString>cborMap.get('docType');
        const nameSpaces = <CborMap>cborMap.get('nameSpaces');
        return new ItemsRequest(docType.getValue(), nameSpaces);
    }

    toMapElement(): CborMap {
        const cborMap = new CborMap();
        cborMap.set('docType', new CborTextString(this.docType));
        cborMap.set('nameSpaces', this.namespaces);
        return new CborMap(cborMap);
    }

    fromCborDataItem(dataItem: CborDataItem): ItemsRequest {
        const cborMap = dataItem as CborMap;
        const docType = <CborTextString>cborMap.get('docType');
        const nameSpaces = <CborMap>cborMap.get('nameSpaces');
        return new ItemsRequest(docType.getValue(), nameSpaces);
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        cborMap.set('docType', new CborTextString(this.docType));
        cborMap.set('nameSpaces', this.namespaces);
        return new CborMap(cborMap);
    }
}