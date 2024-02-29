import { AuthenticationRequestParameters } from "../oidc/authentication-request-parameters";
import { Iso, IssuedCredential, Issuer, VcJwt, VcSdJwt } from "../oidc/issuer";
import { OpenIdConstants } from "../oidc/openid-constants";
import { VcDataModelConstants } from "../oidc/vc-data-model-constants";
import { CredentialRepresentation } from "../oidc/vc/credential-representation.enum";
import { CredentialScheme, MobileDrivingLicence2023 } from "../oidc/vc/credential-scheme";
import { CodeService } from "./code-service";
import { CredentialFormatEnum } from "./credential-format.enum";
import { AssertedUniformCredentialOffer, CredentialOffer, CredentialOfferPayload, UniformCredentialOfferRequest, UniformCredentialOfferPayload, AuthzFlowType, CredentialOfferPayloadV1_0_09, UniformCredentialOffer } from "./credential-issuance.types";
import { CredentialRequestParameters } from "./credential-request-parameters";
import { CredentialResponseParameters } from "./credential-response-parameters";
import { CredentialDataSupplierInput, CredentialOfferFormat, Grant, JsonLdIssuerCredentialDefinition, CredentialOfferPayloadV1_0_11, CredentialIssuerMetadataOpts, CredentialOfferV1_0_11, OpenId4VCIVersion, CreateCredentialOfferURIResult } from "./generic.types";
import { IssuerMetadata } from "./issuer-metadata";
import { RequestedCredentialClaimSpecification } from "./mdl/requested-credential-claim-specification";
import { MemoryStates } from "./memory-state-manager";
import { NonceService } from "./nonce-service";
import { ProofType } from "./proof-type.enum";
import { CredentialOfferSession, IStateManager, IssueStatus, URIState } from "./state-manager.types";
import { SupportedCredentialFormat } from "./supported-credential-format";
import { TokenRequestParameters } from "./token-request-parameters";
import { TokenResponseParameters } from "./token-response-parameters";
import { TokenService } from "./token-service";
import { v4 as uuidv4 } from 'uuid';

export interface IssuerServiceOptions {
    issuer: Issuer;
    credentialSchemes: CredentialScheme[];
    codeService: CodeService;
    tokenService: TokenService;
    clientNonceService: NonceService;
    authorizationServer: string;
    publicContext: string;
    authorizationEndpointPath: string;
    tokenEndpointPath: string;
    credentialEndpointPath: string;
    display: any[];
}

export class IssuerService {

    public readonly metadata: IssuerMetadata;

    private readonly issuer: Issuer;
    private readonly credentialSchemes: CredentialScheme[] = [];
    private readonly codeService: CodeService = new CodeService();
    private readonly tokenService: TokenService = new TokenService();
    private readonly clientNonceService: NonceService = new NonceService();
    private readonly authorizationServer: string | null = null;
    //private readonly publicContext: string = "https://wallet.a-sit.at";
    private readonly publicContext: string = "http://localhost:5050";
    private readonly authorizationEndpointPath: string = '/authorize';
    private readonly tokenEndpointPath: string = '/token';
    private readonly credentialEndpointPath: string = '/credential';
    private readonly _uris?: IStateManager<URIState>;
    private readonly _credentialOfferSessions: IStateManager<CredentialOfferSession>
    public readonly display: any[] = [];

    constructor(initializer?: Partial<IssuerServiceOptions>) {
        Object.assign(this, initializer);
        this.metadata = new IssuerMetadata(
            {
                issuer: this.publicContext, 
                credentialIssuer: this.publicContext,
                authorizationServer: this.authorizationServer,
                authorizationEndpointUrl: `${this.publicContext}${this.authorizationEndpointPath}`,
                tokenEndpointUrl: `${this.publicContext}${this.tokenEndpointPath}`,
                credentialEndpointUrl: `${this.publicContext}${this.credentialEndpointPath}`,
                supportedCredentialFormat: this.toSupportedCredentialFormat(this.credentialSchemes)
            }
        );
        this._uris = new MemoryStates<URIState>();
        this._credentialOfferSessions = new MemoryStates<CredentialOfferSession>();
    }

