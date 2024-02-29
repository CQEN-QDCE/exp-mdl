import { CborMap } from "../cbor/types/cbor-map";
import { CborTextString } from "../cbor/types/cbor-text-string";

export class ItemsRequest {

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
}