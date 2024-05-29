import { TestCertificates } from "./test-certificates";
import rs from "jsrsasign";

export class TestCertificatesBuilder {

    static async generateKey(): Promise<any> {
        return rs.KEYUTIL.generateKeypair("EC", "secp256r1");
    }

    static async build(): Promise<TestCertificates> {

        
        const caKeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256r1");
        const issuerKeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256r1");
        const deviceKeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256r1");
        const readerKeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256r1");

        const caCertificate = new rs.KJUR.asn1.x509.Certificate(
            {
                version: 3,
                serial: {int: 1},
                issuer: {str: "/CN=MDOC Test CA"},
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

        const issuerCertificate = new rs.KJUR.asn1.x509.Certificate(
            {
                version: 3,
                serial: {int: 2},
                issuer: {str: "/CN=MDOC Test Issuer"},
                notbefore: "20231231235959Z",
                notafter: "20251231235959Z",
                subject: {str: "/CN=User2"},
                sigalg: "SHA256withECDSA",
                cakey: issuerKeyPair.prvKeyObj,
                sbjpubkey: issuerKeyPair.pubKeyObj,
                ext: [
                    {extname: "basicConstraints", cA: false},
                    {extname: "keyUsage", critical: true, names:["digitalSignature"]},
                ]
            }
        );

        const readerCertificate = new rs.KJUR.asn1.x509.Certificate(
            {
                version: 3,
                serial: {int: 3},
                issuer: {str: "/CN=MDOC Test Reader"},
                notbefore: "20231231235959Z",
                notafter: "20251231235959Z",
                subject: {str: "/CN=User2"},
                sigalg: "SHA256withECDSA",
                cakey: readerKeyPair.prvKeyObj,
                sbjpubkey: readerKeyPair.pubKeyObj,
                ext: [
                    {extname: "basicConstraints", cA: false},
                    {extname: "keyUsage", critical: true, names:["digitalSignature"]},
                ]
            }
        );

        const deviceCertificate = new rs.KJUR.asn1.x509.Certificate(
            {
                version: 3,
                serial: {int: 4},
                issuer: {str: "/CN=MDOC Test Device"},
                notbefore: "20231231235959Z",
                notafter: "20251231235959Z",
                subject: {str: "/CN=User4"},
                sigalg: "SHA256withECDSA",
                cakey: deviceKeyPair.prvKeyObj,
                sbjpubkey: deviceKeyPair.pubKeyObj,
                ext: [
                    {extname: "basicConstraints", cA: false},
                    {extname: "keyUsage", critical: true, names:["digitalSignature"]},
                ]               
             }
        );
        const caCertificate2 = new rs.X509();   
        caCertificate2.readCertPEM(caCertificate.getPEM()); 

        const issuerCertificate2 = new rs.X509();   
        issuerCertificate2.readCertPEM(issuerCertificate.getPEM()); 

        const readerCertificate2 = new rs.X509();   
        readerCertificate2.readCertPEM(readerCertificate.getPEM()); 

        const deviceCertificate2 = new rs.X509();   
        deviceCertificate2.readCertPEM(deviceCertificate.getPEM()); 

        return new TestCertificates(caKeyPair, 
                                    caCertificate2, 
                                    issuerKeyPair, 
                                    issuerCertificate2, 
                                    readerKeyPair, 
                                    readerCertificate2, 
                                    deviceKeyPair, 
                                    deviceCertificate2);
    }
}