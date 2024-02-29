import { CborConvertible } from "../cbor/cbor-convertible";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborArray } from "../cbor/types/cbor-array";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { IssuerSignedItem } from "./issuer-signed-item";
import { CborDecoder } from "../cbor/cbor-decoder";

export class IssuerSigned implements CborConvertible {

    public readonly namespaces: Map<string, IssuerSignedItem[]>;
    
    public readonly issuerAuth: COSESign1;
    
    constructor(issuerNamespaces: Map<string, IssuerSignedItem[]>, issuerAuth: COSESign1) {
        this.namespaces = issuerNamespaces;
        this.issuerAuth = issuerAuth;
    }

    fromCborDataItem(dataItem: CborDataItem): IssuerSigned {
        const cborMap = dataItem as CborMap;
        const nameSpaces = cborMap.get('nameSpaces');
        const issuerAuth = cborMap.get('issuerAuth');
        const nameSpaces2 = new Map<string, IssuerSignedItem[]>();
        for (const [key, value] of (<CborMap>nameSpaces).getValue()) {
            const issuerSignedItems: IssuerSignedItem[] = [];
            for (const encodedCborElement of <CborEncodedDataItem[]>value.getValue()) {
                issuerSignedItems.push(CborDataItem.to(IssuerSignedItem, <CborMap>CborDecoder.decode(encodedCborElement.getValue())));
            }
            nameSpaces2.set(key as string, issuerSignedItems);
        }
        return new IssuerSigned(nameSpaces2, CborDataItem.to(COSESign1, <CborArray>issuerAuth));
    }

    toCborDataItem(): CborDataItem {
//        const map = new Map<MapKey, CborDataItem>();
//        const namespaces = new Map<string, EncodedCBORElement[]>();
//        for (const [namespace, issuerSignedItems] of this.issuerSignedItemsByNamespace) {
//            const encodedCborElements:EncodedCBORElement[] = [];
//            for (const issuerSignedItem of issuerSignedItems) {
//                encodedCborElements.push(EncodedCBORElement.encode(issuerSignedItem.toMapElement()));
//            }
//            namespaces.set(namespace, encodedCborElements);
//        }
//        map.set(new MapKey('issuerAuth'), this.issuerAuth.toDataElement());
//        return new MapElement(map);
        throw new Error("Not implemented");
    }
}