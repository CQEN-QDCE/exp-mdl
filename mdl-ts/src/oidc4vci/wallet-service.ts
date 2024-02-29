import { AuthenticationRequestParameters } from "../oidc/authentication-request-parameters";
import { OpenIdConstants } from "../oidc/openid-constants";
import { VcDataModelConstants } from "../oidc/vc-data-model-constants";
import { CredentialRepresentation } from "../oidc/vc/credential-representation.enum";
import { AtomicAttribute2023, CredentialScheme } from "../oidc/vc/credential-scheme";
import { AuthorizationDetails } from "./authorization-details";
import { CredentialFormatEnum } from "./credential-format.enum";
import { CredentialRequestParameters } from "./credential-request-parameters";
import { IssuerMetadata } from "./issuer-metadata";
import { TokenRequestParameters } from "./token-request-parameters";
import { TokenResponseParameters } from "./token-response-parameters";

export class WalletService { 

    private readonly credentialScheme: CredentialScheme;

    private readonly credentialRepresentation: CredentialRepresentation;

    private readonly requestedAttributes: string[] | null = null;

    private readonly clientId: string | null = null;

    private readonly redirectUrl: string | null = null;

    // private readonly cryptoService: CryptoService = DefaultCryptoService(),

    // private readonly jwsService: JwsService = DefaultJwsService(cryptoService),


    public createAuthRequest(): AuthenticationRequestParameters {
        const authnRequest = new AuthenticationRequestParameters(
            {
                responseType: OpenIdConstants.GRANT_TYPE_CODE,
                clientId: this.clientId,
                authorizationDetails: new AuthorizationDetails(
                    {
                        type: 'openid_credential',
                        format: CredentialFormatEnum.JWT_VC, // TODO: check if this is correct Maybe MSO_MDOC
                        types: [VcDataModelConstants.VERIFIABLE_CREDENTIAL, new AtomicAttribute2023().vcType]
                    }
                ),
                redirectUrl: this.redirectUrl,
            }
        );
        return authnRequest;
    }

    public createTokenRequestParameters(code: string): TokenRequestParameters {
        const tokenRequest = new TokenRequestParameters(
            {
                grantType: OpenIdConstants.GRANT_TYPE_CODE,
                code: code,
                redirectUrl: this.redirectUrl,
                clientId: this.clientId
            }
        );
        return tokenRequest;
    }

    public createCredentialRequest(tokenResponse: TokenResponseParameters, issuerMetadata: IssuerMetadata): CredentialRequestParameters {
        throw new Error("Not implemented");
    }
}