    private toSupportedCredentialFormat(credentialSchemes: CredentialScheme[]): SupportedCredentialFormat[] {
        let supportedCredentialFormats: SupportedCredentialFormat[] = [];
        for (let credentialScheme of credentialSchemes) {
            supportedCredentialFormats.push(new SupportedCredentialFormat(
                {
                    format: CredentialFormatEnum.MSO_MDOC,
                    id: credentialScheme.vcType,
                    types: [credentialScheme.vcType],
                    docType: credentialScheme.isoDocType,
                    claims: this.buildIsoClaims(credentialScheme),
                    supportedBindingMethods: [OpenIdConstants.BINDING_METHOD_COSE_KEY],
                    supportedCryptographicSuites: ['ES256']
                }
            ));
            supportedCredentialFormats.push(new SupportedCredentialFormat(
                {
                    format: CredentialFormatEnum.JWT_VC,
                    id: credentialScheme.vcType,
                    types: [VcDataModelConstants.VERIFIABLE_CREDENTIAL, credentialScheme.vcType],
                    supportedBindingMethods: [OpenIdConstants.PREFIX_DID_KEY, OpenIdConstants.URN_TYPE_JWK_THUMBPRINT],
                    supportedCryptographicSuites: ['ES256']
                }
            ));
            supportedCredentialFormats.push(new SupportedCredentialFormat(
                {
                    format: CredentialFormatEnum.JWT_VC_SD,
                    id: credentialScheme.vcType,
                    types: [VcDataModelConstants.VERIFIABLE_CREDENTIAL, credentialScheme.vcType],
                    supportedBindingMethods: [OpenIdConstants.PREFIX_DID_KEY, OpenIdConstants.URN_TYPE_JWK_THUMBPRINT],
                    supportedCryptographicSuites: ['ES256']
                }
            ));
        }
        return supportedCredentialFormats;
    }

    private buildIsoClaims(credentialScheme: CredentialScheme): Map<string, Map<string, RequestedCredentialClaimSpecification>> {
        let result = new Map<string, Map<string, RequestedCredentialClaimSpecification>>();
        let mdl = new MobileDrivingLicence2023();
        let claims = new Map<string, RequestedCredentialClaimSpecification>();
        for (let claimName of mdl.claimNames) {
            claims.set(claimName, new RequestedCredentialClaimSpecification());
        }
        result.set(credentialScheme.isoNamespace, claims);
        return result;
    }

