/*!
 * Copyright (c) 2022-2023 Digital Bazaar, Inc. All rights reserved.
 */
//import {discoverIssuer, generateDIDProofJWT} from './util.js';
///import {httpClient} from '@digitalbazaar/http-client';
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders, AxiosInstance } from 'axios';
import { Base64 } from '../utils/base64';
import { Text } from '../utils/text';

const GRANT_TYPES = new Map([
  ['preAuthorizedCode', 'urn:ietf:params:oauth:grant-type:pre-authorized_code']
]);
const HEADERS = {accept: 'application/json'};

//const TEXT_ENCODER = new TextEncoder();
const ENCODED_PERIOD = Text.encode('.');
const WELL_KNOWN_REGEX = /\/\.well-known\/([^\/]+)/;

export class OID4Client {

    accessToken: any;
    agent: any;
    metadata: any;
    issuerConfig: any;
    offer: any;

    public static readonly client: AxiosInstance = axios.create();

  constructor({accessToken = null, agent = null, issuerConfig = null, metadata = null, offer = null} = {}) {
    this.accessToken = accessToken;
    this.agent = agent;
    this.metadata = metadata;
    this.issuerConfig = issuerConfig;
    this.offer = offer;
  }

  
  async requestCredential(
    credentialDefinition: any, did: any, didProofSigner: any, agent: any = null) {
    const {issuerConfig, offer} = this;
    let requests;
    if(!credentialDefinition) {
      if(!offer) {
        throw new TypeError('"credentialDefinition" must be an object.');
      }
      requests = _createCredentialRequestsFromOffer({issuerConfig, offer});
      if(requests.length > 1) {
        throw new Error(
          'More than one credential is offered; ' +
          'use "requestCredentials()" instead.');
      }
    } else {
      requests = [{
        format: 'ldp_vc',
        credential_definition: credentialDefinition
      }];
    }
    return this.requestCredentials(requests, did, didProofSigner, agent);
  }


  async requestCredentials(
    requests: any, did: any, didProofSigner: any, agent: any, alwaysUseBatchEndpoint: boolean = false) {
    const {issuerConfig, offer} = this;
    if(requests === undefined && offer) {
      requests = _createCredentialRequestsFromOffer({issuerConfig, offer});
    } else if(!(Array.isArray(requests) && requests.length > 0)) {
      throw new TypeError('"requests" must be an array of length >= 1.');
    }
    // TODO: validate `requests` format
    //requests.forEach(_assertRequest);
    // set default `format`
    requests = requests.map(r => ({format: 'ldp_vc', ...r}));

    try {
      /* First send credential request(s) to DS without DID proof JWT, e.g.:

      POST /credential HTTP/1.1
      Host: server.example.com
      Content-Type: application/json
      Authorization: BEARER czZCaGRSa3F0MzpnWDFmQmF0M2JW

      {
        "format": "ldp_vc",
        "credential_definition": {...},
        // only present on retry after server requests it
        "proof": {
          "proof_type": "jwt",
          "jwt": "eyJraW..."
        }
      }

      OR (if multiple `requests` were given)

      POST /batch_credential HTTP/1.1
      Host: server.example.com
      Content-Type: application/json
      Authorization: BEARER czZCaGRSa3F0MzpnWDFmQmF0M2JW

      {
        "credential_requests": [{
          "format": "ldp_vc",
          "credential_definition": {...},
          // only present on retry after server requests it
          "proof": {
            "proof_type": "jwt",
            "jwt": "eyJraW..."
          }
        }, {
          ...
        }]
      }
      */

      OID4Client.client.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      const body: any = {};
      body.format = 'mso_mdoc';
      body.docType = 'org.iso.18013.5.1.mDL';
      body.proof = {};
      body.proof.proof_type = 'cwt';
      body.proof.cwt = 'Cbor Web Token';
      await OID4Client.client.post(this.issuerConfig.credential_endpoint, body);



      let url;
      let json;
      if(requests.length > 1 || alwaysUseBatchEndpoint) {
        ({batch_credential_endpoint: url} = this.issuerConfig);
        json = {credential_requests: requests};
      } else {
        ({credential_endpoint: url} = this.issuerConfig);
        json = {...requests[0]};
      }

      let result;
      const headers = {
        ...HEADERS,
        authorization: `Bearer ${this.accessToken}`
      };
      for(let retries = 0; retries <= 1; ++retries) {
        try {
          //const response = await httpClient.post(url, {agent, headers, json});
          const response = {} as AxiosResponse;
          result = response.data;
          if(!result) {
            const error = new Error('Credential response format is not JSON.');
            error.name = 'DataError';
            throw error;
          }
          break;
        } catch(cause) {
          if(!_isMissingProofError(cause)) {
            // non-specific error case
            throw cause;
          }

          // if `didProofSigner` is not provided, throw error
          if(!(did && didProofSigner)) {
            const {data: details} = cause;
            const error = new Error('DID authentication is required.');
            error.name = 'NotAllowedError';
            //error.details = details;
            throw error;
          }

          // validate that `result` has
          const {data: {c_nonce: nonce}} = cause;
          if(!(nonce && typeof nonce === 'string')) {
            const error = new Error('No DID proof challenge specified.');
            error.name = 'DataError';
            throw error;
          }

          // generate a DID proof JWT
          const {issuer: aud} = this.issuerConfig;
          const jwt = await generateDIDProofJWT(
            didProofSigner,
            nonce,
            // the entity identified by the DID is issuing this JWT
            did,
            // audience MUST be the target issuer per the OID4VC spec
            aud
          );

          // add proof to body to be posted and loop to retry
          const proof = {proof_type: 'jwt', jwt};
          if(json.credential_requests) {
            json.credential_requests = json.credential_requests.map(
              cr => ({...cr, proof}));
          } else {
            json.proof = proof;
          }
        }
      }

      // wallet / client receives credential:
      /* Note: The credential is not wrapped here in a VP in the current spec:

      HTTP/1.1 200 OK
        Content-Type: application/json
        Cache-Control: no-store

      {
        "format": "ldp_vc"
        "credential" : {...}
      }

      OR (if multiple `requests` were given)

      {
        "credential_responses": [{
          "format": "ldp_vc",
          "credential": {...}
        }]
      }
      */
      return result;
    } catch(cause) {
      const error = new Error('Could not receive credentials.');
      error.name = 'OperationError';
      throw error;
    }
  }

