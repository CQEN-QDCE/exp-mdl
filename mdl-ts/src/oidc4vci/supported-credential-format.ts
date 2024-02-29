import { CredentialFormatEnum } from "./credential-format.enum";
import { CredentialSubjectMetadataSingle } from "./credential-subject-metadata-single";
import { RequestedCredentialClaimSpecification } from "./mdl/requested-credential-claim-specification";

export class SupportedCredentialFormat {
    
    // @SerialName("format")
    public readonly format: CredentialFormatEnum;
    
    // @SerialName("id")
    public readonly id: string | null = null;
    
    // @SerialName("types")
    public readonly types: string[] = [];
    
    // @SerialName("credentialSubject")
    public readonly credentialSubject: Map<string, CredentialSubjectMetadataSingle> | null = null;
    
    // @SerialName("docType")
    public readonly docType: string | null = null;
    
    // @SerialName("claims")
    public readonly claims: Map<string, Map<string, RequestedCredentialClaimSpecification>> | null = null;
    
    // @SerialName("order")
    public readonly order: string[] | null = null;
    
    // @SerialName("cryptographic_binding_methods_supported")
    public readonly supportedBindingMethods: string[] = [];
    
    // @SerialName("cryptographic_suites_supported")
    public readonly supportedCryptographicSuites: string[] = [];
    
    // @SerialName("display")
    public readonly display: any[] | null = null; // TODO: Fix type (any).

    constructor(initializer?: Partial<SupportedCredentialFormat>) {
        Object.assign(this, initializer);
    }
}