    public async createCredentialOfferURI(opts: {
        grants?: Grant
        credentials?: (CredentialOfferFormat | string)[]
        credentialDefinition?: JsonLdIssuerCredentialDefinition
        credentialOfferUri?: string
        credentialDataSupplierInput?: CredentialDataSupplierInput // Optional storage that can help the credential Data Supplier. For instance to store credential input data during offer creation, if no additional data can be supplied later on
        baseUri?: string
        scheme?: string
        pinLength?: number
        qrCodeOpts?: null
    }): Promise<CreateCredentialOfferURIResult> {
        let preAuthorizedCode: string | undefined = undefined
        let issuerState: string | undefined = undefined
        const { grants, credentials, credentialDefinition } = opts
         if (!grants?.authorization_code && !grants?.['urn:ietf:params:oauth:grant-type:pre-authorized_code']) {
            throw Error(`No grant issuer state or pre-authorized code could be deduced`)
        }
        const credentialOfferPayload: CredentialOfferPayloadV1_0_11 = {
            ...(grants && { grants }),
            ...(credentials && { credentials }),
            ...(credentialDefinition && { credential_definition: credentialDefinition }),
            credential_issuer: this.issuerMetadata2.credentialIssuer,
        } as CredentialOfferPayloadV1_0_11;

        if (grants?.authorization_code) {
            issuerState = grants?.authorization_code.issuer_state
            if (!issuerState) {
              issuerState = uuidv4()
              grants.authorization_code.issuer_state = issuerState
            }
        }
        let userPinRequired: boolean | undefined
        if (grants?.['urn:ietf:params:oauth:grant-type:pre-authorized_code']) {
//            preAuthorizedCode = grants?.['urn:ietf:params:oauth:grant-type:pre-authorized_code']?.['pre-authorized_code']
            preAuthorizedCode = this.codeService.provideCode();
            userPinRequired = grants?.['urn:ietf:params:oauth:grant-type:pre-authorized_code']?.user_pin_required
            if (userPinRequired === undefined) {
              userPinRequired = false
              grants['urn:ietf:params:oauth:grant-type:pre-authorized_code'].user_pin_required = userPinRequired
            }
            if (!preAuthorizedCode) {
              //preAuthorizedCode = uuidv4()
              preAuthorizedCode = this.codeService.provideCode();
              grants['urn:ietf:params:oauth:grant-type:pre-authorized_code']['pre-authorized_code'] = preAuthorizedCode
            }
        }
        const baseUri = opts?.baseUri ?? this.defaultCredentialOfferBaseUri
        const opts2 = {
            credential_endpoint: this.issuerMetadata2.credentialEndpointUrl, // REQUIRED. URL of the Credential Issuer's Credential Endpoint. This URL MUST use the https scheme and MAY contain port, path and query parameter components.
            batch_credential_endpoint: this.issuerMetadata2.batchCredentialEndpointUrl, // OPTIONAL. URL of the Credential Issuer's Batch Credential Endpoint. This URL MUST use the https scheme and MAY contain port, path and query parameter components. If omitted, the Credential Issuer does not support the Batch Credential Endpoint.
            credentials_supported: [], // REQUIRED. A JSON array containing a list of JSON objects, each of them representing metadata about a separate credential type that the Credential Issuer can issue. The JSON objects in the array MUST conform to the structure of the Section 10.2.3.1.
            credential_issuer: this.issuerMetadata2.credentialIssuer, // REQUIRED. The Credential Issuer's identifier.
            authorization_server: this.issuerMetadata2.authorizationServer, // OPTIONAL. Identifier of the OAuth 2.0 Authorization Server (as defined in [RFC8414]) the Credential Issuer relies on for authorization. If this element is omitted, the entity providing the Credential Issuer is also acting as the AS, i.e. the Credential Issuer's identifier is used as the OAuth 2.0 Issuer value to obtain the Authorization Server metadata as per [RFC8414].
            token_endpoint: this.issuerMetadata2.tokenEndpointUrl,
            display: null, //  An array of objects, where each object contains display properties of a Credential Issuer for a certain language. Below is a non-exhaustive list of valid parameters that MAY be included:
            credential_supplier_config: null
        }
        const credentialOfferObject = this.createCredentialOfferObject(opts2, {
            ...opts,
            credentialOffer: credentialOfferPayload,
            baseUri,
            userPinRequired,
            preAuthorizedCode,
            issuerState,
        })

        let userPin: string | undefined
        // todo: Double check this can only happen in pre-auth flow and if so make sure to not do the below when in a state is present (authorized flow)
        if (userPinRequired) {
          const pinLength = opts.pinLength ?? 4
    
          userPin = ('' + Math.round((Math.pow(10, pinLength) - 1) * Math.random())).padStart(pinLength, '0')
          this.assertValidPinNumber(userPin)
        }
        const createdAt = +new Date()
        const lastUpdatedAt = createdAt
        if (opts?.credentialOfferUri) {
          if (!this.uris) {
            throw Error('No URI state manager set, whilst apparently credential offer URIs are being used')
          }
          await this.uris.set(opts.credentialOfferUri, {
            uri: opts.credentialOfferUri,
            createdAt: createdAt,
            preAuthorizedCode,
            issuerState,
          })
        }

        const credentialOffer = await this.toUniformCredentialOfferRequest(
            {
              credential_offer: credentialOfferObject.credential_offer,
              credential_offer_uri: credentialOfferObject.credential_offer_uri,
            } as CredentialOfferV1_0_11,
            {
              version: OpenId4VCIVersion.VER_1_0_11,
              resolve: false, // We are creating the object, so do not resolve
            },
        )

        const status = IssueStatus.OFFER_CREATED
        const session: CredentialOfferSession = {
          preAuthorizedCode,
          issuerState,
          createdAt,
          lastUpdatedAt,
          status,
          ...(userPin && { userPin }),
          ...(opts.credentialDataSupplierInput && { credentialDataSupplierInput: opts.credentialDataSupplierInput }),
          credentialOffer,
        }
    
        if (preAuthorizedCode) {
          await this.credentialOfferSessions.set(preAuthorizedCode, session)
        }
        // todo: check whether we could have the same value for issuer state and pre auth code if both are supported.
        if (issuerState) {
          await this.credentialOfferSessions.set(issuerState, session)
        }
        const uri = this.createCredentialOfferURIFromObject(credentialOffer, { ...opts, baseUri })
        const qrCodeDataUri = uri;
        return {
            session,
            uri,
            qrCodeDataUri,
            userPinRequired: userPinRequired ?? false,
            ...(userPin !== undefined && { userPin, pinLength: userPin?.length ?? 0 }),
          }
    }
    