  static async getCredentialOffer() {
    //let client: AxiosInstance = axios.create();
    const searchResponse: AxiosResponse = await this.client.get(`http://localhost:5050/credential-offer-uri`);
    return searchResponse.data;
  }

  // create a client from a credential offer
  static async fromCredentialOffer(offer: string, agent: any = null) {
    // validate offer
    //const {credential_issuer, credentials, grants = {}} = offer;
    const decodedOffer = decodeURI(offer);
    const offerUrl = new URL(decodedOffer);
    const params = new URLSearchParams(offerUrl.search);
    const credential_offer = params.get('credential_offer');
    const json = JSON.parse(credential_offer);
    let credential_issuer:any = json.credential_issuer;
    let credentials:any = json.credentials;
    let grants:any = json.grants;

    let parsedIssuer;
    try {
      parsedIssuer = new URL(credential_issuer);
//      if(parsedIssuer.protocol !== 'https:') {
//        throw new Error('Only "https" credential issuer URLs are supported.');
//      }
    } catch(cause) {
      throw new Error('"offer.credential_issuer" is not valid.');
    }
    if(!(Array.isArray(credentials) && credentials.length > 0 &&
      credentials.every(c => c && typeof c === 'object'))) {
      throw new Error('"offer.credentials" is not valid.');
    }
    const grant = grants[GRANT_TYPES.get('preAuthorizedCode')];
    if(!grant) {
      // FIXME: implement `authorization_code` grant type as well
      throw new Error('Only "pre-authorized_code" grant type is implemented.');
    }
    const {
      'pre-authorized_code': preAuthorizedCode,
      user_pin_required: userPinRequired
    } = grant;
    if(!preAuthorizedCode) {
      throw new Error('"offer.grant" is missing "pre-authorized_code".');
    }
    if(userPinRequired) {
      throw new Error('User pin is not implemented.');
    }

    try {
      // discover issuer info
      const issuerConfigUrl =
        `${parsedIssuer.origin}/.well-known/openid-credential-issuer` +
        parsedIssuer.pathname;
      const {issuerConfig, metadata} = await discoverIssuer(issuerConfigUrl, agent);

      /* First get access token from AS (Authorization Server), e.g.:

      POST /token HTTP/1.1
        Host: server.example.com
        Content-Type: application/x-www-form-urlencoded
        grant_type=urn:ietf:params:oauth:grant-type:pre-authorized_code
        &pre-authorized_code=SplxlOBeZQQYbYS6WxSbIA
        &user_pin=493536

      Note a bad response would look like:

      /*
      HTTP/1.1 400 Bad Request
      Content-Type: application/json
      Cache-Control: no-store
      {
        "error": "invalid_request"
      }
      */
      //const body = new URLSearchParams();
      //body.set('grant_type', GRANT_TYPES.get('preAuthorizedCode'));
      //body.set('pre-authorized_code', preAuthorizedCode);

      const body: any = {};
      body.grant_type = GRANT_TYPES.get('preAuthorizedCode');
      body.pre_authorized_code = preAuthorizedCode;
      const {token_endpoint} = issuerConfig;
      //let client: AxiosInstance = axios.create();
      const searchResponse: AxiosResponse = await this.client.post(`${token_endpoint}`, body);
      //const response = await httpClient.post(token_endpoint, {
      //  agent, body, headers: HEADERS
      //});
      //const response = {} as AxiosResponse;
      const {data: result} = searchResponse;
      if(!result) {
        const error = new Error(
          'Could not get access token; response is not JSON.');
        error.name = 'DataError';
        throw error;
      }

      /* Validate response body (Note: Do not check or use `c_nonce*` here
      because it conflates AS with DS (Delivery Server)), e.g.:

      HTTP/1.1 200 OK
        Content-Type: application/json
        Cache-Control: no-store

        {
          "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6Ikp..sHQ",
          "token_type": "bearer",
          "expires_in": 86400
        }
      */
      const {access_token: accessToken, token_type} = result;
      if(!(accessToken && typeof accessToken === 'string')) {
        const error = new Error(
          'Invalid access token response; "access_token" must be a string.');
        error.name = 'DataError';
        throw error;
      }
      if(token_type !== 'bearer') {
        const error = new Error(
          'Invalid access token response; "token_type" must be a "bearer".');
        error.name = 'DataError';
        throw error;
      }

      // create client w/access token
      return new OID4Client(
        {accessToken, agent, issuerConfig, metadata, offer});
    } catch(cause) {
      const error = new Error('Could not create OID4 client.');
      error.name = 'OperationError';
      throw error;
    }
  }
}

