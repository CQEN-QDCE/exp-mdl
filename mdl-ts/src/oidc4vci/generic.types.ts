import { CredentialOfferSession } from "./state-manager.types";

export type OID4VCICredentialFormat = 'jwt_vc_json' | 'jwt_vc_json-ld' | 'ldp_vc' | 'vc+sd-jwt' | 'jwt_vc';

export interface CommonCredentialOfferFormat {
    format: OID4VCICredentialFormat | string;
}

export enum OpenId4VciCredentialFormatProfile {
  JwtVcJson = 'jwt_vc_json',
  JwtVcJsonLd = 'jwt_vc_json-ld',
  LdpVc = 'ldp_vc',
  SdJwtVc = 'vc+sd-jwt',
}

export interface ICredentialContext {
    name?: string
    did?: string
}

export type AdditionalClaims = Record<string, any>

export type CredentialDataSupplierInput = any;

export type ICredentialContextType = (ICredentialContext & AdditionalClaims) | string

export interface NameAndLocale {
    name?: string; // REQUIRED. String value of a display name for the Credential.
    locale?: string; // OPTIONAL. String value that identifies the language of this object represented as a language tag taken from values defined in BCP47 [RFC5646]. Multiple display objects MAY be included for separate languages. There MUST be only one object with the same language identifier.
    [key: string]: unknown;
}

export interface CredentialSubjectDisplay {
    mandatory?: boolean; // OPTIONAL. Boolean which when set to true indicates the claim MUST be present in the issued Credential. If the mandatory property is omitted its default should be assumed to be false.
    value_type?: string; // OPTIONAL. String value determining type of value of the claim. A non-exhaustive list of valid values defined by this specification are string, number, and image media types such as image/jpeg as defined in IANA media type registry for images
    display?: NameAndLocale[]; // OPTIONAL. An array of objects, where each object contains display properties of a certain claim in the Credential for a certain language. Below is a non-exhaustive list of valid parameters that MAY be included:
}

export type IssuerCredentialSubjectDisplay = CredentialSubjectDisplay & { [key: string]: CredentialSubjectDisplay };

export interface IssuerCredentialSubject {
    [key: string]: IssuerCredentialSubjectDisplay;
}

export interface JsonLdIssuerCredentialDefinition {
    '@context': ICredentialContextType[];
    types: string[];
    credentialSubject?: IssuerCredentialSubject;
 }

 export interface CredentialRequestJwtVcJsonLdAndLdpVc extends CommonCredentialRequest {
  format: 'ldp_vc' | 'jwt_vc_json-ld';
  credential_definition: JsonLdIssuerCredentialDefinition;
}

export interface ProofOfPossession {
  proof_type: 'jwt';
  jwt: string;

  [x: string]: unknown;
}

export interface CommonCredentialRequest {
  format: OID4VCICredentialFormat /* | OID4VCICredentialFormat[];*/; // for now it seems only one is supported in the spec
  proof?: ProofOfPossession;
}

export interface CredentialOfferFormatJwtVcJsonLdAndLdpVc extends CommonCredentialOfferFormat {
    format: 'ldp_vc' | 'jwt_vc_json-ld';
    // REQUIRED. JSON object containing (and isolating) the detailed description of the credential type. This object MUST be processed using full JSON-LD processing.
    credential_definition: JsonLdIssuerCredentialDefinition;
}

export interface CredentialOfferFormatJwtVcJson extends CommonCredentialOfferFormat {
    format: 'jwt_vc_json' | 'jwt_vc'; // jwt_vc is added for backwards compat
    types: string[]; // REQUIRED. JSON array as defined in Appendix E.1.1.2. This claim contains the type values the Wallet shall request in the subsequent Credential Request.
}

export interface CredentialOfferFormatSdJwtVc extends CommonCredentialOfferFormat {
    format: string;
  
    vct: string;
    claims?: IssuerCredentialSubject;
}

export type CredentialOfferFormat = CommonCredentialOfferFormat &
  (CredentialOfferFormatJwtVcJsonLdAndLdpVc | CredentialOfferFormatJwtVcJson | CredentialOfferFormatSdJwtVc);

