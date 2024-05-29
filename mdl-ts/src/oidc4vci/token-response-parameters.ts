export class TokenResponseParameters {
    // @SerialName("access_token")
    public readonly accessToken: string;

    // @SerialName("refresh_token")
    public readonly refreshToken: string | null = null;    

    // @SerialName("token_type")
    public readonly tokenType: string;

    // @SerialName("expires_in")
    public readonly expires: number;

    // @SerialName("scope")
    public readonly scope: string | null = null;    

    // @SerialName("c_nonce")
    public readonly clientNonce: string | null = null;    

    // @SerialName("c_nonce_expires_in")
    public readonly clientNonceExpiresIn: number | null = null;    

     // @SerialName("authorization_pending")
    public readonly authorizationPending: string;

    // @SerialName("interval")
    public readonly interval: number | null = null;    

    constructor(initializer?: Partial<TokenResponseParameters>) {
        Object.assign(this, initializer);
    }
}