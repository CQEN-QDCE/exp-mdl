import { MdocCredentialType } from "./mdoc-credential-type";
import { VcCredentialType } from "./vc-credential-type";

export class CredentialType {
    
    private readonly credentialTypes: CredentialType[] = [];

    constructor(private readonly displayName: string,
                public readonly mdocCredentialType: MdocCredentialType,
                public readonly vcCredentialType: VcCredentialType) {
    }
}