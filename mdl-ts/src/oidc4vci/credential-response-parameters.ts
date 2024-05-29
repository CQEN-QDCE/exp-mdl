import { CredentialFormatEnum } from "./credential-format.enum";

export class CredentialResponseParameters {

    // @SerialName("format")
    public readonly format: CredentialFormatEnum;

    // @SerialName("credential")
    public readonly credential: string | null = null;

     // @SerialName("acceptance_token")
    public readonly acceptanceToken: string | null = null;

    // @SerialName("c_nonce")
    public readonly clientNonce: string | null = null;

    // @SerialName("c_nonce_expires_in")
    public readonly clientNonceExpiresIn: number | null = null;
    
    constructor(initializer?: Partial<CredentialResponseParameters>) {
        Object.assign(this, initializer);
    }
}