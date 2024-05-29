// https://github.com/Tangle-Labs/oid4vc/blob/main/src/oid4vci/Holder/holder.ts

import * as didJWT from "did-jwt";
import rs from "jsrsasign";
import { Base64 } from "../utils/base64";
import axios, { AxiosResponse } from 'axios';
import { CreateTokenRequestOptions, KeyPairRequirements } from "./vc-holder.types";
import { Text } from "../utils/text";
import { ArrayBufferComparer } from "../utils/array-buffer-comparer";
import { Base58 } from "../utils/base58";

export class OpenID4VCIClient {
    private holderKeys: KeyPairRequirements;
    private signer: didJWT.Signer;
    private jwk: any;

    constructor(args: KeyPairRequirements) {
        const caKeyPair = rs.KEYUTIL.generateKeypair("EC", "secp256r1");
        const test:any  = rs.KEYUTIL.getJWKFromKey(caKeyPair.prvKeyObj);
        this.jwk = test;
        const test2  = new Uint8Array(Base64.urlDecode(test.d));
        const pubkey  = ArrayBufferComparer.concatenate(Base64.decode(test.x), Base64.decode(test.y));
        const didKey = Base58.encode(new Uint8Array(pubkey));
        this.holderKeys = args;
        this.holderKeys.did = `did:key:${didKey}`;
        this.holderKeys.kid = `${this.holderKeys.did}#${didKey}`;
        //this.signer = buildSigner(args.privKeyHex);
        this.signer = didJWT.ES256Signer(test2);
    }

    async createTokenRequest(args: CreateTokenRequestOptions) {
        const response = {
            grant_type: "urn:ietf:params:oauth:grant-type:pre-authorized_code",
            "pre-authorized_code": args.preAuthCode,
        };
        // @ts-ignore
        if (args.userPin) response.user_pin = args.userPin;
        return response;
    }

    async parseCredentialOffer(offer: string): Promise<Record<string, any>> {
        const rawOffer = Text.parseQueryStringToJson(
            offer.split("openid-credential-offer://")[1]
        );
        let credentialOffer;
        if (rawOffer.credentialOfferUri) {
            const { data } = await axios.get(rawOffer.credentialOfferUri);
            credentialOffer = Text.snakeToCamelRecursive(data);
        } else {
            credentialOffer = Text.snakeToCamelRecursive(rawOffer.credentialOffer);
        }

        return credentialOffer;
    }

    async retrieveMetadata(credentialOffer: string) {
        const offerRaw = await this.parseCredentialOffer(credentialOffer);
        const metadataEndpoint = Text.joinUrls(
            offerRaw.credentialIssuer,
            ".well-known/openid-credential-issuer"
        );
        const oauthMetadataUrl = Text.joinUrls(
            offerRaw.credentialIssuer,
            ".well-known/oauth-authorization-server"
        );
        console.log(oauthMetadataUrl);
        const { data } = await axios.get(metadataEndpoint);
        const { data: oauthServerMetadata } = await axios.get(oauthMetadataUrl);
        const metadata = {
            ...Text.snakeToCamelRecursive(data),
            ...Text.snakeToCamelRecursive(oauthServerMetadata),
        };

        const display =
            metadata.display &&
            metadata.display.find((d: any) => d.locale === "en-US");
        metadata.display = display;

        return metadata;
    }

    async retrieveCredential(
        path: string,
        accessToken: string,
        credentials: string[],
        proof: string
    ): Promise<string[]> {
        const payload =
            credentials.length > 1
                ? {
                      credential_requests: [
                          ...credentials.map((c) => ({
                              "format": "mso_mdoc",
                              "doctype": "org.iso.18013.5.1.mDL",
                              proof: {
                                  proof_type: "jwt",
                                  jwt: proof,
                              },
                          })),
                      ],
                  }
                : {
                    "format": "mso_mdoc",
                    "doctype": "org.iso.18013.5.1.mDL",
                    proof: {
                        proof_type: "jwt",
                        jwt: proof,
                    },
                  };
        const { data } = await axios.post(path, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const response =
            Object.keys(credentials).length > 1
                ? data.credential_responses.map(
                      (c: { format: string; credential: string }) =>
                          c.credential
                  )
                : [data.credential];
        return response;
    }

    async getCredentialFromOffer(credentialOffer: string, pin?: number) {
        const offer = await this.parseCredentialOffer(credentialOffer);
        const { grants, credentialIssuer, credentials } = offer;
        const metadata = await this.retrieveMetadata(credentialOffer);
        console.log("retrieving meta");
        const createTokenPayload: { preAuthCode: any; userPin?: number } = {
            preAuthCode:
                grants["urn:ietf:params:oauth:grant-type:pre-authorized_code"][
                    "pre-authorized_code"
                ],
        };
        console.log("token payload", createTokenPayload);

        if (
            grants["urn:ietf:params:oauth:grant-type:pre-authorized_code"][
                "user_pin_required"
            ]
        )
            createTokenPayload.userPin = Number(pin);

        console.log("sending token request");
        const tokenRequest = await this.createTokenRequest(createTokenPayload);
        console.log(tokenRequest, metadata.tokenEndpoint);

        const data = Object.keys(tokenRequest)
        .map((key) => `${key}=${encodeURIComponent(tokenRequest[key])}`)
        .join('&');
      
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url: `${metadata.tokenEndpoint}`,
    };
      
    const tokenResponse: AxiosResponse = await axios(options);
    //const tokenResponse = accessTokenResponse.data;

//        const tokenResponse = await axios.post(
//            metadata.tokenEndpoint,
//            tokenRequest
//        );

        console.log(tokenResponse);

        const token = await didJWT.createJWT(
            {
                aud: credentialIssuer,
                nonce: tokenResponse.data.c_nonce,
            },
            { signer: this.signer, issuer: this.holderKeys.did, expiresIn: 1800},
            //{ signer: this.signer, issuer: "218232426", expiresIn: 1800},
            { alg: "ES256", 
              //kid: this.holderKeys.kid,
              jwk: {
                crv: this.jwk.crv,
                kty: this.jwk.kty,
                x:   this.jwk.x,
                y:   this.jwk.y
              },
              // @ts-ignore 
              typ: "openid4vci-proof+jwt"}
        );

        const endpoint =
            Object.keys(credentials).length > 1
                ? metadata.batchCredentialEndpoint
                : metadata.credentialEndpoint;

        return this.retrieveCredential(
            endpoint,
            tokenResponse.data.access_token,
            credentials,
            token
        );
    }

}