    private createCredentialOfferURIFromObject(
        credentialOffer: (CredentialOfferV1_0_11 | UniformCredentialOffer) & { scheme?: string; baseUri?: string; grant?: Grant },
        opts?: { scheme?: string; baseUri?: string },
      ) {
        const scheme = opts?.scheme?.replace('://', '') ?? credentialOffer?.scheme?.replace('://', '') ?? 'openid-credential-offer'
        let baseUri = opts?.baseUri ?? credentialOffer?.baseUri ?? ''
        if (baseUri.includes('://')) {
          baseUri = baseUri.split('://')[1]
        }
        if (scheme.startsWith('http') && baseUri === '') {
          throw Error(`Cannot use scheme '${scheme}' without providing a baseUri value`)
        }
        /*
        if (credentialOffer.credential_offer_uri) {
          if (credentialOffer.credential_offer_uri.includes('credential_offer_uri=')) {
            // discard the scheme. Apparently a URI is set and it already contains the actual uri, so assume that takes priority
            return credentialOffer.credential_offer_uri
          }
          return `${scheme}://${baseUri}?credential_offer_uri=${credentialOffer.credential_offer_uri}`
        }
        */
        return `${scheme}://${baseUri}?credential_offer=${encodeURIComponent(JSON.stringify(credentialOffer.credential_offer))}`
      }
      
    public get credentialOfferSessions(): IStateManager<CredentialOfferSession> {
        return this._credentialOfferSessions
    }

    get uris(): IStateManager<URIState> | undefined {
        return this._uris
    }

    private assertValidPinNumber(pin?: string): void {
        if (pin && !/[0-9{,8}]/.test(pin)) {
            throw Error('PIN must consist of maximum 8 numeric characters');
        }
    }


    private async toUniformCredentialOfferRequest(offer: CredentialOffer,
        opts?: {
          resolve?: boolean;
          version?: OpenId4VCIVersion;
        }): Promise<UniformCredentialOfferRequest> {

        const version = opts?.version ?? this.determineSpecVersionFromOffer(offer);
        let originalCredentialOffer = offer.credential_offer;
        let credentialOfferURI: string | undefined;
        if ('credential_offer_uri' in offer && offer?.credential_offer_uri !== undefined) {
            credentialOfferURI = offer.credential_offer_uri;
              if (opts?.resolve || opts?.resolve === undefined) {
                originalCredentialOffer = (await this.resolveCredentialOfferURI(credentialOfferURI)) as CredentialOfferPayloadV1_0_11;
              } else if (!originalCredentialOffer) {
                throw Error(`Credential offer uri (${credentialOfferURI}) found, but resolution was explicitly disabled and credential_offer was supplied`);
              }
            }
            if (!originalCredentialOffer) {
              throw Error('No credential offer available');
            }
            const payload = this.toUniformCredentialOfferPayload(originalCredentialOffer, opts);
            const supportedFlows = this.determineFlowType(payload, version);
            return {
              credential_offer: payload,
              original_credential_offer: originalCredentialOffer,
              ...(credentialOfferURI && { credential_offer_uri: credentialOfferURI }),
              supportedFlows,
              version,
            };
    }

