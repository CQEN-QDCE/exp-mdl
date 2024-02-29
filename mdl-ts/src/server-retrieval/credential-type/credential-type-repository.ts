import { CredentialType } from "./credential-type";
import { MdocCredentialType } from "./mdoc-credential-type";
import { VcCredentialType } from "./vc-credential-type";

export class CredentialTypeRepository {

    private readonly _credentialTypes: CredentialType[] = [];

    public addCredentialType(credentialType: CredentialType) {
        this._credentialTypes.push(credentialType);
    }

    public getCredentialTypes(): CredentialType[] {
        return this._credentialTypes;
    }

    public getMdocCredentialType(docType: string): MdocCredentialType | null {
        const credentialTypes: CredentialType[] = [];
        for (const credentialType of this._credentialTypes) {
            if (credentialType.mdocCredentialType && credentialType.mdocCredentialType.docType === docType) {
                return credentialType.mdocCredentialType;
            }
        }
        return null;
    }

    public getVcCredentialType(docType: string): VcCredentialType | undefined {
        const credentialTypes: CredentialType[] = [];
        for (const credentialType of this._credentialTypes) {
            if (credentialType instanceof MdocCredentialType) {

            }
        }
        return undefined;
    }
}