import { CredentialAttribute } from "./credential-attribute";
import { CredentialAttributeType } from "./credential-attribute-type.enum";
import { MdocDataElement } from "./mdoc-data-element";
import { MdocNamespace } from "./mdoc-namespace";

export class MdocNamespaceBuilder {
    
    constructor(public readonly namespace: string,
                public readonly dataElements: Map<string, MdocDataElement> = new Map<string, MdocDataElement>()) {
    }

    public addDataElement(type: CredentialAttributeType, identifier: string, displayName: string, description: string, mandatory: boolean): MdocNamespaceBuilder {
        this.dataElements.set(identifier, new MdocDataElement(new CredentialAttribute(type, identifier, displayName, description),mandatory));
        return this;
    }

    public build(): MdocNamespace {
        return new MdocNamespace(this.namespace, this.dataElements);
    }
}