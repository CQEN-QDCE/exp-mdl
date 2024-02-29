import { Crypto } from "@peculiar/webcrypto";
import { KeyKeys } from "../../key-keys.enum";
import { Base64 } from '../utils/base64';
import { MapElement } from '../data-element/map-element';
import { CborDataItem2 } from '../data-element/cbor-data-item2';
import { MapKey } from '../data-element/map-key';
import { CborNumber } from '../data-element/cbor-number';
import { CborByteString } from '../data-element/cbor-byte-string';
import { CborConvertable } from "../cbor/cbor-convertable";

export class CoseKey implements CborConvertable {

    private keyMap: Map<number, number | ArrayBuffer>;

    public constructor(keyMap: Map<number, number | ArrayBuffer>) {
        this.keyMap = keyMap;
    }

    fromCborDataItem(dataItem: CborDataItem2): CoseKey {
        const cborMap = <MapElement>dataItem;
        const keyMap = new Map<number, number | ArrayBuffer>();
        cborMap.getValue().forEach((value, key) => {
            keyMap.set(key.int, value.getValue());
        });
        return new CoseKey(keyMap);
    }

    toCborDataItem(): CborDataItem2 {
        const keyMap = new Map<MapKey, CborDataItem2>();
        for (const [key, value] of this.keyMap) {
            keyMap.set(new MapKey(key), typeof value === 'number' ? new CborNumber(value) : new CborByteString(value));
        }
        return new MapElement(keyMap);
    }

    static async new(publicKey: CryptoKey | null = null, privateKey: CryptoKey | null = null): Promise<CoseKey> {
        
        const keyMap = new Map<number, number | ArrayBuffer>();

        const crypto = new Crypto();

        if (publicKey) {
            const jsonWebPublicKey = await crypto.subtle.exportKey('jwk', publicKey);
            const x = Base64.decode(jsonWebPublicKey.x); // EC2_X -2
            const y = Base64.decode(jsonWebPublicKey.y); // EC2_Y -3
            keyMap.set(KeyKeys.KeyType, KeyKeys.KeyType_EC2);
            keyMap.set(KeyKeys.EC2Curve, KeyKeys.EC2_P256);
            keyMap.set(KeyKeys.EC2X, x);
            keyMap.set(KeyKeys.EC2Y, y);
        }

        if (privateKey) {
            const jsonWebPrivateKey = await crypto.subtle.exportKey('jwk', privateKey);
            const d = Base64.decode(jsonWebPrivateKey.d); // EC2_D -4
            keyMap.set(KeyKeys.EC2D, d);
        }

        return new CoseKey(keyMap);
    }
}