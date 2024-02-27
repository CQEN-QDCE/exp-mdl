export enum CoseAlgorithm {
    // HMAC
    HMAC256_64 = 4,
    HMAC256 = 5,
    HMAC384 = 6,
    HMAC512 = 7,
    // ECDSA with SHA-size
    ES256 = -7,
    ES384 = -35,
    ES512 = -36,
    // RSASSA-PSS with SHA-size
    PS256 = -37,
    PS384 = -38,
    PS512 = -39,
    // RSASSA-PKCS1-v1_5 with SHA-size
    RS256 = -257,
    RS384 = -258,
    RS512 = -259,
    // RSASSA-PKCS1-v1_5 using SHA-1
    RS1 = -65535  
}

export namespace CoseAlgorithm {
    export function toSubtleCryptoAlgorithm(value: CoseAlgorithm): AlgorithmIdentifier | RsaPssParams | EcdsaParams {
        switch (value) {
            case CoseAlgorithm.HMAC256_64:
                return {
                    name: "HMAC",
                    hash: { name: "SHA-256" },
                }
            case CoseAlgorithm.HMAC256:
                return {
                    name: "HMAC",
                    hash: { name: "SHA-256" },
                }
            case CoseAlgorithm.HMAC384:
                return {
                    name: "HMAC",
                    hash: { name: "SHA-384" },
                }
            case CoseAlgorithm.HMAC512:
                return {
                    name: "HMAC",
                    hash: { name: "SHA-512" },
                }
            case CoseAlgorithm.ES256:
                return {
                    name: "ECDSA",
                    hash: { name: "SHA-256" },
                }
            case CoseAlgorithm.ES384:
                return {
                    name: "ECDSA",
                    hash: { name: "SHA-384" },
                }
            case CoseAlgorithm.ES512:
                return {
                    name: "ECDSA",
                    hash: { name: "SHA-512" },
                }
/*                
            case CoseAlgorithm.PS256:
                f.algorithm = "RSA-PSS";
                f.hash = "SHA-256";
                break;
            case CoseAlgorithm.PS384:
                f.algorithm = "RSA-PSS";
                f.hash = "SHA-384";
                break;
            case CoseAlgorithm.PS512:
                f.algorithm = "RSA-PSS";
                f.hash = "SHA-512";
                break;
            case CoseAlgorithm.RS256:
                f.algorithm = "RSASSA-PKCS1-v1_5";
                f.hash = "SHA-256";
                break;
            case CoseAlgorithm.RS384:
                f.algorithm = "RSASSA-PKCS1-v1_5";
                f.hash = "SHA-384";
                break;
            case CoseAlgorithm.RS512:
                f.algorithm = "RSASSA-PKCS1-v1_5";
                f.hash = "SHA-512";
                break;
            case CoseAlgorithm.RS1:
                f.algorithm = "RSASSA-PKCS1-v1_5";
                f.hash = "SHA-1";
                break;
*/
            default:
                throw new Error("Algorithm not supported");
        }
    }

}