import { COSECryptoProvider } from "./cose/cose-crypto-provider";
import { COSEMac0 } from "./cose/cose-mac-0";
import { CborDataItem2 } from "./data-element/cbor-data-item2";
import { CborDecoder } from "./cbor/cbor-decoder";
import { CborEncoder } from "./cbor/cbor-encoder";
import { CborEncodedDataItem } from "./data-element/cbor-encoded-data-item";
import { MapElement } from "./data-element/map-element";
import { MapKey } from "./data-element/map-key";
import { CborNumber } from "./data-element/cbor-number";
import { CborTextString } from "./data-element/cbor-text-string";
import { IssuerSignedItem } from "./issuer-signed/issuer-signed-item";
import { DeviceAuthentication } from "./mdoc-auth/device-authentication";
import { MobileDocumentRequest } from "./doc-request/mobile-document-request";
import { DeviceAuth } from "./mdoc/device-auth";
import { DeviceSigned } from "./mdoc/device-signed";
import { IssuerSigned } from "./issuer-signed/issuer-signed";
import { MDocVerificationParams } from "./mdoc/mdoc-verification-params";
import { MobileSecurityObject } from "./mdoc/mobile-security-object";
import { VerificationType } from "./mdoc/verification-type.enum";
import { Lazy } from "./utils/lazy";
import { CborConvertable } from "./cbor/cbor-convertable";
import { Cbor } from "./cbor/cbor";

export class MobileDocument implements CborConvertable {

    private readonly lazyMobileSecurityObject: Lazy<MobileSecurityObject>;

    private readonly lazyIssuerNamespaces: Lazy<Set<string>>;

    /**
     * @param docType 
     * @param issuerSigned 
     * @param deviceSigned 
     * @param errors The errors parameter is a map from namespaces where each value is a map from data elements in said namespace to an error code from ISO/IEC 18013-5:2021 Table 9.
     */
    constructor(public docType: string, 
                public issuerSigned: IssuerSigned, 
                public deviceSigned: DeviceSigned, 
                public errors: Map<string, Map<string, number>> | null = null) {

        this.lazyMobileSecurityObject = new Lazy<MobileSecurityObject>(() => this.initMobileSecurityObject());

        this.lazyIssuerNamespaces = new Lazy<Set<string>>(() => this.initIssuerNamespaces());

    }

    get mso(): MobileSecurityObject {
        return this.lazyMobileSecurityObject.value;
    }

    get issuerNamespaces(): Set<string> {
        return this.lazyIssuerNamespaces.value;
    }

    public getIssuerSignedItems(namespace: string): IssuerSignedItem[] {
        return this.issuerSigned.namespaces.get(namespace);
    }

    private async verifySignature(cryptoProvider: COSECryptoProvider, keyID: string | null = null): Promise<boolean> {
        return await cryptoProvider.verify1(this.issuerSigned.issuerAuth, keyID);
    }

    private async verifyDeviceMAC(deviceAuthentication: DeviceAuthentication, ephemeralMACKey: ArrayBuffer): Promise<boolean> {
        const deviceMac = this.deviceSigned?.deviceAuth?.deviceMac;
        if (!deviceMac) throw new Error("No device MAC found on MDoc.");
        return await deviceMac.attachPayload(this.getDeviceSignedPayload(deviceAuthentication)).verify(ephemeralMACKey);
    }

    private async verifyDeviceSignature(deviceAuthentication: DeviceAuthentication, cryptoProvider: COSECryptoProvider, keyID: string = null): Promise<boolean> {
        const deviceSignature = this.deviceSigned?.deviceAuth?.deviceSignature;
        if (!deviceSignature) throw new Error("No device signature found on MDoc.");
        return await cryptoProvider.verify1(deviceSignature.attachPayload(this.getDeviceSignedPayload(deviceAuthentication)), keyID);
    }

