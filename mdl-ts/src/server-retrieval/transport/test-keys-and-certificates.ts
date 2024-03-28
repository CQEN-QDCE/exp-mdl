import rs from "jsrsasign";

export class TestKeysAndCertificates {

    public jwtSignerPrivateKey: rs.KJUR.crypto.ECDSA;

    public jwtSignerPublicKey: rs.KJUR.crypto.ECDSA;

    public jwtSignerCertificate: rs.KJUR.asn1.x509.Certificate;

    public caCertificate: rs.KJUR.asn1.x509.Certificate;

    public jwtCertificateChain: rs.KJUR.asn1.x509.Certificate[] = [];

    public clientPrivateKey: rs.KJUR.crypto.ECDSA;

    constructor() {

    }

    public async init(): Promise<void> {  

        const caKeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256k1");
        const jwtSignerkeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256k1");
        this.jwtSignerPrivateKey = caKeyPair.prvKeyObj;
        this.jwtSignerPublicKey = jwtSignerkeyPair.pubKeyObj

        this.caCertificate = new rs.KJUR.asn1.x509.Certificate(
            {
                version: 3,
                serial: {int: 1},
                issuer: {str: "/CN=JWT CA"},
                notbefore: "20231231235959Z",
                notafter: "20251231235959Z",
                subject: {str: "/CN=User1"},
                sigalg: "SHA256withECDSA",
                cakey: caKeyPair.prvKeyObj,
                sbjpubkey: caKeyPair.pubKeyObj,
                ext: [
                    {extname: "basicConstraints", cA: false},
                    {extname: "keyUsage", critical: true, names:["digitalSignature"]},
                ]
        });

        this.jwtSignerCertificate = new rs.KJUR.asn1.x509.Certificate(
            {
                version: 3,
                serial: {int: 2},
                issuer: {str: "/CN=JWT Signer"},
                notbefore: "20231231235959Z",
                notafter: "20251231235959Z",
                subject: {str: "/CN=User2"},
                sigalg: "SHA256withECDSA",
                cakey: jwtSignerkeyPair.prvKeyObj,
                sbjpubkey: jwtSignerkeyPair.pubKeyObj,
                ext: [
                    {extname: "basicConstraints", cA: false},
                    {extname: "keyUsage", critical: true, names:["digitalSignature"]},
                ]
            }
        );

//        const chain = new x509.X509ChainBuilder({
//            certificates: [
//                this.jwtSignerCertificate
//            ],
//          });

//        const items = await chain.build(this.caCertificate);

        this.jwtCertificateChain.push(this.jwtSignerCertificate);
        this.jwtCertificateChain.push(this.caCertificate);

        const clientKeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256k1");
        this.clientPrivateKey = clientKeyPair.prvKeyObj;
    }

}