function _assertRequest(request) {
  if(!(request && typeof request === 'object')) {
    throw new TypeError('"request" must be an object.');
  }
  const {credential_definition, format} = request;
  if(format !== undefined && format !== 'ldp_vc') {
    throw new TypeError('Credential request "format" must be "ldp_vc".');
  }
  if(!(credential_definition && typeof credential_definition === 'object')) {
    throw new TypeError(
      'Credential request "credential_definition" must be an object.');
  }
  const {'@context': context, type: type} = credential_definition;
  if(!(Array.isArray(context) && context.length > 0)) {
    throw new TypeError(
      'Credential definition "@context" must be an array of length >= 1.');
  }
  if(!(Array.isArray(type) && type.length > 0)) {
    throw new TypeError(
      'Credential definition "type" must be an array of length >= 2.');
  }
}

function _isMissingProofError(error) {
  /* If DID authn is required, delivery server sends, e.g.:

  HTTP/1.1 400 Bad Request
    Content-Type: application/json
    Cache-Control: no-store

  {
    "error": "invalid_or_missing_proof" // or "invalid_proof"
    "error_description":
        "Credential issuer requires proof element in Credential Request"
    "c_nonce": "8YE9hCnyV2",
    "c_nonce_expires_in": 86400
  }
  */
  // `invalid_proof` OID4VCI draft 13+, `invalid_or_missing_proof` earlier
  const errorType = error.data?.error;
  return error.status === 400 &&
    (errorType === 'invalid_proof' ||
    errorType === 'invalid_or_missing_proof');
}

function _createCredentialRequestFromId({id, issuerConfig}) {
  const {credentials_supported: supported = []} = issuerConfig;
  const meta = supported.find(d => d.id === id);
  if(!meta) {
    throw new Error(`No supported credential "${id}" found.`);
  }
  const {format, credential_definition} = meta;
  if(typeof format !== 'string') {
    throw new Error(
      `Invalid supported credential "${id}"; "format" not specified.`);
  }
  if(format !== 'ldp_vc') {
    throw new Error(`Unsupported "format" "${format}".`);
  }
  if(!(Array.isArray(credential_definition?.['@context']) &&
    Array.isArray(credential_definition?.types))) {
    throw new Error(
      `Invalid supported credential "${id}"; "credential_definition" not ` +
      'fully specified.');
  }
  return {format, credential_definition};
}