    private async verifyCertificateChain(cryptoProvider: COSECryptoProvider, keyID: string | null = null): Promise<boolean> {
        return await cryptoProvider.verifyX5Chain(this.issuerSigned.issuerAuth, keyID);
    }

    private verifyValidity(): boolean {
        const validityInfo = this.mso.validity;
        return validityInfo.validFrom.getValue() <= new Date() && validityInfo.validUntil.getValue() >= new Date();
    }

    private verifyDocType(): boolean {
        return this.mso.docType === this.docType;
    }

    private async verifyDeviceSigOrMac(verificationParams: MDocVerificationParams, cryptoProvider: COSECryptoProvider): Promise<boolean> {
        const mdocDeviceAuthentication = this.deviceSigned.deviceAuth;
        if (!mdocDeviceAuthentication) throw new Error("MDoc has no device authentication.");
        const deviceAuthenticationPayload = verificationParams.deviceAuthentication;
        if (!deviceAuthenticationPayload) throw new Error("No device authentication payload given, for check of device signature or MAC.");
        if (mdocDeviceAuthentication.deviceMac != null) {
            return await this.verifyDeviceMAC(deviceAuthenticationPayload, verificationParams.ephemeralMacKey);
        } else if (mdocDeviceAuthentication.deviceSignature != null) {
            return await this.verifyDeviceSignature(deviceAuthenticationPayload,
                                              cryptoProvider, 
                                              verificationParams.deviceKeyID);
        } else {
            throw new Error("MDoc device auth has neither MAC nor signature.");
        }
    }

    private async verifyIssuerSignedItems(): Promise<boolean> {
        for (const [namespace, issuerSignedItems] of this.issuerSigned.namespaces) {
            if (!await this.mso.verifySignedItems(namespace, issuerSignedItems)) return false;
        }
        return true;
    }

    public async verify(verificationParams: MDocVerificationParams, cryptoProvider: COSECryptoProvider): Promise<boolean> {
        
        if (!this.mso) throw new Error("No MSO found on this mdoc.");
        
        for (const verificationType of verificationParams.verificationTypes) {
            switch (verificationType) {
                case VerificationType.CERTIFICATE_CHAIN:
                    if (!await this.verifyCertificateChain(cryptoProvider, verificationParams.issuerKeyID)) return false;
                    break;
                case VerificationType.VALIDITY:
                    if (!this.verifyValidity()) return false;
                    break;
                case VerificationType.DOC_TYPE:
                    if (!this.verifyDocType()) return false;
                    break;
                case VerificationType.DEVICE_SIGNATURE:
                    if (!await this.verifyDeviceSigOrMac(verificationParams, cryptoProvider)) return false;
                    break;
                case VerificationType.ISSUER_SIGNATURE:
                    if (!await this.verifySignature(cryptoProvider, verificationParams.issuerKeyID)) return false;
                    break;
                case VerificationType.ITEMS_TAMPER_CHECK:
                    if (!await this.verifyIssuerSignedItems()) return false;
                    break;
                default:
                    throw new Error("Unknown verification type.");
            }
        }

        return true;
    }

    public async presentWithDeviceSignature(mDocRequest: MobileDocumentRequest, deviceAuthentication: DeviceAuthentication, cryptoProvider: COSECryptoProvider, keyID: string = null): Promise<MobileDocument> {
        const coseSign1 = (await cryptoProvider.sign1(this.getDeviceSignedPayload(deviceAuthentication), keyID)).detachPayload();
        const namespaces = CborEncodedDataItem.encode(new MapElement(new Map<MapKey, CborDataItem2>));
        const deviceAuth = new DeviceAuth(null, coseSign1);
        return new MobileDocument(this.docType, 
                                  this.selectDisclosures(mDocRequest),
                                  new DeviceSigned(namespaces, deviceAuth));
    }

