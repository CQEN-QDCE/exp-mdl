export class AuthnRequestClaims {
 
    // @SerialName("id_token")
    public readonly idTokenMap: Map<string, AuthnRequestSingleClaim> | null = null;

    // @SerialName("id_token")
    public readonly userInfoMap: Map<string, AuthnRequestSingleClaim> | null = null;
    
    constructor(initializer?: Partial<AuthnRequestClaims>) {
        Object.assign(this, initializer);
    }
}

export class AuthnRequestSingleClaim {

    // @SerialName("essential")
    public readonly essential: boolean;

    // @SerialName("value")
    public readonly value: string | null = null;;

    // @SerialName("values)
    public readonly values: string[] = [];

    constructor(initializer?: Partial<AuthnRequestSingleClaim>) {
        Object.assign(this, initializer);
    }
}