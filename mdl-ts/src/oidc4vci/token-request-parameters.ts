export class TokenRequestParameters {

    // @SerialName("grant_type")
    public readonly grantType: string;

    // @SerialName("code")
    public readonly code: string;

    // @SerialName("redirect_uri")
    public readonly redirectUrl: string;

    // @SerialName("client_id")
    public readonly clientId: string;

    // @SerialName("pre-authorized_code")
    public readonly preAuthorizedCode: string | null = null;

    // @SerialName("code_verifier")
    public readonly codeVerifier: string | null = null;

    // @SerialName("user_pin")
    public readonly userPin: string | null = null;
    
    constructor(initializer?: Partial<TokenRequestParameters>) {
        Object.assign(this, initializer);
    }
}