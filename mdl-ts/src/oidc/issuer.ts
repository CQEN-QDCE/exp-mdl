import { CredentialRepresentation } from "./vc/credential-representation.enum";
import { CredentialScheme } from "./vc/credential-scheme";

export interface Issuer {
    
    get identifier(): string;

    issueCredential(subjectPublicKey: CryptoKey, attributeTypes: string[], representation: CredentialRepresentation, claimNames: string[]): IssuedCredentialResult;

    issueRevocationListCredential(timePeriod: number): string;

    buildRevocationList(timePeriod: number): string;

    revokeCredentials(credentialsToRevoke: string[]): boolean;

    revokeCredentialsWithId(credentialIdsToRevoke: Map<string,Date>): boolean;

    compileCurrentRevocationLists(): string[];
}

export class FailedAttribute {
    constructor(public readonly attributeType: string, 
                public readonly reason: string) {}
}

export abstract class IssuedCredential {

}

export class VcJwt extends IssuedCredential {
    constructor(public readonly vcJws: string, 
                public readonly scheme: CredentialScheme,
                public readonly attachments: Attachment[] = null) {
        super();
    }
}

export class VcSdJwt extends IssuedCredential {
    constructor(public readonly vcSdJwt: string, 
                public readonly scheme: CredentialScheme) {
        super();
    }
}

export class Iso extends IssuedCredential {

}

export class IssuedCredentialResult {
    constructor(public readonly successful: IssuedCredential[] = [], 
                public readonly failed: FailedAttribute[] = []) {}

    public toStoreCredentialInput(): void {
        throw new Error("Method not implemented.");
    }
}

export class Attachment {
    constructor(public readonly name: string, 
                public readonly mediaType: string,
                public readonly data: ArrayBuffer) {}
}