export interface Grant {
    authorization_code?: GrantAuthorizationCode;
    'urn:ietf:params:oauth:grant-type:pre-authorized_code'?: GrantUrnIetf;
}
export interface GrantAuthorizationCode {
    /**
     * OPTIONAL. String value created by the Credential Issuer and opaque to the Wallet that is used to bind the subsequent
     * Authorization Request with the Credential Issuer to a context set up during previous steps.
     */
    issuer_state?: string;
}
export interface GrantUrnIetf {
    /**
     * REQUIRED. The code representing the Credential Issuer's authorization for the Wallet to obtain Credentials of a certain type.
     */
    'pre-authorized_code': string;
    /**
     * OPTIONAL. Boolean value specifying whether the Credential Issuer expects presentation of a user PIN along with the Token Request
     * in a Pre-Authorized Code Flow. Default is false.
     */
    user_pin_required: boolean;
}

export interface ImageInfo {
    url?: string;
    alt_text?: string;
  
    [key: string]: unknown;
}

export interface LogoAndColor {
    logo?: ImageInfo; // OPTIONAL. A JSON object with information about the logo of the Credential with a following non-exhaustive list of parameters that MAY be included:
    description?: string; // OPTIONAL. String value of a description of the Credential.
    background_color?: string; //OPTIONAL. String value of a background color of the Credential represented as numerical color values defined in CSS Color Module Level 37 [CSS-Color].
    text_color?: string; // OPTIONAL. String value of a text color of the Credential represented as numerical color values defined in CSS Color Module Level 37 [CSS-Color].
}

export type CredentialsSupportedDisplay = NameAndLocale &
  LogoAndColor & {
    name: string; // REQUIRED. String value of a display name for the Credential.
    background_image?: ImageInfo; //OPTIONAL, NON-SPEC compliant!. URL of a background image useful for card views of credentials. Expected to an image that fills the full card-view of a wallet
};

export interface CredentialSupportedBrief {
    cryptographic_binding_methods_supported?: string[]; // OPTIONAL. Array of case sensitive strings that identify how the Credential is bound to the identifier of the End-User who possesses the Credential
    cryptographic_suites_supported?: string[]; // OPTIONAL. Array of case sensitive strings that identify the cryptographic suites that are supported for the cryptographic_binding_methods_supported
}

export type CommonCredentialSupported = CredentialSupportedBrief & {
    format: OID4VCICredentialFormat | string; //REQUIRED. A JSON string identifying the format of this credential, e.g. jwt_vc_json or ldp_vc.
    id?: string; // OPTIONAL. A JSON string identifying the respective object. The value MUST be unique across all credentials_supported entries in the Credential Issuer Metadata
    display?: CredentialsSupportedDisplay[]; // OPTIONAL. An array of objects, where each object contains the display properties of the supported credential for a certain language
    /**
     * following properties are non-mso_mdoc specific and we might wanna rethink them when we're going to support mso_mdoc
     */
  };

  export interface CredentialSupportedJwtVcJson extends CommonCredentialSupported {
    types: string[]; // REQUIRED. JSON array designating the types a certain credential type supports
    credentialSubject?: IssuerCredentialSubject; // OPTIONAL. A JSON object containing a list of key value pairs, where the key identifies the claim offered in the Credential. The value MAY be a dictionary, which allows to represent the full (potentially deeply nested) structure of the verifiable credential to be issued.
    order?: string[]; //An array of claims.display.name values that lists them in the order they should be displayed by the Wallet.
    format: 'jwt_vc_json' | 'jwt_vc'; // jwt_vc added for backwards compat
  }
  
  export interface CredentialSupportedSdJwtVc extends CommonCredentialSupported {
    format: 'vc+sd-jwt';
  
    vct: string;
    claims?: IssuerCredentialSubject;
  
    order?: string[]; //An array of claims.display.name values that lists them in the order they should be displayed by the Wallet.
  }
  export interface CredentialSupportedJwtVcJsonLdAndLdpVc extends CommonCredentialSupported {
    types: string[]; // REQUIRED. JSON array designating the types a certain credential type supports
    '@context': ICredentialContextType[]; // REQUIRED. JSON array as defined in [VC_DATA], Section 4.1.
    credentialSubject?: IssuerCredentialSubject; // OPTIONAL. A JSON object containing a list of key value pairs, where the key identifies the claim offered in the Credential. The value MAY be a dictionary, which allows to represent the full (potentially deeply nested) structure of the verifiable credential to be issued.
    order?: string[]; //An array of claims.display.name values that lists them in the order they should be displayed by the Wallet.
    format: 'ldp_vc' | 'jwt_vc_json-ld';
  }  
