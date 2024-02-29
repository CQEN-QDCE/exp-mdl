import { Router, Request, Response } from "express";
import { IssuerService } from "./issuer-service";
import { TokenRequestParameters } from "./token-request-parameters";
import { Grant } from "./generic.types";
import { OpenId4VciAuthorizationCodeFlowConfig, OpenId4VciPreAuthorizedCodeFlowConfig } from "./vc-issuer-service-options";
import { NonceService } from "./nonce-service";
import { CredentialRequestParameters } from "./credential-request-parameters";

const router = Router();

router.get("/credential-offer-uri", async (req: Request, res: Response): Promise<void> => {
  const issuerService = new IssuerService();
  const nonceService = new NonceService();
  let preAuthorizedCodeFlowConfig: OpenId4VciPreAuthorizedCodeFlowConfig;

  let authorizationCodeFlowConfig: OpenId4VciAuthorizationCodeFlowConfig;
  let grants: Grant;
  preAuthorizedCodeFlowConfig = {preAuthorizedCode: '1234567890', userPinRequired: false};
  grants = {
    'urn:ietf:params:oauth:grant-type:pre-authorized_code': preAuthorizedCodeFlowConfig && {
      'pre-authorized_code':
        preAuthorizedCodeFlowConfig.preAuthorizedCode ?? (nonceService.provideNonce()),
      user_pin_required: preAuthorizedCodeFlowConfig.userPinRequired ?? false,
    },

    authorization_code: authorizationCodeFlowConfig && {
      issuer_state: authorizationCodeFlowConfig.issuerState ?? (nonceService.provideNonce()),
    },
  }
  const baseCredentialRequestOptions = {
    scheme: 'openid-credential-offer',
    baseUri: 'openid4vc-issuer.com',
  }
  const hostedCredentialOfferUri = 'https://openid4vc-issuer.com/credential-offer-uri'
  const universityDegreeCredentialSdJwt = {
    //       id: 'https://openid4vc-issuer.com/credentials/UniversityDegreeCredentialSdJwt',
            //format: OpenId4VciCredentialFormatProfile.SdJwtVc,
            format: 'vc+sd-jwt',
            vct: 'UniversityDegreeCredential',
            claims: null
          };
  const { uri, session } = await issuerService.createCredentialOfferURI({
      grants: grants,
      credentials: [universityDegreeCredentialSdJwt],
      credentialOfferUri: hostedCredentialOfferUri,
      scheme: baseCredentialRequestOptions.scheme ?? 'https',
      baseUri: baseCredentialRequestOptions.baseUri,
    });
  res.status(200).send(uri);
});

router.post("/token", (req: Request, res: Response): void => {
  let test = req.body;
  let issuerService = new IssuerService();
  let params = new TokenRequestParameters(
    {
      grantType: test.grant_type,
      preAuthorizedCode: test.pre_authorized_code
    });
  let bla = issuerService.token(params);

  let tokenResponse:any = {};
  tokenResponse.access_token = bla.accessToken;
  tokenResponse.refresh_token = bla.refreshToken;
  tokenResponse.token_type = bla.tokenType;
  tokenResponse.expires_in = bla.expires;
  tokenResponse.scope = bla.scope;
  tokenResponse.c_nonce = bla.clientNonce;
  tokenResponse.c_nonce_expires_in = bla.clientNonceExpiresIn;
  tokenResponse.authorization_pending = bla.authorizationPending;
  tokenResponse.interval = bla.interval;

  res.status(200).send(tokenResponse);
});

router.post("/credential", (req: Request, res: Response): void => {
  let test = req.body;
  let authorization = req.headers['authorization'];
//  if (authorization.startsWith('Bearer ')) {
//    authorization = authorization.slice(7, authorization.length).trim();
//  }
  let issuerService = new IssuerService();
//  let params = new CredentialRequestParameters(
//    {
//
//    });
  let bla = issuerService.credential(authorization, null);
});

export { router };