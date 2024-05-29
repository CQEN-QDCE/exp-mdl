import { COSECryptoProvider } from "../cose/cose-crypto-provider";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborDecoder } from "../cbor/cbor-decoder";
import { CborEncoder } from "../cbor/cbor-encoder";
import { CborEncodedDataItem } from "../cbor/types/cbor-encoded-data-item";
import { CborMap } from "../cbor/types/cbor-map";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { MDocRequestVerificationParams } from "./mdoc-request-verification-params";
import { ItemsRequest } from "./items-request";
import { ReaderAuthentication } from "../mdoc-auth/reader-authentication";
import { Lazy } from "../utils/lazy";

export class MobileDocumentRequest {

    private readonly itemsRequestBytes: CborEncodedDataItem;
    public readonly readerAuthentication: COSESign1 | null;
    private readonly lazyDecodedItemsRequest: Lazy<ItemsRequest>;
    private readonly lazyNamespaces: Lazy<string[]>;

    constructor(itemsRequestBytes: CborEncodedDataItem, 
                readerAuthentication: COSESign1 | null = null) {
        this.itemsRequestBytes = itemsRequestBytes;
        this.readerAuthentication = readerAuthentication;
        this.lazyDecodedItemsRequest = new Lazy<ItemsRequest>(() => this.initItemsRequest());
        this.lazyNamespaces = new Lazy<string[]>(() => this.initNamespaces());
    }

    get namespaces(): string[] {
        return this.lazyNamespaces.value;
    }

    get docType(): string {
        return this.itemsRequest.docType;
    }

    get itemsRequest(): ItemsRequest {
        return this.lazyDecodedItemsRequest.value;
    }

    getRequestedItemsFor(nameSpace: string): Map<string, boolean> {
        const itemsRequest = this.itemsRequest;
        const nameSpaces = itemsRequest.namespaces;
        const nameSpace2 = nameSpaces.get(nameSpace);
        const response: Map<string, boolean> = new Map<string, boolean>();
        if (!nameSpace2) return response;
        for (const [key, value] of nameSpace2.getValue()) {
            response.set(key as string, value.getValue());
        }
        return response;
    }

    public async verify(verificationParams: MDocRequestVerificationParams, cryptoProvider: COSECryptoProvider): Promise<boolean> {
        return (!verificationParams || await this.verifyReaderAuthentication(verificationParams, cryptoProvider)) && 
               (verificationParams.allowedToRetain == null || this.checkRestrictedFieldsAllowedToRetain(verificationParams));
    }

    private async verifyReaderAuthentication(verificationParams: MDocRequestVerificationParams, cryptoProvider: COSECryptoProvider): Promise<boolean> {
        const readerAuthentication = this.getReaderSignedPayload(verificationParams.readerAuthentication);
        this.readerAuthentication.attachPayload(readerAuthentication);
        return await cryptoProvider.verify1(this.readerAuthentication, verificationParams.readerKeyId)
    }

    private checkRestrictedFieldsAllowedToRetain(verificationParams: MDocRequestVerificationParams): boolean {
        for (const nameSpace of this.namespaces) {
            const requestedItems = this.getRequestedItemsFor(nameSpace);
            const allowedToRetain = verificationParams.allowedToRetain.get(nameSpace);
            for (const [name, value] of requestedItems) {
                if (value && !allowedToRetain.has(name)) return false;
            }
        }
        return true;
    }

    toMapElement(): CborMap {
        const cborMap = new CborMap();
        cborMap.set('itemsRequest', this.itemsRequestBytes);
        if (this.readerAuthentication) cborMap.set('readerAuth', CborDataItem.from(this.readerAuthentication));
        return cborMap;
    }

    private getReaderSignedPayload(readerAuthentication: ReaderAuthentication): ArrayBuffer {
        return CborEncoder.encode(CborEncodedDataItem.encode(readerAuthentication.toListElement()));
    }
    
    private initItemsRequest(): ItemsRequest {
        const dataItem = CborDecoder.decode(this.itemsRequestBytes.getValue());
        const cborMap = <CborMap>dataItem;
        const docType = cborMap.get('docType');
        const nameSpaces = cborMap.get('nameSpaces');
        return new ItemsRequest((<CborTextString>docType).getValue(), <CborMap>nameSpaces);
    }

    private initNamespaces(): string[] {
        const nameSpaces: string[] = [];
        for (const [key, value] of this.itemsRequest.namespaces.getValue()) {
            nameSpaces.push(key as string);
        }
        return nameSpaces;
    }

}