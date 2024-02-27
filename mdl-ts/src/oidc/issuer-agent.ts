import { IssuedCredentialResult, Issuer } from "./issuer";
import { CredentialRepresentation } from "./vc/credential-representation.enum";

export class IssuerAgent implements Issuer {

    get identifier(): string {
        throw new Error("Method not implemented.");
    }

    issueCredential(subjectPublicKey: CryptoKey, attributeTypes: string[], representation: CredentialRepresentation, claimNames: string[]): IssuedCredentialResult {
        throw new Error("Method not implemented.");
    }

    issueRevocationListCredential(timePeriod: number): string {
        throw new Error("Method not implemented.");
    }

    buildRevocationList(timePeriod: number): string {
        throw new Error("Method not implemented.");
    }

    revokeCredentials(credentialsToRevoke: string[]): boolean {
        throw new Error("Method not implemented.");
    }

    revokeCredentialsWithId(credentialIdsToRevoke: Map<string, Date>): boolean {
        throw new Error("Method not implemented.");
    }
    
    compileCurrentRevocationLists(): string[] {
        throw new Error("Method not implemented.");
    }

    public static newDefaultInstance(cryptoService: any, dataProvider: any): IssuerAgent {
        throw new Error("Method not implemented.");
    }

}