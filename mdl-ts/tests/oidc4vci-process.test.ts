import { AuthenticationRequestParameters } from "../src/oidc/authentication-request-parameters";
import { OpenIdConstants } from "../src/oidc/openid-constants";
import { VcDataModelConstants } from "../src/oidc/vc-data-model-constants";
import { AtomicAttribute2023, MobileDrivingLicence2023 } from "../src/oidc/vc/credential-scheme";
import { AuthorizationDetails } from "../src/oidc4vci/authorization-details";
import { CredentialFormatEnum } from "../src/oidc4vci/credential-format.enum";
import { IssuerService } from "../src/oidc4vci/issuer-service";
import { TokenRequestParameters } from "../src/oidc4vci/token-request-parameters";

describe('testing OIDC4VCI process', () => {

    test('Process with ISO mobile driving licence', async () => {
//        let issuer = IssuerAgent.newDefaultInstance(
//            cryptoService = DefaultCryptoService(),
//            dataProvider = dataProvider
//        );
        const issuerService = new IssuerService(
            {
                issuer: null,
                credentialSchemes: [new AtomicAttribute2023(), new MobileDrivingLicence2023()]
            }
        );
        
        let metadata = issuerService.metadata;
        let authnRequest = new AuthenticationRequestParameters(
            {
                responseType: OpenIdConstants.GRANT_TYPE_CODE,
                clientId: 'https://wallet.a-sit.at/app',
                authorizationDetails: new AuthorizationDetails(
                    {
                        type: 'openid_credential',
                        format: CredentialFormatEnum.JWT_VC, // TODO: check if this is correct Maybe MSO_MDOC
                        types: [VcDataModelConstants.VERIFIABLE_CREDENTIAL, new AtomicAttribute2023().vcType]
                    }
                ),
                redirectUrl: 'https://wallet.a-sit.at/app/callback',
            }
        );

        let codeUrl = issuerService.authorize(authnRequest);
        let codeUrl2 = new URL(codeUrl);
        let code = codeUrl2.searchParams.get('code');
        let tokenRequest = new TokenRequestParameters(
            {
                grantType: OpenIdConstants.GRANT_TYPE_CODE,
                code: code,
                redirectUrl: 'https://wallet.a-sit.at/app/callback',
                clientId: 'https://wallet.a-sit.at/app'
            }
        );

        let token = issuerService.token(tokenRequest);

        //issuerService.credential(
        let bla = 1;
    });
});