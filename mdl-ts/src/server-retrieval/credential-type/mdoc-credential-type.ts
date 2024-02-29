import { MdocNamespace } from "./mdoc-namespace";

export class MdocCredentialType {
    constructor(public readonly docType: string,
                public readonly namespaces: Map<string, MdocNamespace>) {

    }
}