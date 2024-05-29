import { CoseAlgorithm } from "../cose/cose-algorithm.enum";
import { COSEMac0 } from "../cose/cose-mac-0";
import { COSESign1 } from "../cose/cose-sign-1";
import { CborByteString } from "../cbor/types/cbor-byte-string";
import { CborDataItem } from "../cbor/cbor-data-item";
import { CborDecoder } from "../cbor/cbor-decoder";
import { CborEncoder } from "../cbor/cbor-encoder";
import { CborMap } from "../cbor/types/cbor-map";
import { CborNumber } from "../cbor/types/cbor-number";
import { CborTextString } from "../cbor/types/cbor-text-string";
import { Base64 } from "../utils/base64";
import * as KJUR from "jsrsasign";

export class CborWebToken {
  
    // @SerialName("iss")
    public issuer: string | null = null;

    // @SerialName("sub")
    public subject: string | null = null;

    // @SerialName("aud")
    public audience: string | null = null;

    // @SerialName("exp")
    public expiration: number | null = null;

    // @SerialName("nbf")
    public notBefore: number | null = null;

    // @SerialName("iat")
    public issuedAt: number | null = null;

    // @SerialName("cti")
    public cwtId: ArrayBuffer | null = null;

    // @SerialName("nonce")
    public nonce: ArrayBuffer | null = null;

    private coseMacMessage = new COSEMac0();

    private coseSignMessage = new COSESign1();

    private static readonly ISS_KEY = 1;
    private static readonly SUB_KEY = 2;
    private static readonly AUD_KEY = 3;
    private static readonly EXP_KEY = 4;
    private static readonly NBF_KEY = 5;
    private static readonly IAT_KEY = 6;
    private static readonly CTI_KEY = 7;
    private static readonly NONCE_KEY = 10;

    /**
     * Tag for CWT
     */
    private static CWT_TAG = Buffer.from('d83d', 'hex');

    /**
     * @see https://tools.ietf.org/html/draft-ietf-ace-cbor-web-token-08#section-4
     */
        private claims = { iss: 1, sub: 2, aud: 3, exp: 4, nbf: 5, iat: 6, cti: 7 };

    constructor() {
    }

    public async sign(privateKey: KJUR.KJUR.crypto.ECDSA): Promise<void> {
        const payload = CborEncoder.encode(this.serializeClaims());
        this.coseSignMessage.headers.algorithm.value = CoseAlgorithm.ES256; // TODO: Permettre de changer ceci.
        this.coseSignMessage.attachPayload(payload);
        await this.coseSignMessage.sign(privateKey);
    }

    public async verify2(publicKey: KJUR.KJUR.crypto.ECDSA): Promise<boolean> {
        const payload = CborEncoder.encode(this.serializeClaims());
        this.coseSignMessage.headers.algorithm.value = CoseAlgorithm.ES256; // TODO: Permettre de changer ceci.
        this.coseSignMessage.attachPayload(payload);
        return await this.coseSignMessage.verify(publicKey);
    }

    public async mac(secret: ArrayBuffer): Promise<void> {
        const payload = CborEncoder.encode(this.serializeClaims());
        this.coseMacMessage.headers.algorithm.value = CoseAlgorithm.HMAC256_64; // TODO: Permettre de changer ceci.
        this.coseMacMessage.attachPayload(payload);
        await this.coseMacMessage.mac(secret);
    }

    public async verify(secret: ArrayBuffer): Promise<boolean> {
        const payload = CborEncoder.encode(this.serializeClaims());
        this.coseMacMessage.headers.algorithm.value = CoseAlgorithm.HMAC256_64; // TODO: Permettre de changer ceci.
        this.coseMacMessage.attachPayload(payload);
       return await this.coseMacMessage.verify(secret);
    }

    public static fromListElement(listElement: CborDataItem): CborWebToken {
        const cwt = new CborWebToken();
        const coseMessage = CborDataItem.to(COSEMac0, listElement);
        cwt.coseMacMessage = coseMessage;
        const payload = coseMessage.payload;
        cwt.deserializeClaims(<CborMap>CborDecoder.decode(payload));
        return cwt;
    }

    public serialize(): string {
        return Buffer.concat([CborWebToken.CWT_TAG, Buffer.from(CborEncoder.encode(CborDataItem.from(this.coseMacMessage)))]).toString("base64");
    }

    public static parse(value: string): CborWebToken {
        const test = CborDecoder.decode(Base64.decode(value));
        return CborWebToken.fromListElement(test);
    } 

    private serializeClaims(): CborMap {
        const payload = new CborMap();

        if (this.issuer) {
            payload.set(CborWebToken.ISS_KEY, new CborTextString(this.issuer));
        }

        if (!this.subject) {
            throw new Error('sub is mandatory');
        }
        payload.set(CborWebToken.SUB_KEY, new CborTextString(this.subject));

        if (!this.audience) {
            throw new Error('aud is mandatory');
        }
        payload.set(CborWebToken.AUD_KEY, new CborTextString(this.audience));


        if (!this.expiration) {
            throw new Error('exp is mandatory');
        }
        payload.set(CborWebToken.EXP_KEY, new CborNumber(this.expiration));

        if (!this.notBefore) {
            throw new Error('nbf is mandatory');
        }
        payload.set(CborWebToken.NBF_KEY, new CborNumber(this.notBefore));

        if (!this.issuedAt) {
            throw new Error('iat is mandatory');
        }
        payload.set(CborWebToken.IAT_KEY, new CborNumber(this.issuedAt));
        
        if (this.cwtId) {
            payload.set(CborWebToken.CTI_KEY, new CborByteString(this.cwtId));
        }

        if (this.nonce) {
            payload.set(CborWebToken.NONCE_KEY, new CborByteString(this.nonce));
        }
        return payload;
    }

    private deserializeClaims(payload: CborMap): void {
        const issStringElement = payload.get(CborWebToken.ISS_KEY);
        if (issStringElement) this.issuer = issStringElement.getValue();

        const subStringElement = payload.get(CborWebToken.SUB_KEY);
        if (subStringElement) this.subject = subStringElement.getValue();

        const audStringElement = payload.get(CborWebToken.AUD_KEY);
        if (audStringElement) this.audience = audStringElement.getValue();

        const expNumberElement = payload.get(CborWebToken.EXP_KEY);
        if (expNumberElement) this.expiration = expNumberElement.getValue();

        const nbfNumberElement = payload.get(CborWebToken.NBF_KEY);
        if (nbfNumberElement) this.notBefore = nbfNumberElement.getValue();

        const iatNumberElement = payload.get(CborWebToken.IAT_KEY);
        if (iatNumberElement) this.issuedAt = iatNumberElement.getValue();
       
        const ctiByteStringElement = payload.get(CborWebToken.CTI_KEY);
        if (ctiByteStringElement) this.cwtId = ctiByteStringElement.getValue();

        const nonceByteStringElement = payload.get(CborWebToken.NONCE_KEY);
        if (nonceByteStringElement) this.nonce = nonceByteStringElement.getValue();
    }
}