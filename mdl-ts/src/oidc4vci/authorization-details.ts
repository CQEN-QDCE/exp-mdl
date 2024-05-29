import { CredentialFormatEnum } from "./credential-format.enum";
import { RequestedCredentialClaimSpecification } from "./mdl/requested-credential-claim-specification";

export class AuthorizationDetails {
    
    // @SerialName("type")
    public readonly type: string;

    // @SerialName("format")
    public readonly format: CredentialFormatEnum;

    // @SerialName("doctype")
    public readonly docType: string | null = null;

    // @SerialName("claims")
    public readonly claims: Map<string, Map<string, RequestedCredentialClaimSpecification>> | null = null;

    // @SerialName("types")
    public readonly types: string[];

    // @SerialName("locations")
    public readonly locations: string[] | null = null;

    constructor(initializer?: Partial<AuthorizationDetails>) {
        Object.assign(this, initializer);
    }
}