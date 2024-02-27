import * as x509 from "@peculiar/x509";
import { Crypto } from "@peculiar/webcrypto";
import { TestCertificates } from "./test-certificates";

export class TestCertificatesBuilder {

    static async generateKey(): Promise<CryptoKeyPair> {
        const crypto = new Crypto();
      
        const algorithm = {
            name: 'ECDSA',
            namedCurve: 'P-256',
            hash: 'SHA-256'
        };

        return await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);
    }

    static async build(): Promise<TestCertificates> {

        const crypto = new Crypto();

        x509.cryptoProvider.set(crypto);
        
        const algorithm = {
            name: 'ECDSA',
            namedCurve: 'P-256',
            hash: 'SHA-256'
        };
        
        const caKeyPair = await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);
        const issuerKeyPair = await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);
        const deviceKeyPair = await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);
        const readerKeyPair = await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);

        const caCertificate = await x509.X509CertificateGenerator.createSelfSigned(
            {
                serialNumber: "01",
                name: "CN=MDOC Test CA",
                notBefore: new Date("2023/01/01"),
                notAfter: new Date("2025/01/01"),
                signingAlgorithm: algorithm,
                keys: caKeyPair,
                extensions: [
                    new x509.BasicConstraintsExtension(false, 2, true),
                    new x509.KeyUsagesExtension(x509.KeyUsageFlags.digitalSignature, true),
                    await x509.SubjectKeyIdentifierExtension.create(caKeyPair.publicKey),
                ]
        });

        const issuerCertificate = await x509.X509CertificateGenerator.createSelfSigned(
            {
                serialNumber: "02",
                name: "CN=MDOC Test Issuer",
                notBefore: new Date("2023/01/01"),
                    notAfter: new Date("2025/01/01"),
                    signingAlgorithm: algorithm,
                    keys: issuerKeyPair,
                    extensions: [
                        new x509.BasicConstraintsExtension(true, 2, true),
                        new x509.ExtendedKeyUsageExtension(["1.2.3.4.5.6.7", "2.3.4.5.6.7.8"], true),
                        new x509.KeyUsagesExtension(x509.KeyUsageFlags.keyCertSign | x509.KeyUsageFlags.cRLSign, true),
                        await x509.SubjectKeyIdentifierExtension.create(issuerKeyPair.publicKey),
                    ]
            }
        );

        const readerCertificate = await x509.X509CertificateGenerator.createSelfSigned(
            {
                serialNumber: "02",
                name: "CN=MDOC Test Reader",
                notBefore: new Date("2023/01/01"),
                    notAfter: new Date("2025/01/01"),
                    signingAlgorithm: algorithm,
                    keys: issuerKeyPair,
                    extensions: [
                        new x509.BasicConstraintsExtension(true, 2, true),
                        new x509.ExtendedKeyUsageExtension(["1.2.3.4.5.6.7", "2.3.4.5.6.7.8"], true),
                        new x509.KeyUsagesExtension(x509.KeyUsageFlags.keyCertSign | x509.KeyUsageFlags.cRLSign, true),
                        await x509.SubjectKeyIdentifierExtension.create(readerKeyPair.publicKey),
                    ]
            }
        );

        const deviceCertificate = await x509.X509CertificateGenerator.createSelfSigned(
            {
                serialNumber: "02",
                name: "CN=MDOC Test Reader",
                notBefore: new Date("2023/01/01"),
                    notAfter: new Date("2025/01/01"),
                    signingAlgorithm: algorithm,
                    keys: issuerKeyPair,
                    extensions: [
                        new x509.BasicConstraintsExtension(true, 2, true),
                        new x509.ExtendedKeyUsageExtension(["1.2.3.4.5.6.7", "2.3.4.5.6.7.8"], true),
                        new x509.KeyUsagesExtension(x509.KeyUsageFlags.keyCertSign | x509.KeyUsageFlags.cRLSign, true),
                        await x509.SubjectKeyIdentifierExtension.create(deviceKeyPair.publicKey),
                    ]
            }
        );
            
        return new TestCertificates(caKeyPair, 
                                    caCertificate, 
                                    issuerKeyPair, 
                                    issuerCertificate, 
                                    readerKeyPair, 
                                    readerCertificate, 
                                    deviceKeyPair, 
                                    deviceCertificate);
    }
}