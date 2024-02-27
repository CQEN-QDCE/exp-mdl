import { CredentialAttribute } from "./credential-attribute";
import { CredentialAttributeType } from "./credential-attribute-type.enum";
import { VcCredentialType } from "./vc-credential-type";

export class VcCredentialTypeBuilder {
    
    constructor(public readonly type: string,
                public readonly claims: Map<string, CredentialAttribute> = new Map<string, CredentialAttribute>()) {
    }

    public addClaim(type: CredentialAttributeType, identifier: string, displayName: string, description: string): VcCredentialTypeBuilder {
        this.claims.set(identifier, new CredentialAttribute(type, identifier, displayName, description));
        return this;
    }

    public build(): VcCredentialType {
        return new VcCredentialType(this.type, this.claims);
    }
}