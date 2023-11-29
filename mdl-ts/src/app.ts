import * as x509 from "@peculiar/x509";
import { Crypto } from "@peculiar/webcrypto";

async function createMdl() {

    const crypto = new Crypto();

    x509.cryptoProvider.set(crypto);

    const alg = {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: "SHA-256"
    };
    
    const caKeyPair = await crypto.subtle.generateKey(alg, false, ["sign", "verify"]);
    const issuerKeyPair = await crypto.subtle.generateKey(alg, false, ["sign", "verify"]);
    const deviceKeyPair = await crypto.subtle.generateKey(alg, false, ["sign", "verify"]);
    const readerKeyPair = await crypto.subtle.generateKey(alg, false, ["sign", "verify"]);

    const caCertificate = await x509.X509CertificateGenerator.createSelfSigned(
        {
            serialNumber: "01",
            name: "CN=MDOC Test CA",
            notBefore: new Date("2023/01/01"),
            notAfter: new Date("2025/01/01"),
            signingAlgorithm: alg,
            keys: caKeyPair,
            extensions: [
                new x509.BasicConstraintsExtension(true, 2, true),
                new x509.ExtendedKeyUsageExtension(["1.2.3.4.5.6.7", "2.3.4.5.6.7.8"], true),
                new x509.KeyUsagesExtension(x509.KeyUsageFlags.keyCertSign | x509.KeyUsageFlags.cRLSign, true),
                await x509.SubjectKeyIdentifierExtension.create(caKeyPair.publicKey),
            ]
        });
    
        const issuerCertificate = await x509.X509CertificateGenerator.createSelfSigned(
            {
                serialNumber: "02",
                name: "CN=MDOC Test Issuer",
                notBefore: new Date("2023/01/01"),
                notAfter: new Date("2025/01/01"),
                signingAlgorithm: alg,
                keys: caKeyPair,
                extensions: [
                    new x509.BasicConstraintsExtension(true, 2, true),
                    new x509.ExtendedKeyUsageExtension(["1.2.3.4.5.6.7", "2.3.4.5.6.7.8"], true),
                    new x509.KeyUsagesExtension(x509.KeyUsageFlags.keyCertSign | x509.KeyUsageFlags.cRLSign, true),
                    await x509.SubjectKeyIdentifierExtension.create(caKeyPair.publicKey),
                ]
            });
    
    console.log(caCertificate.toString("pem"));
    return;
}

createMdl();
  
  //console.log(cert.toString("pem")); // Certificate in PEM format