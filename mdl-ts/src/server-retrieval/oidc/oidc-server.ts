import { v4 as uuidv4 } from 'uuid';
import * as x509 from "@peculiar/x509";
import { CredentialTypeRepository } from '../credential-type/credential-type-repository';
import { StorageEngine } from '../storage/storage-engine';
import { EphemeralStorageEngine } from '../storage/ephemeral-storage-engine';
import { JsonStringifier } from '../../utils/json.stringifier';
import { Jwt } from '../Jwt';
import { ServerRetrievalUtil } from '../server-retrieval-utils';

export class OidcServer {

    private static MDL_DOCTYPE = "org.iso.18013.5.1.mDL";

    private readonly supportedElements:string[] = [];

    private readonly storageEngine: StorageEngine = new EphemeralStorageEngine();

    constructor(private readonly baseUrl: string, 
                private readonly privateKey: CryptoKey,
                private readonly certificateChain: x509.X509Certificate[] = [],
                private readonly credentialTypeRepository: CredentialTypeRepository) {
        
        let mdocCredentialType = credentialTypeRepository.getMdocCredentialType(OidcServer.MDL_DOCTYPE);
        for (const [namespace, mdocNamespace] of mdocCredentialType.namespaces) {
            for (const [identifier, mdocDataElement] of mdocNamespace.dataElements) {
                this.supportedElements.push(`${namespace}:${identifier}`);
            }
            let bla = 1;
        }
    }

    public configuration(): string {
        const configuration: any = {};
        configuration.issuer = this.baseUrl;
        configuration.jwks_uri = `${this.baseUrl}/.well-known/jwks.json`;
        configuration.authorization_endpoint = `${this.baseUrl}/connect/authorize`;
        configuration.token_endpoint = `${this.baseUrl}/connect/token`;
        configuration.userinfo_endpoint = `${this.baseUrl}/connect/userinfo`;
        configuration.end_session_endpoint = `${this.baseUrl}/connect/end_session`;
        configuration.revocation_endpoint = `${this.baseUrl}/connect/revocation`;
        configuration.introspection_endpoint = `${this.baseUrl}/connect/introspec`;
        configuration.device_authorization_endpoint = `${this.baseUrl}/connect/deviceauthorization`;
        configuration.registration_endpoint = `${this.baseUrl}/connect/register`;
        configuration.frontchannel_logout_supported = true;
        configuration.frontchannel_logout_session_supported = true;
        configuration.backchannel_logout_supported = true;
        configuration.backchannel_logout_session_supported= true;
        configuration.scopes_supported = [];
        configuration.claims_supported = [];
        for (const elements of this.supportedElements) {
            configuration.scopes_supported.push(elements);
            configuration.claims_supported.push(elements);
        }
        configuration.grant_types_supported = ["authorization_code", "client_credentials", "refresh_token", "implicit", "urn:ietf:params:oauth:grant-type:device_code"];
        configuration.response_types_supported = ["code", "token", "id_token", "id_token token", "code id_token", "code token", "code id_token token"];
        configuration.response_modes_supported = ["form_post", "query", "fragment"];
        configuration.token_endpoint_auth_methods_supported = ["client_secret_basic", "client_secret_post"];
        configuration.subject_types_supported = ["public"];
        configuration.id_token_signing_alg_values_supported = ["ES256"];
        configuration.code_challenge_methods_supported = ["plain", "S256"];
        return JsonStringifier.stringify(configuration);
    }

    public clientRegistration(registrationRequest: string): string {
        const registrationRequestJson = JsonStringifier.parse(registrationRequest);
        const clientId = uuidv4();
        const response: any = {};
        response.client_id = clientId;
        response.client_id_issued_at = Date.now() / 1000;
        response.client_secret = uuidv4();
        response.client_secret_expires_at = 0;
        response.grant_types = ["authorization_code"];
        response.client_name = uuidv4();
        response.client_uri = null;
        response.logo_uri = null;
        response.redirect_uris = registrationRequestJson["redirect_uris"];
        response.scope = registrationRequestJson["scope"];
        this.cacheData(clientId, registrationRequestJson["scope"]);
        return JsonStringifier.stringify(response);
    }

