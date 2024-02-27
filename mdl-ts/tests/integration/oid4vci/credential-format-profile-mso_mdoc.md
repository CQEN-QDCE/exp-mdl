Credential Format Profile for credentials complying with [ISO.18013-5].

FORMAT IDENTIFIER:
The Credential format identifier is mso_mdoc.

CREDENTILA ISSUER METADATA
The following additional Credential Issuer metadata are defined for this Credential format to be added to the credentials_supported parameter

- doctype: REQUIRED. String identifying the credential type as defined in [ISO.18013-5].
- claims: OPTIONAL. An object containing a list of name/value pairs, where the name is a certain namespace as defined in [ISO.18013-5] (or any profile of it), and the value is an object. This object also contains a list of name/value pairs, where the name is a claim name value that is defined in the respective namespace and is offered in the Credential. The value is an object detailing the specifics of the claim with the following non-exhaustive list of parameters that MAY be included:

    a. mandatory: OPTIONAL. Boolean which when set to true indicates the claim MUST be present in the issued Credential. If the mandatory property is omitted its default should be assumed to be false.
    
    b. value_type: OPTIONAL. String value determining the type of value of the claim. A non-exhaustive list of valid values defined by this specification are string, number, and image media types such as image/jpeg as defined in IANA media type registry for images (https://www.iana.org/assignments/media-types/media-types.xhtml#image).
    
    c. display: OPTIONAL. An array of objects, where each object contains display properties of a certain claim in the Credential for a certain language. Below is a non-exhaustive list of valid parameters that MAY be included:

        1. name: OPTIONAL. String value of a display name for the claim.
        2. locale: OPTIONAL. String value that identifies language of this object represented as language tag values defined in BCP47 [RFC5646]. There MUST be only one object for each language identifier.

- order: OPTIONAL. An array of namespaced claim name values that lists them in the order they should be displayed by the Wallet. The values MUST be two strings separated by a tilde ('~') character, where the first string is a namespace value and a second is a claim name value. For example, `org.iso.18013.5.1~given_name".
The following is a non-normative example of an object comprising credentials_supported parameter of Credential format mso_mdoc: credential-supported-mso_mdoc.json

CREDENTIAL OFFER:
The following is a non-normative example of a Credential Offer of Credential format mso_mdoc: credential-offer-mso_mdoc.json

AUTHORIZATION DETAILS:
The following additional claims are defined for authorization details of type openid_credential and this Credential format.

- doctype: REQUIRED. String as defined in Appendix E.2.2. This claim contains the type values the Wallet requests authorization for at the Credential Issuer.
- claims: OPTIONAL. An object as defined in Appendix E.2.2.

The following is a non-normative example of an authorization details object with Credential format mso_mdoc: authorization-details-mso_mdoc.json

CREDENTIAL REQUEST:
The following additional parameters are defined for Credential Requests and this Credential format.

- doctype: REQUIRED. String as defined in Appendix E.2.2. The credential issued by the Credential Issuer MUST at least contain the values listed in this claim.
- claims: OPTIONAL. An object as defined in Appendix E.2.2.

The following is a non-normative example of a Credential Request with Credential format mso_mdoc: credential-request-mso_mdoc.json
