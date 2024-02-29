import * as x509 from "@peculiar/x509";

export class SimpleCOSECryptoProviderKeyInfo {
    keyID: string;
    //algorithmID: AlgorithmID,
    publicKey: CryptoKey;
    privateKey: CryptoKey = null;
    x5Chain: x509.X509Certificate[] = [];
    trustedRootCAs: x509.X509Certificate[] = [];

    constructor(keyID: string,
                algorithmID: string,  
                publicKey: CryptoKey,
                privateKey: CryptoKey,
                x5Chain: x509.X509Certificate[] = [],
                trustedRootCAs: x509.X509Certificate[] = []) {
        this.keyID = keyID;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.x5Chain = x5Chain;
        this.trustedRootCAs = trustedRootCAs;
    }
}