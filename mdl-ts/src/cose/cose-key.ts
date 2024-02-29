import { Crypto } from "@peculiar/webcrypto";
import { KeyKeys } from "../../key-keys.enum";
import { Base64 } from '../utils/base64';
import { CborMap } from '../cbor/types/cbor-map';
import { CborDataItem } from '../cbor/cbor-data-item';
import { CborNumber } from '../cbor/types/cbor-number';
import { CborByteString } from '../cbor/types/cbor-byte-string';
import { CborConvertible } from "../cbor/cbor-convertible";

export class CoseKey implements CborConvertible {

    private keyMap: Map<number, number | ArrayBuffer>;

    public constructor(keyMap: Map<number, number | ArrayBuffer>) {
        this.keyMap = keyMap;
    }

    fromCborDataItem(dataItem: CborDataItem): CoseKey {
        const cborMap = <CborMap>dataItem;
        const keyMap = new Map<number, number | ArrayBuffer>();
        cborMap.getValue().forEach((value, key) => {
            keyMap.set(key as number, value.getValue());
        });
        return new CoseKey(keyMap);
    }

    toCborDataItem(): CborDataItem {
        const cborMap = new CborMap();
        for (const [key, value] of this.keyMap) {
            cborMap.set(key, typeof value === 'number' ? new CborNumber(value) : new CborByteString(value));
        }
        return cborMap;
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