    public async presentWithDeviceMAC(mobileDocumentRequest: MobileDocumentRequest, deviceAuthentication: DeviceAuthentication, ephemeralMACKey: ArrayBuffer): Promise<MobileDocument> {
        const coseMac0 = new COSEMac0();
        coseMac0.attachPayload(this.getDeviceSignedPayload(deviceAuthentication));
        await coseMac0.mac(ephemeralMACKey);
        coseMac0.detachPayload();
        return new MobileDocument(this.docType, 
                                  this.selectDisclosures(mobileDocumentRequest), 
                                  new DeviceSigned(new CborEncodedDataItem(CborEncoder.encode(new MapElement(new Map<MapKey, CborDataItem2>))), 
                                  new DeviceAuth(coseMac0)));
    }

    private selectDisclosures(mDocRequest: MobileDocumentRequest): IssuerSigned {
        const issuerNamespaces = new Map<string, IssuerSignedItem[]>();
        for (const [namespace, issuerSignedItems] of this.issuerSigned.namespaces) {
            const requestedItems = mDocRequest.getRequestedItemsFor(namespace);
            const selectedIssuerSignedItem: IssuerSignedItem[] = [];
            for (const issuerSignedItem of issuerSignedItems) {
                if (requestedItems.get(issuerSignedItem.elementIdentifier)) selectedIssuerSignedItem.push(issuerSignedItem);
            }
            issuerNamespaces.set(namespace, selectedIssuerSignedItem);
        }
        return new IssuerSigned(issuerNamespaces, this.issuerSigned.issuerAuth);
    }

    private getDeviceSignedPayload(deviceAuthentication: DeviceAuthentication): ArrayBuffer {
        return CborEncoder.encode(CborEncodedDataItem.encode(CborDataItem2.from(deviceAuthentication)));
    }

    private initMobileSecurityObject(): MobileSecurityObject {
        const payload = this.issuerSigned.issuerAuth.payload;
        const encodedCBORElement = <CborEncodedDataItem>CborDecoder.decode(payload);
        const mapElement = <MapElement>encodedCBORElement.decode();
        return MobileSecurityObject.fromMapElement(mapElement);
    }

    private initIssuerNamespaces(): Set<string> {
        return new Set<string>([...this.issuerSigned.namespaces.keys()]);
    }

    fromCborDataItem(dataItem: CborDataItem2): MobileDocument {
        const mapElement = <MapElement>dataItem;
        const docType = mapElement.get(new MapKey('docType'));
        const issuerSigned = mapElement.get(new MapKey('issuerSigned'));
        const deviceSigned = mapElement.get(new MapKey('deviceSigned'));
        this.docType = (<CborTextString>docType).getValue();
        this.issuerSigned = CborDataItem2.to(IssuerSigned, <MapElement>issuerSigned);
        this.deviceSigned = deviceSigned ? CborDataItem2.to(DeviceSigned, <MapElement>deviceSigned) : null;
        return new MobileDocument(this.docType, this.issuerSigned, this.deviceSigned);
    }

    toCborDataItem(): CborDataItem2 {
        const map = new Map<MapKey, CborDataItem2>();
        map.set(new MapKey('docType'), new CborTextString(this.docType));
        map.set(new MapKey('issuerSigned'), CborDataItem2.from(this.issuerSigned));
        if (this.deviceSigned) map.set(new MapKey('deviceSigned'), CborDataItem2.from(this.deviceSigned));
        if (this.errors) {
            const namespacesMap = new Map<MapKey, CborDataItem2>();
            for (const [namespace, dataElements] of this.errors) {
                const dataElementsMap = new Map<MapKey, CborDataItem2>();
                for(const [identifier, errorCode] of dataElements) {
                    dataElementsMap.set(new MapKey(identifier), new CborNumber(errorCode));
                }
                namespacesMap.set(new MapKey(namespace), new MapElement(dataElementsMap));
            }
            map.set(new MapKey('errors'), new MapElement(namespacesMap));
        }
        return new MapElement(map);
    }
}