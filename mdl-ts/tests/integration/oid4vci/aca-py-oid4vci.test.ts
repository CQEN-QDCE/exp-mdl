import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { Cbor } from '../../../src/cbor/cbor';
import { Hex } from '../../../src/utils/hex';
import { MobileDocument } from '../../../src/mdoc/mobile-document';
import { OpenID4VCIClient } from '@sphereon/oid4vci-client';
import { Jwt, Alg, ProofOfPossessionCallbacks } from '@sphereon/oid4vci-common';
import * as test2 from '@sphereon/oid4vci-client';
import * as jose from 'jose';
import { DIDDocument } from 'did-resolver';

describe("ACA-py OID4VC Tests", () => {
    
    let localhost1: string = 'http://127.0.0.1:3001';
//    let localhost2: string = 'http://localhost:8081';

    //let localhost1: string = 'https://mdl-issuer-admin.apps.exp.openshift.cqen.ca';

    let client: AxiosInstance;
    
    beforeAll(async () => {
        client = axios.create();
    });

    test("Credential Issuance", async () => {
        
        const uri = 'openid-credential-offer://?credential_offer=%7B%22credential_issuer%22%3A%22https%3A%2F%2Fmdl-issuer-oid4vci.apps.exp.openshift.cqen.ca%22%2C%22credentials%22%3A%5B%22MobileDrivingLicense%22%5D%2C%22grants%22%3A%7B%22urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Apre-authorized_code%22%3A%7B%22pre-authorized_code%22%3A%22sPbXSgwBGfVgeUxMuz1WnQ%22%2C%22user_pin_required%22%3Afalse%7D%7D%7D';
        const uri2 = 'openid-initiate-issuance://?issuer=https%3A%2F%2Fissuer.research.identiproof.io&credential_type=OpenBadgeCredentialUrl&pre-authorized_code=4jLs9xZHEfqcoow0kHE7d1a8hUk6Sy-5bVSV2MqBUGUgiFFQi-ImL62T-FmLIo8hKA1UdMPH0lM1xAgcFkJfxIw9L-lI3mVs0hRT8YVwsEM1ma6N3wzuCdwtMU4bcwKp&user_pin_required=true';
        const client = await OpenID4VCIClient.fromURI({
            uri: uri,
            kid: 'did:example:ebfeb1f712ebc6f1c276e12ec21#key-1', // Our DID.  You can defer this also to when the acquireCredential method is called
            alg: 'ES256', // The signing Algorithm we will use. You can defer this also to when the acquireCredential method is called
            clientId: 'test-clientId', // The clientId if the Authrozation Service requires it.  If a clientId is needed you can defer this also to when the acquireAccessToken method is called
            retrieveServerMetadata: true, // Already retrieve the server metadata. Can also be done afterwards by invoking a method yourself.
          });
          
          const metadata = await client.retrieveServerMetadata();
          const accessToken = await client.acquireAccessToken();

          const { privateKey, publicKey } = await jose.generateKeyPair('ES256');

          async function signCallback(args: Jwt, kid: string): Promise<string> {
            return await new jose.SignJWT({ ...args.payload })
              .setProtectedHeader({ alg: args.header.alg })
              .setIssuedAt()
              .setIssuer(kid)
              // @ts-ignore
              .setAudience(args.payload.aud)
              .setExpirationTime('2h')
              .sign(privateKey);
          }

          const callbacks: ProofOfPossessionCallbacks<DIDDocument> = {
            // @ts-ignore
            signCallback,
          };

          const credentialResponse = await client.acquireCredentials({
            credentialTypes: 'OpenBadgeCredential',
            proofCallbacks: callbacks,
            format: 'mso_mdoc',
            alg: Alg.ES256K,
            kid: 'did:example:ebfeb1f712ebc6f1c276e12ec21#keys-1',
          });
          console.log(credentialResponse.credential);
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
            "supported_cred_id": "d70fd027-54f6-4c11-b306-43028c5ee37e",
            //"supported_cred_id": "30c5fd6a-3896-4fbb-bdde-d3a7671ed9cb",
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
            url: `${credentialIssuerUrl}/token`,
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

        const credentialResponse: AxiosResponse = await client.post(`${credentialIssuerUrl}/credential`, credentialRequest, { headers: { 'Authorization': 'BEARER ' + accessToken.access_token } });  

        //const exchange2 = credentialResponse.data;

        //const parsedList = DataElementDeserializer.fromCBORHex(exchange2.credential);
        //const issuerSigned = Cbor.decode(IssuerSigned, Hex.decode(credentialResponse.data.credential));
        const issuerSigned = Cbor.decode(MobileDocument, Hex.decode(credentialResponse.data.credential));
        let g = issuerSigned?.issuerSigned?.namespaces.get('org.iso.18013.5.1')
        if (g) {
            for (const f of g) {
                //if (f.elementIdentifier === 'given_name') 
                //if (f.elementIdentifier === 'family_name')  
            }
        }
        ///let h = g[0].elementValue;
        let bla = 1;
    });
});