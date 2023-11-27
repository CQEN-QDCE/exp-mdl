import { ByteStringElement } from "../data-element/byte-string-element";
import { DataElement } from "../data-element/data-element";
import { ListElement } from "../data-element/list-element";
import { MapElement } from "../data-element/map-element";
import { MapKey } from "../data-element/map-key";
import { NullElement } from "../data-element/null-element";
import { NumberElement } from "../data-element/number-element";
import { StringElement } from "../data-element/string-element";
import { COSEConstants } from "./cose-constants";
import { COSESimpleBase } from "./cose-simple-base";
import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';

export class COSEMac0 extends COSESimpleBase<COSEMac0> {
   
    constructor(dataElements: DataElement[]) {
        super(dataElements);
    }

    detachPayload(): COSEMac0 {
        return new COSEMac0(this.replacePayload(new NullElement()));
    }

    attachPayload(payload: Buffer): COSEMac0 {
        return new COSEMac0(this.replacePayload(new ByteStringElement(payload)));
    }

    verify(sharedSecret: Buffer, externalData: Buffer = Buffer.alloc(0)): boolean {
        if (!this.payload) throw 'No payload given.';
        let mac0Content = COSEMac0.createMacStructure(this.protectedHeader, this.payload, externalData).toCBOR();
        if (this.algorithm !== COSEConstants.HMAC256) throw 'Algorithm currently not supported, only supported algorithm is HMAC256.';
        let tag = Buffer.from(Base64.stringify(CryptoJS.HmacSHA256(mac0Content.toString(), sharedSecret.toString())), 'utf-8');
        return this.signatureOrTag.equals(tag);
    }

    static createWithHMAC256(payload: Buffer, sharedSecret: Buffer, externalData: Buffer = Buffer.alloc(0)): COSEMac0 {
        let protectedHeaderMap = new Map<MapKey, NumberElement>();
        protectedHeaderMap.set(new MapKey(COSEConstants.ALG_LABEL), new NumberElement(COSEConstants.HMAC256));
        let protectedHeaderData = new MapElement(protectedHeaderMap).toCBOR();
        let mac0Content = COSEMac0.createMacStructure(protectedHeaderData, payload, externalData).toCBOR();
        let tag = Buffer.from(Base64.stringify(CryptoJS.HmacSHA256(mac0Content.toString(), sharedSecret.toString())), 'utf-8');
        let dataElements: DataElement[] = [];
        dataElements.push(new ByteStringElement(protectedHeaderData));
        dataElements.push(new MapElement(new Map<MapKey, DataElement>()))
        dataElements.push(new ByteStringElement(payload))
        dataElements.push(new ByteStringElement(tag))
        return new COSEMac0(dataElements);
    }

    private static createMacStructure(protectedHeaderData: Buffer, payload: Buffer, externalData: Buffer): ListElement {
        let dataElements: DataElement[] = [];
        dataElements.push(new StringElement('MAC0'));
        dataElements.push(new ByteStringElement(protectedHeaderData));
        dataElements.push(new ByteStringElement(externalData));
        dataElements.push(new ByteStringElement(payload));
        return new ListElement(dataElements);
    }
}