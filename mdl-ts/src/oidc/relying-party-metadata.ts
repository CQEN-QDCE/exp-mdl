import { FornatHolder } from "./vc/format-holder";

export class RelyingPartyMetadata {

    // @SerialName("redirect_uris")
    public readonly redirectUris: string[] = [];    

    // @SerialName("jwks")
    public readonly jsonWebKeySet: JsonWebKeySet;    

    // @SerialName("subject_syntax_types_supported")
    public readonly subjectSyntaxTypesSupported: string[] = [];    

    // @SerialName("vp_formats")
    public readonly vpFormats: FornatHolder | null = null;    

    // @SerialName("client_id_scheme")
    public readonly clientIdScheme: string | null = null;    

    constructor(initializer?: Partial<RelyingPartyMetadata>) {
        Object.assign(this, initializer);
    }
}

export class JsonWebKeySet {

    // @SerialName("keys")
    public readonly keys: JsonWebKey[] = [];

    constructor(initializer?: Partial<JsonWebKeySet>) {
        Object.assign(this, initializer);
    }
}