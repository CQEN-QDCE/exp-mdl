import { Cbor } from "../cbor/cbor";
import { CborConvertable } from "../cbor/cbor-convertable";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborDataItem2 } from "../data-element/cbor-data-item2";
import { CborEncodedDataItem } from "../data-element/cbor-encoded-data-item";
import { ListElement } from "../data-element/list-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { IssuerSignedItem } from "./issuer-signed-item";

export class IssuerSigned implements CborConvertable {

    public readonly namespaces: Map<string, IssuerSignedItem[]>;
    
    public readonly issuerAuth: COSESign1;
    
    constructor(issuerNamespaces: Map<string, IssuerSignedItem[]>, issuerAuth: COSESign1) {
        this.namespaces = issuerNamespaces;
        this.issuerAuth = issuerAuth;
    }

    fromCborDataItem(dataItem: CborDataItem2): IssuerSigned {
        const mapElement = <MapElement>dataItem;
        const nameSpaces = mapElement.get(new MapKey('nameSpaces'));
        const issuerAuth = mapElement.get(new MapKey('issuerAuth'));
        const nameSpaces2 = new Map<string, IssuerSignedItem[]>();
        for (const [key, value] of (<MapElement>nameSpaces).getValue()) {
            const issuerSignedItems: IssuerSignedItem[] = [];
            for (const encodedCborElement of <CborEncodedDataItem[]>value.getValue()) {
                issuerSignedItems.push(IssuerSignedItem.fromMapElement(<MapElement>encodedCborElement.decode()));
            }
            nameSpaces2.set(key.str, issuerSignedItems);
        }
        return new IssuerSigned(nameSpaces2, CborDataItem2.to(COSESign1, new ListElement(issuerAuth.getValue())));
    }

    toCborDataItem(): CborDataItem2 {
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