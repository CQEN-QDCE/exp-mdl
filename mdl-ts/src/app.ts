/*
import express, { Application, Request, Response, NextFunction } from "express";
import { router as userRoutes } from "./oidc4vci/oid4vc-routes";
import { IssuerService } from "./oidc4vci/issuer-service";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(userRoutes);

app.use("/.well-known/openid-credential-issuer", (req: Request, res: Response, next: NextFunction): void => {
  let test = new IssuerService();
  let issuerMetaData = test.issuerMetadata2;
  let issuerMetadataJson:any = {};
  issuerMetadataJson.issuer = issuerMetaData.issuer;

  issuerMetadataJson.credential_issuer = issuerMetaData.credentialIssuer;
  issuerMetadataJson.authorization_server = issuerMetaData.authorizationServer;
  issuerMetadataJson.credential_endpoint = issuerMetaData.credentialEndpointUrl;
  issuerMetadataJson.token_endpoint = issuerMetaData.tokenEndpointUrl;
  issuerMetadataJson.jwks_uri = issuerMetaData.jsonWebKeySetUrl;
  issuerMetadataJson.authorization_endpoint = issuerMetaData.authorizationEndpointUrl;
  issuerMetadataJson.batch_credential_endpoint = issuerMetaData.batchCredentialEndpointUrl;
  issuerMetadataJson.display = issuerMetaData.displayProperties;
  issuerMetadataJson.response_types_supported = issuerMetaData.responseTypesSupported;
  issuerMetadataJson.scopes_supported = issuerMetaData.scopesSupported;
  issuerMetadataJson.subject_types_supported = issuerMetaData.subjectTypesSupported;
  issuerMetadataJson.id_token_signing_alg_values_supported = issuerMetaData.idTokenSigningAlgorithmsSupported;
  issuerMetadataJson.request_object_signing_alg_values_supported = issuerMetaData.requestObjectSigningAlgorithmsSupported;
  issuerMetadataJson.subject_syntax_types_supported = issuerMetaData.subjectSyntaxTypesSupported;
  issuerMetadataJson.id_token_types_supported = issuerMetaData.idTokenTypesSupported;
  issuerMetadataJson.presentation_definition_uri_supported = issuerMetaData.presentationDefinitionUriSupported;
  issuerMetadataJson.vp_formats_supported = issuerMetaData.vpFormatsSupported;
  issuerMetadataJson.client_id_schemes_supported = issuerMetaData.clientIdSchemesSupported;

  res.json(issuerMetadataJson);
});

const PORT: Number = 5050;

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
*/