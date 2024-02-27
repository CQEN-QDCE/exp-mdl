import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { Cbor } from '../../../src/cbor/cbor';
import { IssuerSigned } from '../../../src/issuer-signed/issuer-signed';
import { Hex } from '../../../src/utils/hex';
import { MobileDocument } from '../../../src/mobile-document';
describe("ACA-py OID4VC Tests", () => {
    
//    let localhost1: string = 'http://localhost:3001';
//    let localhost2: string = 'http://localhost:8081';

    let localhost1: string = 'https://mdl-issuer-admin.apps.exp.openshift.cqen.ca';
    let localhost2: string = 'https://mdl-issuer-oid4vci.apps.exp.openshift.cqen.ca';

    let client: AxiosInstance;
    
    beforeAll(async () => {
        client = axios.create();
    });

    test("Credential Issuance", async () => {
        
        let createDidRequest: any = {
            "method": "key"
        };

        const didCreateResponse: AxiosResponse = await client.post(`${localhost1}/wallet/did/create`, createDidRequest);
        
        const did = didCreateResponse.data.result;

        let exchangeCreateRequest: any = {
            "did": did.did,
//            "supported_cred_id": "18ebd91e-9e76-4f88-94b7-6fd1fd34d190",  
            "supported_cred_id": "e048673c-2888-4fc3-86d8-7c167628c5ae",
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
        const credentialOffer = credentialOfferResponse.data;
        const credentialIssuerUrl = credentialOffer.credential_issuer;
        const credentials = credentialOffer.credentials;
        const grants = credentialOffer.grants;
        let pre: string = ''; 
        for (const property in grants) {
            console.log(`${property}: ${grants[property]}`);
            if (property === 'urn:ietf:params:oauth:grant-type:pre-authorized_code') {
                pre = grants[property]['pre-authorized_code'];
                let test = 1;
            }
        }
        let accessTokenRequest: any = {
            "grant_type": "urn:ietf:params:oauth:grant-type:pre-authorized_code",
            "pre-authorized_code": pre
        };

        const params = {
            format: 'json',
            option: 'value'
          };
          
        const data = Object.keys(accessTokenRequest)
            .map((key) => `${key}=${encodeURIComponent(accessTokenRequest[key])}`)
            .join('&');
          
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url: `${localhost2}/token`,
        };
          
        const accessTokenResponse: AxiosResponse = await client(options);
        const accessToken = accessTokenResponse.data;

        let credentialRequest: any = {
            "format": "mso_mdoc",
//            "doctype": "org.iso.18013.5.1.mDL",
            "proof": 
            { 
                "proof_type": "cwt", 
                "cwt" : null 
            }
        };

        const credentialResponse: AxiosResponse = await client.post(`${localhost2}/credential`, credentialRequest, { headers: { 'Authorization': 'BEARER ' + accessToken.access_token } });  

        //const exchange2 = credentialResponse.data;

        //const parsedList = DataElementDeserializer.fromCBORHex(exchange2.credential);
        //const issuerSigned = Cbor.decode(IssuerSigned, Hex.decode(credentialResponse.data.credential));
        const issuerSigned = Cbor.decode(MobileDocument, Hex.decode(credentialResponse.data.credential));
        let bla = 1;
    });
});