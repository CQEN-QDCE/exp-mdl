import { COSECryptoProvider } from "./cose-crypto-provider";
import { COSESign1 } from "./cose-sign-1";
import { SimpleCOSECryptoProviderKeyInfo } from "./simple-cose-crypto-provider-key-info";
import { ArrayBufferComparer } from '../utils/array-buffer-comparer';
import { CoseAlgorithm } from './cose-algorithm.enum';
import rs from "jsrsasign";

export class SimpleCOSECryptoProvider implements COSECryptoProvider {

    private _keyMap: Map<string, SimpleCOSECryptoProviderKeyInfo>;

    constructor(keys: SimpleCOSECryptoProviderKeyInfo[]) {
        this._keyMap = new Map<string, SimpleCOSECryptoProviderKeyInfo>();
        for (const key of keys) {
            this._keyMap.set(key.keyID, key);
        }
    }

    async sign1(payload: ArrayBuffer, keyID: string): Promise<COSESign1> {
        
        const keyInfo = this._keyMap.get(keyID);
        if (!keyInfo) throw new Error('No key ID given, or key with given ID not found');
        
        const coseSign1 = new COSESign1();
        coseSign1.headers.algorithm.value = CoseAlgorithm.ES256;
        //coseSign1.headers.x5Chain.value = new x509.X509Certificates(keyInfo.x5Chain).export('raw');
        coseSign1.attachPayload(payload);
        await coseSign1.sign(keyInfo.privateKey);
        return coseSign1;

    }

    private concatenateArrayBuffers(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBuffer {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
    }

    async verify1(coseSign1: COSESign1, keyID: string): Promise<boolean> {

        const keyInfo = this._keyMap.get(keyID);
        if (!keyInfo) throw new Error('No key ID given, or key with given ID not found');
        return await coseSign1.verify(keyInfo.publicKey);
    }
    
    async verifyX5Chain(coseSign1: COSESign1, keyID: string): Promise<boolean> {
//        const crypto = new Crypto();
//        x509.cryptoProvider.set(crypto);
//        const keyInfo = this._keyMap.get(keyID);
//        if (!keyInfo) throw new Error("No key ID given, or key with given ID not found");
//        const test = coseSign1.x5Chain;
//        const certificateChain = new x509.X509Certificates();
//        certificateChain.import(test);
//        let lastCertificate = certificateChain[certificateChain.length - 1];
//        let bla = lastCertificate.publicKey.rawData;
//        let bla3 = await lastCertificate.publicKey.export();
//        let bla4 = <Uint8Array>await crypto.subtle.exportKey('raw', bla3);
//        let bla2 = <Uint8Array>await crypto.subtle.exportKey('raw', keyInfo.publicKey);

//        let equals = ArrayBufferComparer.equals(bla2.buffer, bla4.buffer);
//        return certificateChain.length > 0  && 
  //             ArrayBufferComparer.equals(bla2.buffer, bla4.buffer) && 
    //           this.validateCertificateChain(certificateChain, keyInfo);
        return true;
        throw new Error("Method not implemented.");
    }

    private validateCertificateChain(certChain: rs.KJUR.asn1.x509.Certificate[], keyInfo: SimpleCOSECryptoProviderKeyInfo): boolean {
        // TODO: Implement
        return true;
    }
}