function _createCredentialRequestsFromOffer({issuerConfig, offer}) {

  const decodedOffer = decodeURI(offer);
  const offerUrl = new URL(decodedOffer);
  const params = new URLSearchParams(offerUrl.search);
  const credential_offer = params.get('credential_offer');
  const json = JSON.parse(credential_offer);
  let credential_issuer:any = json.credential_issuer;
  let credentials:any = json.credentials;
  let grants:any = json.grants;

  // build requests from `offer`
  return credentials.map(c => {
    if(typeof c === 'string') {
      // use issuer config metadata to dereference string
      return _createCredentialRequestFromId({id: c, issuerConfig});
    }
    return c;
  });
}






export function assert(x, name, type, optional = false) {
    const article = type === 'object' ? 'an' : 'a';
    if(x !== undefined && typeof x !== type) {
      throw new TypeError(
        `${optional ? 'When present, ' : ''} ` +
        `"${name}" must be ${article} ${type}.`);
    }
  }
  
  export function assertOptional(x, name, type) {
    return assert(x, name, type, true);
  }
  
  export async function discoverIssuer(issuerConfigUrl, agent = null) {
    try {
      assert(issuerConfigUrl, 'issuerConfigUrl', 'string');
  
      const response = await fetchJSON(issuerConfigUrl, agent);
      if(!response.data) {
        const error = new Error('Issuer configuration format is not JSON.');
        error.name = 'DataError';
        throw error;
      }
      const {data: issuerMetaData} = response;
      const {issuer, authorization_server} = issuerMetaData;
  
      if(authorization_server && authorization_server !== issuer) {
        // not yet implemented
        throw new Error('Separate authorization server not yet implemented.');
      }
  
      // validate `issuer`
//      if(!(typeof issuer === 'string' && issuer.startsWith('https://'))) {
//        const error = new Error('"issuer" is not an HTTPS URL.');
//        error.name = 'DataError';
//        throw error;
//      }
  
      /* Validate `issuer` value against `issuerConfigUrl` (per RFC 8414):
  
      The `origin` and `path` element must be parsed from `issuer` and checked
      against `issuerConfigUrl` like so:
  
      For issuer `<origin>` (no path), `issuerConfigUrl` must match:
      `<origin>/.well-known/<any-path-segment>`
  
      For issuer `<origin><path>`, `issuerConfigUrl` must be:
      `<origin>/.well-known/<any-path-segment><path>` */
      const {pathname: wellKnownPath} = new URL(issuerConfigUrl);
      const anyPathSegment = wellKnownPath.match(WELL_KNOWN_REGEX)[1];
      const {origin, pathname} = new URL(issuer);
      let expectedConfigUrl = `${origin}/.well-known/${anyPathSegment}`;
      if(pathname !== '/') {
        expectedConfigUrl += pathname;
      }
//      if(issuerConfigUrl !== expectedConfigUrl) {
//        const error = new Error('"issuer" does not match configuration URL.');
//        error.name = 'DataError';
//        throw error;
//      }


      // fetch AS meta data
//      const asMetaDataUrl =
//        `${origin}/.well-known/oauth-authorization-server${pathname}`;
//      const asMetaDataResponse = await fetchJSON(asMetaDataUrl, agent);
//      if(!asMetaDataResponse.data) {
//        const error = new Error('Authorization server meta data is not JSON.');
//        error.name = 'DataError';
//        throw error;
//      }
  
     // const {data: asMetaData} = response;
      // merge AS meta data into total issuer config
//      const issuerConfig = {...issuerMetaData, ...asMetaData};
      const issuerConfig = {...issuerMetaData};
  
      // ensure `token_endpoint` is valid
      const {token_endpoint} = issuerConfig;
      assert(token_endpoint, 'token_endpoint', 'string');
  
      // return merged config and separate issuer and AS configs
//      const metadata = {issuer: issuerMetaData, authorizationServer: asMetaData};
      const metadata = {issuer: issuerMetaData};
      return {issuerConfig, metadata};
    } catch(cause) {
      const error = new Error('Could not get OpenID issuer configuration.');
      error.name = 'OperationError';
      //error.cause = cause;
      throw error;
    }
  }
  
  export async function fetchJSON(url: string, agent: any = null) {
    // allow these params to be passed / configured
    const fetchOptions = {
      // max size for issuer config related responses (in bytes, ~4 KiB)
      size: 4096,
      // timeout in ms for fetching an issuer config
      timeout: 5000,
      agent
    };
    axios.defaults.timeout = 15000
    //let client: AxiosInstance = axios.create();
    let searchResponse: AxiosResponse;
    try { 
      searchResponse = await OID4Client.client.get(`${url}`);
    } catch (error) {
      let bla = 1;
    }
    return searchResponse;
    //return httpClient.get(url, fetchOptions);
  }
  
  export async function generateDIDProofJWT(
    signer: any, nonce: any, iss: any, aud: any, exp: any = null, nbf: any = null) {
    /* Example:
    {
      "alg": "ES256",
      "kid":"did:example:ebfeb1f712ebc6f1c276e12ec21/keys/1"
    }.
    {
      "iss": "s6BhdRkqt3",
      "aud": "https://server.example.com",
      "iat": 1659145924,
      "nonce": "tZignsnFbp"
    }
    */
  
    if(exp === undefined) {
      // default to 5 minute expiration time
      exp = Math.floor(Date.now() / 1000) + 60 * 5;
    }
    if(nbf === undefined) {
      // default to now
      nbf = Math.floor(Date.now() / 1000);
    }
  
    const {id: kid} = signer;
    const alg = _curveToAlg(signer.algorithm);
    const payload = {nonce, iss, aud, exp, nbf};
    const protectedHeader = {alg, kid};
  
    return signJWT(payload, protectedHeader, signer);
  }
  
  export function parseCredentialOfferUrl(url: string) {
    assert(url, 'url', 'string');
  
    /* Parse URL, e.g.:
  
    'openid-credential-offer://?' +
      'credential_offer=%7B%22credential_issuer%22%3A%22https%3A%2F%2F' +
      'localhost%3A18443%2Fexchangers%2Fz19t8xb568tNRD1zVm9R5diXR%2F' +
      'exchanges%2Fz1ADs3ur2s9tm6JUW6CnTiyn3%22%2C%22credentials' +
      '%22%3A%5B%7B%22format%22%3A%22ldp_vc%22%2C%22credential_definition' +
      '%22%3A%7B%22%40context%22%3A%5B%22https%3A%2F%2Fwww.w3.org%2F2018%2F' +
      'credentials%2Fv1%22%2C%22https%3A%2F%2Fwww.w3.org%2F2018%2F' +
      'credentials%2Fexamples%2Fv1%22%5D%2C%22type%22%3A%5B%22' +
      'VerifiableCredential%22%2C%22UniversityDegreeCredential' +
      '%22%5D%7D%7D%5D%2C%22grants%22%3A%7B%22urn%3Aietf%3Aparams' +
      '%3Aoauth%3Agrant-type%3Apre-authorized_code%22%3A%7B%22' +
      'pre-authorized_code%22%3A%22z1AEvnk2cqeRM1Mfv75vzHSUo%22%7D%7D%7D';
    */
    const {protocol, searchParams} = new URL(url);
    if(protocol !== 'openid-credential-offer:') {
      throw new SyntaxError(
        '"url" must express a URL with the ' +
        '"openid-credential-offer" protocol.');
    }
    return JSON.parse(searchParams.get('credential_offer'));
  }
  
  export async function signJWT(payload: any, protectedHeader: any, signer: any) {
    //let enc = new TextEncoder(); // always utf-8
    // encode payload and protected header
    const b64Payload = Base64.urlEncode(Text.encode(JSON.stringify(payload)));
    const b64ProtectedHeader = Base64.urlEncode(Text.encode(JSON.stringify(protectedHeader)));
    payload = Text.encode(b64Payload);
    protectedHeader = Text.encode(b64ProtectedHeader);
  
    // concatenate
    const data = new Uint8Array(
      protectedHeader.length + 2 + payload.length);
    data.set(protectedHeader);
    ///data.set(ENCODED_PERIOD, protectedHeader.length);
    data.set(payload, protectedHeader.length + 2);
  
    // sign
    const signature = await signer.sign({data});
  
    // create JWS
    const jws = {
      signature: Base64.urlEncode(signature),
      payload: b64Payload,
      protected: b64ProtectedHeader
    };
  
    // create compact JWT
    return `${jws.protected}.${jws.payload}.${jws.signature}`;
  }
  
  function _curveToAlg(crv) {
    if(crv === 'Ed25519' || crv === 'Ed448') {
      return 'EdDSA';
    }
    if(crv?.startsWith('P-')) {
      return `ES${crv.slice(2)}`;
    }
    if(crv === 'secp256k1') {
      return 'ES256K';
    }
    return crv;
  }
