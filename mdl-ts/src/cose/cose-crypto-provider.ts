import { COSESign1 } from "./cose-sign-1";

export interface COSECryptoProvider {

    sign1(payload: ArrayBuffer, keyID: string | null): Promise<COSESign1>;

    verify1(coseSign1: COSESign1, keyID: string): Promise<boolean>;

    verifyX5Chain(coseSign1: COSESign1, keyID: string | null): Promise<boolean>;
    
}