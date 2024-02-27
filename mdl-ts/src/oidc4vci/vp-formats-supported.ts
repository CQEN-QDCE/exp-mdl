export class VpFormatsSupported {
    constructor(public readonly vcJwt: SupportedAlgorithmsContainer, // @SerialName("jwt_vc_json")
                public readonly vcJsonLd: SupportedAlgorithmsContainer, // @SerialName("jwt_vc_json-ld")
                public readonly jsonLinkedData: SupportedAlgorithmsContainer // @SerialName("ldp_vc")
                
    ) {

    }
}

export class SupportedAlgorithmsContainer {
    constructor(public readonly supportedAlgorithms: string[] = [], // @SerialName("alg_values_supported")
    ) {

    }
}   