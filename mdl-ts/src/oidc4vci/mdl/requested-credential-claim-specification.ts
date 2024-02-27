import { ClaimDisplayProperties } from "./claim-display-properties";

export class RequestedCredentialClaimSpecification {
    
    // @SerialName("mandatory")
    public readonly mandatory: boolean | null = null;
    
    // @SerialName("value_type")
    public readonly valueType: string | null = null;
    
    // @SerialName("display")
    public readonly display: ClaimDisplayProperties | null = null;

    constructor(initializer?: Partial<RequestedCredentialClaimSpecification>) {
        Object.assign(this, initializer);
    }
}