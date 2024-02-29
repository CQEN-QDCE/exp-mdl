import { AuthorizationDetails } from "../oidc4vci/authorization-details";
import { AuthnRequestClaims } from "./authn-request-claims";
import { RelyingPartyMetadata } from "./relying-party-metadata";

export class AuthenticationRequestParameters {
 
        // @SerialName("response_type")
        public readonly responseType: string | null = null;
 
        // @SerialName("client_id")
        public readonly clientId: string;
 
        // @SerialName("redirect_uri")
        public readonly redirectUrl: string | null = null;

        // @SerialName("scope")
        public readonly scope: string | null = null;

        // @SerialName("state")
        public readonly state: string | null = null;

        // @SerialName("nonce")
        public readonly nonce: string | null = null;

        // @SerialName("claims")
        public readonly claims: AuthnRequestClaims | null = null;

        // @SerialName("client_metadata")
        public readonly clientMetadata: RelyingPartyMetadata | null = null;

        // @SerialName("client_metadata_uri")
        public readonly clientMetadataUri: string | null = null;

        // @SerialName("id_token_hint")
        public readonly idTokenHint: string | null = null;

       // @SerialName("request")
        public readonly request: string | null = null;

       // @SerialName("request_uri")
       public readonly requestUri: string | null = null;


       // @SerialName("id_token_type")
       public readonly idTokenType: string | null = null;

        // @SerialName("presentation_definition")
        public readonly presentationDefinition: string | null = null;

        // @SerialName("authorization_details")
        public readonly authorizationDetails: AuthorizationDetails | null = null;

        // @SerialName("client_id_scheme")
        public readonly clientIdScheme: string | null = null;

        // @SerialName("wallet_issuer")
        public readonly walletIssuer: string | null = null;

        // @SerialName("user_hint")
        public readonly userHint: string | null = null;

        // @SerialName("issuer_state")
        public readonly issuerState: string | null = null;

        // @SerialName("response_mode")
        public readonly responseMode: string | null = null;

       // @SerialName("response_uri")
       public readonly responseUrl: string | null = null;
       
       // @SerialName("aud")
        public readonly audience: string | null = null;

        // @SerialName("iss"")
        public readonly issuer: string | null = null;

        constructor(initializer?: Partial<AuthenticationRequestParameters>) {
            Object.assign(this, initializer);
        }
}