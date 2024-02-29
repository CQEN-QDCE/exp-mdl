import { CredentialAttribute } from "./credential-attribute";

export class MdocDataElement {
    constructor(private readonly attribute: CredentialAttribute,
                private readonly mandatory: boolean) {

    }
}