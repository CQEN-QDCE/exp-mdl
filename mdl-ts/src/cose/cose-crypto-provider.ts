import { COSESign1 } from "./cose-sign-1";

export interface COSECryptoProvider {

    sign1(payload: Buffer, keyID: string | null): COSESign1;

    verify1(coseSign1: COSESign1, keyID: string | null): boolean;

    verifyX5Chain(coseSign1: COSESign1, keyID: string | null): boolean;
    
}