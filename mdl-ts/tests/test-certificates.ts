import rs from "jsrsasign";

export class TestCertificates {

    private _caKeyPair: any;
    private _caCertificate: rs.X509;

    private _issuerKeyPair: any;
    private _issuerCertificate: rs.X509;

    private _readerKeyPair: any;
    private _readerCertificate: rs.X509;

    private _deviceKeyPair: any;
    private _deviceCertificate: rs.X509;

    constructor(caKeyPair: any, 
                caCertificate: rs.X509, 
                issuerKeyPair: any, 
                issuerCertificate: rs.X509,
                readerKeyPair: any, 
                readerCertificate: rs.X509,
                deviceKeyPair: any, 
                deviceCertificate: rs.X509) {
        this._caKeyPair = caKeyPair;
        this._caCertificate = caCertificate;
        this._issuerKeyPair = issuerKeyPair;
        this._issuerCertificate = issuerCertificate;
        this._readerKeyPair = readerKeyPair;
        this._readerCertificate = readerCertificate;
        this._deviceKeyPair = deviceKeyPair;
        this._deviceCertificate = deviceCertificate;
    }

    get caKeyPair(): any {
        return this._caKeyPair;
    }

    get caCertificate(): rs.X509 {
        return this._caCertificate;
    }

    get issuerKeyPair(): any {
        return this._issuerKeyPair;
    }

    get issuerCertificate(): rs.X509 {
        return this._issuerCertificate;
    }

    get readerKeyPair(): any {
        return this._readerKeyPair;
    }

    get readerCertificate(): rs.X509 {
        return this._readerCertificate;
    }

    get deviceKeyPair(): any {
        return this._deviceKeyPair;
    }

    get deviceCertificate(): rs.X509 {
        return this._deviceCertificate;
    }

}