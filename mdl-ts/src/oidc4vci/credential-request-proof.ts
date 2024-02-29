import { ProofType } from "./proof-type.enum";

export abstract class CredentialRequestProof {
    constructor(public readonly proofType: ProofType, // @SerialName("proof_type")
    ) {

    }
}

export class JwtCredentialRequestProof extends CredentialRequestProof {
    constructor(public readonly jwt: string // @SerialName("jwt")
    ) {
        super(ProofType.JWT);
    }
}

export class CborCredentialRequestProof extends CredentialRequestProof {
    constructor(public readonly cwt: string // @SerialName("cwt")
    ) {
        super(ProofType.CWT);
    }
}