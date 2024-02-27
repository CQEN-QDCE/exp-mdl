import { JsonStringifier } from "../../utils/json.stringifier";
import { Jwt } from "../Jwt";
import { OidcClient } from "./oidc-client";

export class OidcServerRetrievalProcess {

    constructor(private readonly oidcClient: OidcClient,
                private readonly privateKey: CryptoKey) {

    }

    public async process(serverRetrievalToken: string, docType: string, documentRequest: Map<string, Map<string, boolean>>): Promise<any> {
        
        const configuration = JsonStringifier.parse(await this.oidcClient.configuration());

        const flatten: string[] = [];
        for (const [namespace, dataElements] of documentRequest) {
            for (const [identifier, value] of dataElements) {
                flatten.push(namespace + ":" + identifier);
            }
        }
        const scope = flatten.join(" ");

        const registrationRequest: any = {};
        registrationRequest.redirect_uris = ["http://127.0.0.1:56464/callback"]; // TODO: à changer.
        registrationRequest.scope = scope;

        const registrationResponse = JsonStringifier.parse(await this.oidcClient.clientRegistration(JsonStringifier.stringify(registrationRequest)));

        const thirtyDays = 30 * 24 * 60 * 60;
        const authorizationRequest = new Map<string, string>();
        authorizationRequest.set("client_id", registrationResponse.client_id);
        authorizationRequest.set("scope", registrationResponse.scope);
        authorizationRequest.set("redirect_uri", registrationResponse.redirect_uri);
        authorizationRequest.set("response_type", "code");
        let loginHint = {};
        loginHint["id"] = serverRetrievalToken;
        loginHint["iat"] = (Date.now() / 1000);
        loginHint["exp"] = (Date.now() / 1000) + thirtyDays;
        authorizationRequest.set("login_hint", await Jwt.encode(loginHint, this.privateKey));
    
        const authorizationResponse = JsonStringifier.parse(await this.oidcClient.authorization(authorizationRequest));

        // step 4
        const tokenRequest = new Map<string, string>();
        tokenRequest.set("grant_type", "authorization_code");
        tokenRequest.set("code", authorizationResponse.Query.code);
        tokenRequest.set("redirect_uri", registrationRequest.redirect_uris[0]);
        tokenRequest.set("client_id", registrationResponse.client_id);
        tokenRequest.set("client_secret", registrationResponse.client_secret);
    
        const tokenResponse = JsonStringifier.parse(await this.oidcClient.getIdToken(tokenRequest));

        // step 5
        const validateIdTokenResponse = JsonStringifier.parse(await this.oidcClient.validateIdToken());

        let bla = 1;

        // TODO validate chain (use TrustManager?)
//        val certicateChain =
//            Jwt.parseCertificateChain(
//               validateIdTokenResponse["keys"]?.jsonArray?.first()?.jsonObject?.get(
//                    "x5c"
//                )?.jsonArray?.map { it.jsonPrimitive.content }!!
//            )

//        val certicate = certicateChain.first()

//        val publicKey = certicate.publicKey as ECPublicKey

//    if (!Jwt.verify(tokenResponse["id_token"]?.jsonPrimitive?.content.toString(), publicKey) ||
//        !Jwt.verify(tokenResponse["access_token"]?.jsonPrimitive?.content.toString(), publicKey)
  //  ) {
//        throw Exception("The token response could not be verified")
  //  }
    //return Jwt.decode(tokenResponse["id_token"]?.jsonPrimitive?.content.toString()).payload
    }
}