    private toUniformCredentialOfferPayload(
        offer: CredentialOfferPayload,
        opts?: {
          version?: OpenId4VCIVersion;
        },
      ): UniformCredentialOfferPayload {
        const version = opts?.version ?? this.determineSpecVersionFromOffer(offer);
        if (version >= OpenId4VCIVersion.VER_1_0_11) {
          const orig = offer as UniformCredentialOfferPayload;
          return {
            ...orig,
          };
        }
        const grants: Grant = 'grants' in offer ? (offer.grants as Grant) : {};
        let offerPayloadAsV8V9 = offer as CredentialOfferPayloadV1_0_09;
        if (this.isCredentialOfferVersion(offer, OpenId4VCIVersion.VER_1_0_08, OpenId4VCIVersion.VER_1_0_09)) {
          if (offerPayloadAsV8V9.op_state) {
            grants.authorization_code = {
              ...grants.authorization_code,
              issuer_state: offerPayloadAsV8V9.op_state,
            };
          }
          let user_pin_required = false;
          if (typeof offerPayloadAsV8V9.user_pin_required === 'string') {
            user_pin_required = offerPayloadAsV8V9.user_pin_required === 'true' || offerPayloadAsV8V9.user_pin_required === 'yes';
          } else if (offerPayloadAsV8V9.user_pin_required !== undefined) {
            user_pin_required = offerPayloadAsV8V9.user_pin_required;
          }
          if (offerPayloadAsV8V9['pre-authorized_code']) {
            grants['urn:ietf:params:oauth:grant-type:pre-authorized_code'] = {
              'pre-authorized_code': offerPayloadAsV8V9['pre-authorized_code'],
              user_pin_required,
            };
          }
        }
        const issuer = this.getIssuerFromCredentialOfferPayload(offer);
        if (version === OpenId4VCIVersion.VER_1_0_09) {
          offerPayloadAsV8V9 = offer as CredentialOfferPayloadV1_0_09;
          return {
            // credential_definition: getCredentialsSupported(never, offerPayloadAsV8V9.credentials).map(sup => {credentialSubject: sup.credentialSubject})[0],
            credential_issuer: issuer ?? offerPayloadAsV8V9.issuer,
            credentials: offerPayloadAsV8V9.credentials,
            grants,
          };
        }
//        if (version === OpenId4VCIVersion.VER_1_0_08) {
//          offerPayloadAsV8V9 = offer as CredentialOfferPayloadV1_0_08;
//          return {
//            credential_issuer: issuer ?? offerPayloadAsV8V9.issuer,
//            credentials: Array.isArray(offerPayloadAsV8V9.credential_type) ? offerPayloadAsV8V9.credential_type : [offerPayloadAsV8V9.credential_type],
//            grants,
//          } as UniformCredentialOfferPayload;
//        }
        throw Error(`Could not create uniform payload for version ${version}`);
    }

    private getIssuerFromCredentialOfferPayload(request: CredentialOfferPayload): string | undefined {
        if (!request || (!('issuer' in request) && !('credential_issuer' in request))) {
          return undefined;
        }
        return 'issuer' in request ? request.issuer : request['credential_issuer'];
      }

    private isCredentialOfferVersion(offer: CredentialOfferPayload | CredentialOffer, min: OpenId4VCIVersion, max?: OpenId4VCIVersion) {
        if (max && max.valueOf() < min.valueOf()) {
          throw Error(`Cannot have a max ${max.valueOf()} version smaller than the min version ${min.valueOf()}`);
        }
        const version = this.determineSpecVersionFromOffer(offer);
        if (version.valueOf() < min.valueOf()) {
          return false;
        } else if (max && version.valueOf() > max.valueOf()) {
          return false;
        }
        return true;
      }

    private determineFlowType(
        suppliedOffer: AssertedUniformCredentialOffer | UniformCredentialOfferPayload,
        version: OpenId4VCIVersion): AuthzFlowType[] {
            const payload: UniformCredentialOfferPayload = this.getCredentialOfferPayload(suppliedOffer);
            const supportedFlows: AuthzFlowType[] = [];
            if (payload.grants?.authorization_code) {
              supportedFlows.push(AuthzFlowType.AUTHORIZATION_CODE_FLOW);
            }
            if (payload.grants?.['urn:ietf:params:oauth:grant-type:pre-authorized_code']?.['pre-authorized_code']) {
              supportedFlows.push(AuthzFlowType.PRE_AUTHORIZED_CODE_FLOW);
            }
            if (supportedFlows.length === 0 && version < OpenId4VCIVersion.VER_1_0_09) {
              // auth flow without op_state was possible in v08. The only way to know is that the detections would result in finding nothing.
              supportedFlows.push(AuthzFlowType.AUTHORIZATION_CODE_FLOW);
            }
            return supportedFlows;
    }

    private getCredentialOfferPayload(offer: AssertedUniformCredentialOffer | UniformCredentialOfferPayload): UniformCredentialOfferPayload {
        let payload: UniformCredentialOfferPayload;
        if ('credential_offer' in offer && offer['credential_offer']) {
          payload = offer.credential_offer;
        } else {
          payload = offer as UniformCredentialOfferPayload;
        }
        return payload;
    }

