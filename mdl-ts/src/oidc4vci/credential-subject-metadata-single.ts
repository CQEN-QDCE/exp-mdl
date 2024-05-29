export class CredentialSubjectMetadataSingle {
    constructor(public readonly mandatory: boolean, 
                public readonly valueType: string, // @SerialName("value_type")
                public readonly display: string) {

    }
}