import { CredentialAttributeType } from "./credential-attribute-type.enum";

export class CredentialAttribute {
    constructor(public readonly type: CredentialAttributeType,
                public readonly identifier: string,
                public readonly displayName: string,
                public readonly description: string) {
    }
}