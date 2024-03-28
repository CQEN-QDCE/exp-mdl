import rs from "jsrsasign";

export class SimpleCOSECryptoProviderKeyInfo {
    keyID: string;
    //algorithmID: AlgorithmID,
    publicKey: rs.KJUR.crypto.ECDSA;
    privateKey: rs.KJUR.crypto.ECDSA = null;
    x5Chain: rs.X509[] = [];
    trustedRootCAs: rs.X509[] = [];

    constructor(keyID: string,
                algorithmID: string,  
                publicKey: rs.KJUR.crypto.ECDSA,
                privateKey: rs.KJUR.crypto.ECDSA | null,
                x5Chain: rs.X509[] = [],
                trustedRootCAs: rs.X509[] = []) {
        this.keyID = keyID;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.x5Chain = x5Chain;
        this.trustedRootCAs = trustedRootCAs;
    }
}