    public async authorization(authorizationRequest: Map<string,string>): Promise<string> {
        const authorizationId = uuidv4();
        const clientId = authorizationRequest.get("client_id");
        const loginHint = authorizationRequest.get("login_hint");

        // TODO: how to verify this JWT? It is not specified which key should be used...
        const serverRetrievalToken = Jwt.decode(loginHint).payload["id"];
        const cachedData = this.getCachedData(clientId) 
        if (!cachedData) throw "Client was not registered";

        // TODO: should the scope in the registration request be the same as in the authorization request?
        // for now: update the cache with the scope in the authorization request
        this.cacheData(clientId, authorizationRequest.get("scope"), authorizationId, serverRetrievalToken)
        let jsonObject = {};
        jsonObject["client_id"] = authorizationRequest.get("client_id");
        jsonObject["redirect_uri"] = authorizationRequest.get("redirect_uri");
        jsonObject["auth_id"] = authorizationId;
        jsonObject["iat"] = Date.now() / 1000;
        jsonObject["exp"] = (Date.now() / 1000) + 600;
        jsonObject["sub"] = authorizationId;
        const code = await Jwt.encode(jsonObject, this.privateKey);

        let headers = {};
        headers["Cache-Control"] = ["no-cache"];
        headers["Connection"] = ["Keep-Alive"];
        headers["Accept"] = ["*/*"];
        headers["Accept-Encoding"] = ["gzip", "deflate"];
        headers["Cookie"] = ["idsrv"]; // TODO: check if this is correct
        headers["Host"] = [new URL(this.baseUrl).hostname];

        let referer = [];
        let map = new Map<string, string>();
        map.set("client_id", clientId);
        map.set("scope", authorizationRequest.get("scope"));
        map.set("redirect_uri", "com.company.isomdocreader://login"); // TODO: check if this is correct
        map.set("response_type", 'code');
        map.set("scope", authorizationRequest.get("login_hint"));
        referer.push(this.baseUrl + "/connect/authorize/callback" + ServerRetrievalUtil.mapToUrlQuery(map));
        headers["Referer"] = referer;
        headers["X-Original-Proto"] = ["http"];
        headers["X-Original-For"] = ["127.0.0.1:58873"]; // TODO: check if this is correct
        
        let response = {};
        response["Query"] = {"code": code, "scope": authorizationRequest.get("scope")};
        response["Headers"] = headers;
        return JsonStringifier.stringify(response);
    }

    public async getIdToken(tokenRequest: Map<string, string>): Promise<string> {
        const cachedData = this.getCachedData(tokenRequest.get("client_id"));
        if (!cachedData) throw "Client was not registered";
        const rawAuthorizationCode = tokenRequest.get("code");
        if (!rawAuthorizationCode) throw "Client was not authorized";
        const authorizationCode = Jwt.decode(rawAuthorizationCode).payload;
        const authorizationId = authorizationCode["auth_id"];
        if (authorizationId != cachedData["authorizationId"]) {
            throw "Client was not authorized";
        }
        let tokenResponse = {};
        let idToken = {};
        idToken["iss"] = this.baseUrl;
        idToken["iat"] = Date.now() / 1000;
        idToken["exp"] = (Date.now() / 1000) + 300;
        idToken["aud"] = this.baseUrl + "/resources";
        idToken["sub"] = '1';
        idToken["doctype"] = OidcServer.MDL_DOCTYPE;

        let accessToken = {};
        accessToken["client_id"] = tokenRequest["client_id"];
        accessToken["iss"] = this.baseUrl;
        accessToken["iat"] = Date.now() / 1000;
        accessToken["exp"] = (Date.now() / 1000) + 300;
        accessToken["aud"] = this.baseUrl + "/resources";
        accessToken["sub"] = '1';

        tokenResponse["id_token"] = await Jwt.encode(idToken, this.privateKey);
        tokenResponse["access_token"] = await Jwt.encode(accessToken, this.privateKey);
        tokenResponse["expires_in"] = 300;
        tokenResponse["token_type"] = 'Bearer';
        return JsonStringifier.stringify(tokenResponse);
    }

    public validateIdToken(): string {
        let certificateChainKeys = {};
        certificateChainKeys["keys"] = [];
        let key = {};
        key["kty"] = "EC";
        key["use"] = "sig";
        key["alg"] = "ES256";
        key["x5c"] = []; // TODO: add certificate chain.

//        put("x5c", buildJsonArray {
//            certificateChain.map {
 //               String(
 //                   Base64.getEncoder().encode(it.encoded)
 //               )
 //           }.forEach { add(it) }
  //      })

        certificateChainKeys["keys"].push(key);
        return JsonStringifier.stringify(certificateChainKeys);
    }

    private getDataElementsPerNamespace(cachedData: any): Map<string, any> {
        let result = new Map<string, any>();
        let nameSpacedData = this.getNameSpacedDataByToken(cachedData.serverRetrievalToken);
        //this.cachedData
        const mdocCredentialType = this.credentialTypeRepository.getMdocCredentialType(OidcServer.MDL_DOCTYPE);
        return result;
    }

    private getNameSpacedDataByToken(token: string): any {
        // TODO: for now sample data
        //return SampleDrivingLicense.data
        throw "Not implemented";
    }

    private cacheData(clientId: string, scope: string, authorizationId: string = null, serverRetrievalToken: string = null): void {
        let data: any = {};
        data.clientId = clientId;
        data.scope = scope;
        data.authorizationId = authorizationId;
        data.serverRetrievalToken = serverRetrievalToken;
        let textEncoder = new TextEncoder();
        let buffer = textEncoder.encode(JsonStringifier.stringify(data));
        this.storageEngine.put(clientId, buffer);
    }

    private getCachedData(clientId: string): any {
        const bytes = this.storageEngine.get(clientId);
        if (!bytes) return null;
        const textDecoder = new TextDecoder("utf-8");
        return JsonStringifier.parse(textDecoder.decode(bytes));
    }
}