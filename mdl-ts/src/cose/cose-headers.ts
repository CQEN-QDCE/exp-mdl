import { CoseAlgorithm } from "./cose-algorithm.enum";
import { CoseHeaderLabel } from "./cose-header-label.enum";
import { CoseHeaderValue } from "./cose-header-value";

export class CoseHeaders {

    // @CborLabel(1)
    // @SerialName("alg")
    public readonly algorithm: CoseHeaderValue<CoseAlgorithm>;

    // @CborLabel(2)
    // @SerialName("crit")
    public readonly criticalHeaders = new CoseHeaderValue<CoseHeaderLabel[]>(null).unprotect();

    // @CborLabel(3)
    // @SerialName("content type")
    public readonly contentType = new CoseHeaderValue<string>(null).unprotect();

    // @CborLabel(4)
    // @SerialName("kid")
    public readonly kid = new CoseHeaderValue<ArrayBuffer>(null).unprotect();

    // @CborLabel(5)
    // @SerialName("IV")
    public readonly iv = new CoseHeaderValue<ArrayBuffer>(null).unprotect();

    // @CborLabel(6)
    // @SerialName("Partial IV")
    public readonly partialIv = new CoseHeaderValue<ArrayBuffer>(null).unprotect();

    // @CborLabel(33)
    // @SerialName("x5chain")
    public readonly x5Chain: CoseHeaderValue<ArrayBuffer>;

    constructor() {
        this.algorithm = new CoseHeaderValue<CoseAlgorithm>(CoseAlgorithm.ES256);
        this.algorithm.protect();
        this.x5Chain = new CoseHeaderValue<ArrayBuffer>(null);
        this.x5Chain.unprotect();
    }

}