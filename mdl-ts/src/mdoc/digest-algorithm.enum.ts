/*
9.1.2.5 Message digest function
The issuing authority infrastructure shall use one of the following digest algorithms: SHA-256, SHA-384 or SHA-512 as specified in ISO/IEC 10118-3.
*/
export enum DigestAlgorithm {
    SHA256 = 'SHA-256',
    SHA384 = 'SHA-384',
    SHA512 = 'SHA-512'
}