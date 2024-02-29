import * as x509 from "@peculiar/x509";

export class TestCertificates {

    private _caKeyPair: CryptoKeyPair;
    private _caCertificate: x509.X509Certificate;

    private _issuerKeyPair: CryptoKeyPair;
    private _issuerCertificate: x509.X509Certificate;

    private _readerKeyPair: CryptoKeyPair;
    private _readerCertificate: x509.X509Certificate;

    private _deviceKeyPair: CryptoKeyPair;
    private _deviceCertificate: x509.X509Certificate;

    constructor(caKeyPair: CryptoKeyPair, 
                caCertificate: x509.X509Certificate, 
                issuerKeyPair: CryptoKeyPair, 
                issuerCertificate: x509.X509Certificate,
                readerKeyPair: CryptoKeyPair, 
                readerCertificate: x509.X509Certificate,
                deviceKeyPair: CryptoKeyPair, 
                deviceCertificate: x509.X509Certificate) {
        this._caKeyPair = caKeyPair;
        this._caCertificate = caCertificate;
        this._issuerKeyPair = issuerKeyPair;
        this._issuerCertificate = issuerCertificate;
        this._readerKeyPair = readerKeyPair;
        this._readerCertificate = readerCertificate;
        this._deviceKeyPair = deviceKeyPair;
        this._deviceCertificate = deviceCertificate;
    }

    get caKeyPair(): CryptoKeyPair {
        return this._caKeyPair;
    }

    get caCertificate(): x509.X509Certificate {
        return this._caCertificate;
    }

    get issuerKeyPair(): CryptoKeyPair {
        return this._issuerKeyPair;
    }

    get issuerCertificate(): x509.X509Certificate {
        return this._issuerCertificate;
    }

    get readerKeyPair(): CryptoKeyPair {
        return this._readerKeyPair;
    }

    get readerCertificate(): x509.X509Certificate {
        return this._readerCertificate;
    }

    get deviceKeyPair(): CryptoKeyPair {
        return this._deviceKeyPair;
    }

    get deviceCertificate(): x509.X509Certificate {
        return this._deviceCertificate;
    }

}