    private async resolveCredentialOfferURI(uri?: string): Promise<CredentialOfferPayload | undefined> {
//        if (!uri) {
//            return undefined;
//          }
//          const response = (await getJson(uri)) as OpenIDResponse<UniformCredentialOfferPayload>;
//          if (!response || !response.successBody) {
//            throw Error(`Could not get credential offer from uri: ${uri}: ${JSON.stringify(response?.errorBody)}`);
//          }
//          return response.successBody as UniformCredentialOfferPayload;
        throw new Error('Not implemented');
    }

    private determineSpecVersionFromOffer(offer: CredentialOfferPayload | CredentialOffer): OpenId4VCIVersion { 
        if (this.isCredentialOfferV1_0_11(offer)) {
            return OpenId4VCIVersion.VER_1_0_11;
          } else if (this.isCredentialOfferV1_0_09(offer)) {
            return OpenId4VCIVersion.VER_1_0_09;
          }
          return OpenId4VCIVersion.VER_UNKNOWN;
    }

    private isCredentialOfferV1_0_09(offer: CredentialOfferPayload | CredentialOffer): boolean {
        if (!offer) {
            return false;
          }
          if ('issuer' in offer && 'credentials' in offer) {
            // payload
            return true;
          }
          if ('credential_offer' in offer && offer['credential_offer']) {
            // offer, so check payload
            return this.isCredentialOfferV1_0_09(offer['credential_offer']);
          }
          return false;
      }

    private isCredentialOfferV1_0_11(offer: CredentialOfferPayload | CredentialOffer): boolean {
        if (!offer) {
          return false;
        }
        if ('credential_issuer' in offer && 'credentials' in offer) {
          // payload
          return true;
        }
        if ('credential_offer' in offer && offer['credential_offer']) {
          // offer, so check payload
          return this.isCredentialOfferV1_0_11(offer['credential_offer']);
        }
        return 'credential_offer_uri' in offer;
      }

    private createCredentialOfferObject(  issuerMetadata?: CredentialIssuerMetadataOpts,
        // todo: probably it's wise to create another builder for CredentialOfferPayload that will generate different kinds of CredentialOfferPayload
        opts?: {
          credentialOffer?: CredentialOfferPayloadV1_0_11
          credentialOfferUri?: string
          scheme?: string
          baseUri?: string
          issuerState?: string
          preAuthorizedCode?: string
          userPinRequired?: boolean
        }
        ): CredentialOfferV1_0_11 & { scheme: string; grants: Grant; baseUri: string } {
        
        if (!issuerMetadata && !opts?.credentialOffer && !opts?.credentialOfferUri) {
            throw new Error('You have to provide issuerMetadata or credentialOffer object for creating a deeplink')
        }

        const scheme = opts?.scheme?.replace('://', '') ?? (opts?.baseUri?.includes('://') ? opts.baseUri.split('://')[0] : 'openid-credential-offer')
        let baseUri: string
        if (opts?.baseUri) {
          baseUri = opts.baseUri
        } else if (scheme.startsWith('http')) {
          if (issuerMetadata?.credential_issuer) {
            baseUri = issuerMetadata?.credential_issuer
            if (!baseUri.startsWith(`${scheme}://`)) {
              throw Error(`scheme ${scheme} is different from base uri ${baseUri}`)
            }
          } else {
            throw Error(`A '${scheme}' scheme requires a URI to be present as baseUri`)
          }
        } else {
          baseUri = ''
        }
        baseUri = baseUri.replace(`${scheme}://`, '')

        const credential_offer_uri = opts?.credentialOfferUri ? `${scheme}://${baseUri}?credential_offer_uri=${opts?.credentialOfferUri}` : undefined
        let credential_offer: CredentialOfferPayloadV1_0_11
        if (opts?.credentialOffer) {
          credential_offer = {
            ...opts.credentialOffer,
            credentials: opts.credentialOffer?.credentials //?? issuerMetadata?.credentials_supported,
          }
        } else {
          credential_offer = {
            credential_issuer: issuerMetadata?.credential_issuer,
            credentials: issuerMetadata?.credentials_supported,
          } as CredentialOfferPayloadV1_0_11
        }
        // todo: check payload against issuer metadata. Especially strings in the credentials array: When processing, the Wallet MUST resolve this string value to the respective object.
      
        if (!credential_offer.grants) {
          credential_offer.grants = {}
        }
        if (opts?.preAuthorizedCode) {
            credential_offer.grants['urn:ietf:params:oauth:grant-type:pre-authorized_code'] = {
              'pre-authorized_code': opts.preAuthorizedCode,
              user_pin_required: opts.userPinRequired ? opts.userPinRequired : false,
            }
          } else if (!credential_offer.grants?.authorization_code?.issuer_state) {
            credential_offer.grants = {
              authorization_code: {
                issuer_state: opts?.issuerState ?? uuidv4(),
              },
            }
          }
          return { credential_offer, credential_offer_uri, scheme, baseUri, grants: credential_offer.grants }

    }

