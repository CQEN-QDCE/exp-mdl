import { CredentialAttributeType } from "../credential-attribute-type.enum";
import { CredentialType } from "../credential-type";
import { CredentialTypeBuilder } from "../credential-type-builder";

export class DrivingLicense {
    public readonly MDL_NAMESPACE: string = "org.iso.18013.5.1";
    public readonly AAMVA_NAMESPACE: string = "org.iso.18013.5.1.aamva";

    public getCredentialType(): CredentialType {
        return new CredentialTypeBuilder("Driving License")
            .addMdocCredentialType("org.iso.18013.5.1.mDL")
            .addVcCredentialType("Iso18013DriversLicenseCredential")
            .addAttribute(
                CredentialAttributeType.String,
                "family_name",
                "Family Name",
                "Last name, surname, or primary identifier, of the mDL holder.",
                true,
                this.MDL_NAMESPACE
            )
            .addAttribute(
                CredentialAttributeType.String,
                "given_name",
                "Given Names",
                "First name(s), other name(s), or secondary identifier, of the mDL holder",
                true,
                this.MDL_NAMESPACE
            )
            .addAttribute(
                CredentialAttributeType.Date,
                "birth_date",
                "Date of Birth",
                "Day, month and year on which the mDL holder was born. If unknown, approximate date of birth",
                true,
                this.MDL_NAMESPACE
            )
            .addAttribute(
                CredentialAttributeType.Date,
                "issue_date",
                "Date of Issue",
                "Date when mDL was issued",
                true,
                this.MDL_NAMESPACE
            )
            .addAttribute(
                CredentialAttributeType.Date,
                "expiry_date",
                "Date of Expiry",
                "Date when mDL expires",
                true,
                this.MDL_NAMESPACE
            )
//            .addAttribute(
//                CredentialAttributeType.StringOptions(Options.COUNTRY_ISO_3166_1_ALPHA_2),
//                "issuing_country",
//                "Issuing Country",
//                "Alpha-2 country code, as defined in ISO 3166-1, of the issuing authority’s country or territory",
//                true,
//                MDL_NAMESPACE
//            )
            .addAttribute(
                CredentialAttributeType.String,
                "issuing_authority",
                "Issuing Authority",
                "Issuing authority name.",
                true,
                this.MDL_NAMESPACE
            )
            .addAttribute(
                CredentialAttributeType.String,
                "document_number",
                "License Number",
                "The number assigned or calculated by the issuing authority.",
                true,
                this.MDL_NAMESPACE
            )
            .addAttribute(
                CredentialAttributeType.Picture,
                "portrait",
                "Photo of Holder",
                "A reproduction of the mDL holder’s portrait.",
                true,
                this.MDL_NAMESPACE
            )
            .build();
    }
}