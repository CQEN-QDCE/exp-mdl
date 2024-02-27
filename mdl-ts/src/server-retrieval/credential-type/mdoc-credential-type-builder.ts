import { CredentialAttributeType } from "./credential-attribute-type.enum";
import { MdocCredentialType } from "./mdoc-credential-type";
import { MdocNamespace } from "./mdoc-namespace";
import { MdocNamespaceBuilder } from "./mdoc-namespace-builder";

export class MdocCredentialTypeBuilder {
    
    constructor(public readonly docType: string,
                public readonly namespaces: Map<string, MdocNamespaceBuilder> = new Map<string, MdocNamespaceBuilder>()) {
    }

    public addDataElement(namespace: string, type: CredentialAttributeType, identifier: string, displayName: string, description: string, mandatory: boolean): MdocCredentialTypeBuilder {
        if (!this.namespaces.has(namespace)) {
            this.namespaces.set(namespace, new MdocNamespaceBuilder(namespace));
        }
        this.namespaces.get(namespace).addDataElement(
            type,
            identifier,
            displayName,
            description,
            mandatory
        )
        return this;
    }

    public build(): MdocCredentialType {
        const namespaces = new Map<string, MdocNamespace>();
        for (const [namespace, dataElements] of this.namespaces) {
            namespaces.set(namespace, dataElements.build());
        }
        return new MdocCredentialType(this.docType, namespaces);
    }
}