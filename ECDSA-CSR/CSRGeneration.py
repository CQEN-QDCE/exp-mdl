from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import serialization 
from cryptography.hazmat.primitives.asymmetric import rsa

def generateCSR(common_name, 
                country="CA", 
                state=None, 
                city=None, 
                organization=None, 
                organizational_unit=None, 
                email=None, 
                key=None):
    """
    This function generates a Certificate Signing Request (CSR) with the provided details.

    Parameters:
        common_name (str)                   : The common name for the CSR. Typically this is the domain name.
        country (str, optional)             : The country name. Defaults to CA (Canada).
        state (str, optional)               : The state or province name. Defaults to None.
        city (str, optional)                : The city or locality name. Defaults to None.
        organization (str, optional)        : The organization name. Defaults to None.
        organizational_unit (str, optional) : The organizational unit name. Defaults to None.
        email (str, optional)               : The email address. Defaults to None.
        key (str, optional)                 : The private key to use for the CSR. If not provided, a new one will be generated. Defaults to None.

    Returns:
    csr: A Certificate Signing Request (CSR) object.
    """

    # If a ECDSA elliptic curve, get its name; otherwise (Ed25519 included), set it to None
    if isinstance(key, ec.EllipticCurvePrivateKey):
        algorithm = hashes.SHA256()
    else:
        algorithm = None

    csr = x509.CertificateSigningRequestBuilder().subject_name(x509.Name([
        # Provide various details about who we are.

        x509.NameAttribute(NameOID.COUNTRY_NAME, country),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, state),
        x509.NameAttribute(NameOID.LOCALITY_NAME, city),
        x509.NameAttribute(NameOID.ORGANIZATIONAL_UNIT_NAME, organizational_unit),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, organization),
        x509.NameAttribute(NameOID.COMMON_NAME, common_name),

    ])).add_extension(
        x509.SubjectAlternativeName([
            # Email 
            x509.RFC822Name(email), 
        ]),
        critical=False,
    # Sign the CSR with the private key.
    ).sign(key, algorithm)

    return csr
