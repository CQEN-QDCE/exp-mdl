export enum ProofType {
    // JSON web token.
    JWT = 'jwt',
    JWT_HEADER_TYPE = "openid4vci-proof+jwt",
    // CBOR web token.
    CWT = "cwt"
}