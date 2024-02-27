import { CredentialOfferFormat, Grant, OpenId4VCIVersion } from "./generic.types";

export interface CredentialOfferV1_0_11 {
    credential_offer?: CredentialOfferPayloadV1_0_11;
    credential_offer_uri?: string;
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

  export interface CredentialOfferV1_0_09 {
    credential_offer: CredentialOfferPayloadV1_0_09;
  }

  export interface AssertedUniformCredentialOffer extends UniformCredentialOffer {
    credential_offer: UniformCredentialOfferPayload;
  }

  export interface UniformCredentialOffer {
    credential_offer?: UniformCredentialOfferPayload;
    credential_offer_uri?: string;
  }
  export type CredentialOfferPayload = CredentialOfferPayloadV1_0_09 | CredentialOfferPayloadV1_0_11;

  export enum AuthzFlowType {
    AUTHORIZATION_CODE_FLOW = 'Authorization Code Flow',
    PRE_AUTHORIZED_CODE_FLOW = 'Pre-Authorized Code Flow',
  }
  export const PRE_AUTH_CODE_LITERAL = 'pre-authorized_code';
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace AuthzFlowType {
    export function valueOf(request: CredentialOfferPayload): AuthzFlowType {
      if (PRE_AUTH_CODE_LITERAL in request) {
        return AuthzFlowType.PRE_AUTHORIZED_CODE_FLOW;
      }
      return AuthzFlowType.AUTHORIZATION_CODE_FLOW;
    }
  }


  export type UniformCredentialOfferPayload = CredentialOfferPayloadV1_0_11;
  export interface UniformCredentialOfferRequest extends AssertedUniformCredentialOffer {
    original_credential_offer: CredentialOfferPayload;
    version: OpenId4VCIVersion;
    supportedFlows: AuthzFlowType[];
  }
  
  export interface CredentialOfferPayloadV1_0_09 {
    /**
     * REQUIRED. The URL of the Credential Issuer, the Wallet is requested to obtain one or more Credentials from.
     */
    issuer: string;
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
    'pre-authorized_code'?: string; //CONDITIONAL the code representing the issuer's authorization for the Wallet to obtain Credentials of a certain type. This code MUST be short-lived and single-use. MUST be present in a pre-authorized code flow.
    user_pin_required?: boolean | string; //OPTIONAL Boolean value specifying whether the issuer expects presentation of a user PIN along with the Token Request in a pre-authorized code flow. Default is false.
    op_state?: string; //(JWT) OPTIONAL String value created by the Credential Issuer and opaque to the Wallet that is used to bind the subsequent authentication request with the Credential Issuer to a context set up during previous steps
  }
export type CredentialOffer = CredentialOfferV1_0_09 | CredentialOfferV1_0_11;

export interface AssertedUniformCredentialOffer extends UniformCredentialOffer {
  credential_offer: UniformCredentialOfferPayload;
}

export interface UniformCredentialOffer {
  credential_offer?: UniformCredentialOfferPayload;
  credential_offer_uri?: string;
}