export type CredentialSupported = CommonCredentialSupported &
  (CredentialSupportedJwtVcJson | CredentialSupportedJwtVcJsonLdAndLdpVc | CredentialSupportedSdJwtVc);

  export type MetadataDisplay = NameAndLocale &
  LogoAndColor & {
    name?: string; //OPTIONAL. String value of a display name for the Credential Issuer.
  };
  export interface CredentialSupplierConfig {
    [key: string]: any; // This allows additional properties for credential suppliers
  }
export interface CredentialIssuerMetadataOpts {
    credential_endpoint?: string; // REQUIRED. URL of the Credential Issuer's Credential Endpoint. This URL MUST use the https scheme and MAY contain port, path and query parameter components.
    batch_credential_endpoint?: string; // OPTIONAL. URL of the Credential Issuer's Batch Credential Endpoint. This URL MUST use the https scheme and MAY contain port, path and query parameter components. If omitted, the Credential Issuer does not support the Batch Credential Endpoint.
    credentials_supported: CredentialSupported[]; // REQUIRED. A JSON array containing a list of JSON objects, each of them representing metadata about a separate credential type that the Credential Issuer can issue. The JSON objects in the array MUST conform to the structure of the Section 10.2.3.1.
    credential_issuer: string; // REQUIRED. The Credential Issuer's identifier.
    authorization_server?: string; // OPTIONAL. Identifier of the OAuth 2.0 Authorization Server (as defined in [RFC8414]) the Credential Issuer relies on for authorization. If this element is omitted, the entity providing the Credential Issuer is also acting as the AS, i.e. the Credential Issuer's identifier is used as the OAuth 2.0 Issuer value to obtain the Authorization Server metadata as per [RFC8414].
    token_endpoint?: string;
    display?: MetadataDisplay[]; //  An array of objects, where each object contains display properties of a Credential Issuer for a certain language. Below is a non-exhaustive list of valid parameters that MAY be included:
    credential_supplier_config?: CredentialSupplierConfig;
}

export type CreateCredentialOfferURIResult = {
    uri: string;
    qrCodeDataUri?: string;
    session: CredentialOfferSession;
    userPin?: string;
    userPinLength?: number;
    userPinRequired: boolean;
  };

export interface CredentialOfferV1_0_11 {
    credential_offer?: CredentialOfferPayloadV1_0_11;
    credential_offer_uri?: string;
}

export enum OpenId4VCIVersion {
    VER_1_0_08 = 1008,
    VER_1_0_09 = 1009,
    VER_1_0_11 = 1011,
    VER_UNKNOWN = Number.MIN_VALUE,
  }

export interface CredentialOfferPayloadV1_0_11 {
    /**
     * REQUIRED. The URL of the Credential Issuer, the Wallet is requested to obtain one or more Credentials from.
     */
    credential_issuer: string;
  
    /**
     * REQUIRED. A JSON array, where every entry is a JSON object or a JSON string. If the entry is an object,
     * the object contains the data related to a certain credential type the Wallet MAY request.
     * Each object MUST contain a format Claim determining the format of the credential to be requested and
     * further parameters characterising the type of the credential to be requested as defined in Appendix E.
     * If the entry is a string, the string value MUST be one of the id values in one of the objects in the
     * credentials_supported Credential Issuer metadata parameter.
     * When processing, the Wallet MUST resolve this string value to the respective object.
     */
    credentials: (CredentialOfferFormat | string)[];
    /**
     * OPTIONAL. A JSON object indicating to the Wallet the Grant Types the Credential Issuer's AS is prepared
     * to process for this credential offer. Every grant is represented by a key and an object.
     * The key value is the Grant Type identifier, the object MAY contain parameters either determining the way
     * the Wallet MUST use the particular grant and/or parameters the Wallet MUST send with the respective request(s).
     * If grants is not present or empty, the Wallet MUST determine the Grant Types the Credential Issuer's AS supports
     * using the respective metadata. When multiple grants are present, it's at the Wallet's discretion which one to use.
     */
    grants?: Grant;
  }