import { IdTokenType } from "../oidc/id-token-type.enum";
import { DisplayProperties } from "./display-properties";
import { SupportedCredentialFormat } from "./supported-credential-format";
import { VpFormatsSupported } from "./vp-formats-supported";

export class IssuerMetadata {
    // @SerialName("issuer")
    public readonly issuer: string;
    public readonly credentialIssuer: string | null = null; // @SerialName("credential_issuer")
    public readonly authorizationServer: string | null = null; // @SerialName("authorization_server")
    public readonly credentialEndpointUrl: string | null = null; // @SerialName("credential_endpoint")
    public readonly tokenEndpointUrl: string | null = null; // @SerialName("token_endpoint")
    public readonly jsonWebKeySetUrl: string | null = null; // @SerialName("jwks_uri")
    public readonly authorizationEndpointUrl: string; // @SerialName("authorization_endpoint")
    public readonly batchCredentialEndpointUrl: string; // @SerialName("batch_credential_endpoint")
    public readonly supportedCredentialFormat: SupportedCredentialFormat[]; // @SerialName("credentials_supported")
    public readonly displayProperties: DisplayProperties[] = []; // @SerialName("display")
    public readonly responseTypesSupported: string[] = []; // @SerialName("response_types_supported")
    public readonly scopesSupported: string[] = []; // @SerialName("scopes_supported")
    public readonly subjectTypesSupported: string[] = []; // @SerialName("subject_types_supported")
    public readonly idTokenSigningAlgorithmsSupported: string[] = []; // @SerialName("id_token_signing_alg_values_supported")
    public readonly requestObjectSigningAlgorithmsSupported: string[] = []; // @SerialName("request_object_signing_alg_values_supported")
    public readonly subjectSyntaxTypesSupported: string[] = []; // @SerialName("subject_syntax_types_supported")
    public readonly idTokenTypesSupported: IdTokenType[] = []; // @SerialName("id_token_types_supported")
    public readonly presentationDefinitionUriSupported: boolean = true; // @SerialName("presentation_definition_uri_supported")
    public readonly vpFormatsSupported: VpFormatsSupported; // @SerialName("vp_formats_supported")
    public readonly clientIdSchemesSupported: string[] = []; // @SerialName("client_id_schemes_supported")
    public readonly display: string;
 
    constructor(initializer?: Partial<IssuerMetadata>) {
        Object.assign(this, initializer);
    }
}