import { MobileDrivingLicenceAllDataElement } from "./mobile-driving-licence-data-elements.enum";

export interface CredentialScheme {
    schemaUri: string;
    vcType: string;
    isoNamespace: string;
    isoDocType: string;
    claimNames: string[];
}

export class AtomicAttribute2023 implements CredentialScheme {
    public readonly schemaUri = 'https://wallet.a-sit.at/schemas/1.0.0/AtomicAttribute2023.json';
    public readonly vcType = 'AtomicAttribute2023';
    public readonly isoNamespace = 'at.a-sit.wallet.atomic-attribute-2023';
    public readonly isoDocType = 'at.a-sit.wallet.atomic-attribute-2023.iso';
    public readonly claimNames = [];
}

export class MobileDrivingLicence2023 implements CredentialScheme {
    public readonly schemaUri = 'https://wallet.a-sit.at/schemas/1.0.0/MobileDrivingLicence2023.json';
    public readonly vcType = 'MobileDrivingLicence';
    public readonly isoNamespace = 'org.iso.18013.5.1';
    public readonly isoDocType = 'org.iso.18013.5.1.mDL';
    public readonly claimNames = ['givenName', 'familyName', 'birthDate'];
    constructor() {
        const claimNames: string[] = [];
        for (let element of MobileDrivingLicenceAllDataElement.ALL) {
            claimNames.push(element.toString());
        }
        this.claimNames = claimNames;
    }
}