    get defaultCredentialOfferBaseUri(): string | undefined {
        return this.publicContext
    }

    public get issuerMetadata2() {
        return this.metadata
    }

    /**
     * Send this result as HTTP Header `Location` in a 302 response to the client.
     * @return URL build from client's `redirect_uri` with a `code` query parameter containing a fresh authorization
     * code from [codeService].
     */
    public authorize(params: AuthenticationRequestParameters): string {
        if (!params.redirectUrl) return null;
        const redirectUrl = new URL(params.redirectUrl);
        redirectUrl.searchParams.append(OpenIdConstants.GRANT_TYPE_CODE, this.codeService.provideCode());
        console.log(redirectUrl.href);
        return redirectUrl.href;
    }

    public token(params: TokenRequestParameters): TokenResponseParameters {
        if (params.grantType !== 'urn:ietf:params:oauth:grant-type:pre-authorized_code') throw 'OAuth2Exception: invalid grant_type';
        if (!this.codeService.verifyCode(params.preAuthorizedCode)) throw 'OAuth2Exception: invalid code';
        return new TokenResponseParameters(
            {
                accessToken: this.tokenService.provideToken(),
                tokenType: OpenIdConstants.TOKEN_TYPE_BEARER,
                expires: 3600,
                clientNonce: this.clientNonceService.provideNonce()
            }
        );
    }

    public credential(authorizationHeader: string, params: CredentialRequestParameters): CredentialResponseParameters {
        
        if (!this.tokenService.verifyToken(authorizationHeader.replace(OpenIdConstants.TOKEN_PREFIX_BEARER, ''))) throw 'OAuth2Exception: invalid token';
        
        const proof = params.proof;
        
        if (!proof) throw 'OAuth2Exception: invalid request';

        if (proof.proofType === ProofType.JWT) {

        }

        if (proof.proofType === ProofType.CWT) {
            
        }

//        const issuedCredentialResult = this.issuer.issueCredential(subjectPublicKey,
//            params.types,
//            this.convertCredentialFormatToRepresentation(params.format),
//            this.convertClaims(params.claims)
//        );
//        if (issuedCredentialResult.successful.length === 0) throw 'OAuth2Exception: invalid request';
//        return this.toCredentialResponseParameters(issuedCredentialResult.successful[0]);
        throw new Error('Not implemented');
    }

    private convertCredentialFormatToRepresentation(format: CredentialFormatEnum): CredentialRepresentation {
        switch (format) {
            case CredentialFormatEnum.JWT_VC_SD:
                return CredentialRepresentation.SD_JWT;
            case CredentialFormatEnum.MSO_MDOC:
                return CredentialRepresentation.ISO_MDOC;
            default:
                return CredentialRepresentation.PLAIN_JWT;
        }
    }

    private convertClaims(claims: Map<string, Map<string, RequestedCredentialClaimSpecification>>): string[] {
        let flattenedClaims: string[] = [];
        for (let [key, value] of claims) {
            for (let [key, value2] of value) {
                flattenedClaims.push(key);
            }
        }
        return flattenedClaims;
    }

    private toCredentialResponseParameters(issuedCredential: IssuedCredential): CredentialResponseParameters {
        if (issuedCredential instanceof VcJwt) {

        }
        if (issuedCredential instanceof VcSdJwt) {

        }
        if (issuedCredential instanceof Iso) {
            return new CredentialResponseParameters(
                {
                    format: CredentialFormatEnum.MSO_MDOC,
                    //credential: issuedCredential. // TODO: implement
                }
            );
        }
        throw new Error('Invalid credential type.');
    }

}