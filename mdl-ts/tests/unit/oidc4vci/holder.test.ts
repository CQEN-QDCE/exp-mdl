import { OpenID4VCIClient } from "../../../src/oidc4vci/oid4vci-client";
import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { setDefaultResultOrder } from "dns";
import { Cbor } from "../../../src/cbor/cbor";
import { MobileDocument } from "../../../src/mdoc/mobile-document";
import { Hex } from "../../../src/utils/hex";
setDefaultResultOrder("ipv4first");

describe('Holder', () => {

    let localhost1: string = 'http://localhost:3001';
    let client: AxiosInstance;

    beforeAll(async () => {
        client = axios.create();
    });

    test('Get credential', async () => {
        const holder = new OpenID4VCIClient({kid: "123", did: "did:example:123", privKeyHex: "123"});
        const credentialOffer = 'openid-credential-offer://?credential_offer=%7B%22credential_issuer%22%3A%22https%3A%2F%2Fmdl-issuer-oid4vci.apps.exp.openshift.cqen.ca%22%2C%22credentials%22%3A%5B%22MobileDrivingLicense%22%5D%2C%22grants%22%3A%7B%22urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Apre-authorized_code%22%3A%7B%22pre-authorized_code%22%3A%22hl-GWAeiPVWZav24NMrALg%22%2C%22user_pin_required%22%3Afalse%7D%7D%7D';
        const credentials = await holder.getCredentialFromOffer(credentialOffer);
        const test = 1;
    });

    test('Get credential 2', async () => {

        const holder = new OpenID4VCIClient({kid: "123", did: "did:example:123", privKeyHex: "123"});

        let createDidRequest: any = {
            "method": "key"
        };

        const didCreateResponse: AxiosResponse = await client.post(`${localhost1}/wallet/did/create`, createDidRequest);
        
        const did = didCreateResponse.data.result;

        let exchangeCreateRequest: any = {
            "did": did.did,
            "supported_cred_id": "d70fd027-54f6-4c11-b306-43028c5ee37e",
            "claims": {
                "org.iso.18013.5.1": { 
                    "given_name": "Mascetti", 
                    "family_name": "Raffaello", 
                    "birth_date" : "1922-03-13" },
                "org.iso.18013.5.1.aamva": {
                    "organ_donor": true
                }
            }
        };
        
        const exchangeCreateResponse: AxiosResponse = await client.post(`${localhost1}/oid4vci/exchange/create`, exchangeCreateRequest);
        const exchange = exchangeCreateResponse.data;

        const credentialOfferResponse: AxiosResponse = await client.get(`${localhost1}/oid4vci/credential-offer?exchange_id=${exchange.exchange_id}`);
        const jsonStr = JSON.stringify(credentialOfferResponse.data);
        const encodedJson = encodeURIComponent(jsonStr);
        const urlOffer = `openid-credential-offer://?credential_offer=${encodedJson}`;  

        const credentialOffer = 'openid-credential-offer://?credential_offer=%7B%22credential_issuer%22%3A%22https%3A%2F%2Fmdl-issuer-oid4vci.apps.exp.openshift.cqen.ca%22%2C%22credentials%22%3A%5B%22MobileDrivingLicense%22%5D%2C%22grants%22%3A%7B%22urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Apre-authorized_code%22%3A%7B%22pre-authorized_code%22%3A%22hl-GWAeiPVWZav24NMrALg%22%2C%22user_pin_required%22%3Afalse%7D%7D%7D';
        const credentials = await holder.getCredentialFromOffer(urlOffer);
        const issuerSigned = Cbor.decode(MobileDocument, Hex.decode(credentials[0]));
        //const issuerSigned = Cbor.decode(MobileDocument, Hex.decode(credentials[0]));
        const mso = issuerSigned.mso;
        const test = 1;
    });
    
});
