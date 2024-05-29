export type TokenRequest = {
    grant_type: string;
    "pre-authorized_code": string;
    user_pin: number;
};
export type CreateTokenRequestOptions = {
    preAuthCode: string;
    userPin?: number;
};

export type KeyPairRequirements = {
    kid: string;
    did: string;
    privKeyHex: string;
};