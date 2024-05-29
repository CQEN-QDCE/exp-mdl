import { CredentialAttribute } from "./credential-attribute";

export class VcCredentialType {
    constructor(private readonly type: string,
                private readonly claims: Map<string, CredentialAttribute>) {

    }
}