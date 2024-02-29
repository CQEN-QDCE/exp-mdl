import { CredentialAttributeType } from "./credential-attribute-type.enum";
import { CredentialType } from "./credential-type";
import { MdocCredentialTypeBuilder } from "./mdoc-credential-type-builder";
import { VcCredentialTypeBuilder } from "./vc-credential-type-builder";

export class CredentialTypeBuilder {
    
    constructor(public readonly displayName: string,
                public mdocBuilder: MdocCredentialTypeBuilder = null,
                public vcBuilder: VcCredentialTypeBuilder = null) {
    }

    public addMdocCredentialType(mdocDocType: string): CredentialTypeBuilder {
        this.mdocBuilder = new MdocCredentialTypeBuilder(mdocDocType);
        return this;
    }

    public addVcCredentialType(vcType: string): CredentialTypeBuilder {
        this.vcBuilder = new VcCredentialTypeBuilder(vcType);
        return this;
    }

    public addAttribute(type: CredentialAttributeType, identifier: string, displayName: string, description: string, mandatory: boolean, mdocNamespace: string): CredentialTypeBuilder {
        this.addMdocAttribute(type, identifier, displayName, description, mandatory, mdocNamespace);
        this.addVcAttribute(type, identifier, displayName, description);
        return this;
    }

    public addAttributeDiff(type: CredentialAttributeType, mdocIdentifier: string, vcIdentifier: string, displayName: string, description: string, mandatory: boolean, mdocNamespace: string): CredentialTypeBuilder {
        this.addMdocAttribute(type, mdocIdentifier, displayName, description, mandatory, mdocNamespace);
        this.addVcAttribute(type, vcIdentifier, displayName, description);
        return this;
    }

    public addMdocAttribute(type: CredentialAttributeType, identifier: string, displayName: string, description: string, mandatory: boolean, mdocNamespace: string): CredentialTypeBuilder {
        if (!this.mdocBuilder) throw "The mDoc Credential Type was not initialized";
        this.mdocBuilder?.addDataElement(mdocNamespace, type, identifier, displayName, description, mandatory);
        return this;
    }

    public addVcAttribute(type: CredentialAttributeType, identifier: string, displayName: string, description: string): CredentialTypeBuilder {
        if (!this.vcBuilder) throw "The mDoc Credential Type was not initialized";
        this.vcBuilder.addClaim(type, identifier, displayName, description);
        return this;
    }

    public build(): CredentialType {
        return new CredentialType(this.displayName, this.mdocBuilder?.build(), this.vcBuilder?.build());
    }
}