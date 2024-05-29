import { CredentialFormatEnum } from "./credential-format.enum";
import { CredentialRequestProof } from "./credential-request-proof";
import { RequestedCredentialClaimSpecification } from "./mdl/requested-credential-claim-specification";

export class CredentialRequestParameters {
    constructor(public readonly format: CredentialFormatEnum,
                public readonly types: string[] = [],
                public readonly docType: string,
                public readonly claims: Map<string, Map<string, RequestedCredentialClaimSpecification>>,
                public readonly proof: CredentialRequestProof) {

    }
}