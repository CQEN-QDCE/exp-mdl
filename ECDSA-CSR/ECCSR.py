import sys
from ECDSAKeyGeneration import generateKeyPair
from SerializeKeys import serializePair, serializeCSR
from CSRGeneration import generateCSR

# Set the default values for the certificate
COUNTRY="CA"
STATE="Quebec"
CITY="Quebec City"
ORGANIZATION="Centre Quebecois dExcellence Numerique"
ORGANIZATIONAL_UNIT="Autorite de Certification Intermediaire CQEN Exp V1"
EMAIL="cqen@mcn.gouv.qc.ca"

def main(): 
    print("===== Key and CSR generation utility =====")
    
    if sys.argv.__len__() != 3:
        print("Missing parameter. Please inform a supported curve name and an alias.") 
        print("Usage: python3 ECCSR.py <curveName> <alias>")
        print("Supported curve names are P256, P384, P521 and Ed25519.")
        sys.exit(1)

    curveName = sys.argv[1]
    alias = sys.argv[2]

    if curveName.casefold() not in ["p256", "p384", "p521", "ed25519"]: 
        print("Unsupported curve name. Supported curve names are P256, P384, P521 and Ed25519.")
        sys.exit(1)

    keyPair = generateKeyPair(curveName)

    if curveName.casefold() == "ed25519":
        print("Curve name: ", curveName)
    else:
        print("Curve name: ", keyPair.curve.name)

    print("Private Key: ", keyPair)
    print("Public Key: ", keyPair.public_key())

    print("Serializing keys...")
    serializePair(keyPair.public_key(), alias+"-pub.key", keyPair, alias+"-priv.key")

    common_name=alias

    print("CSR generation")
    csr = generateCSR(common_name, COUNTRY, STATE, CITY, ORGANIZATION, ORGANIZATIONAL_UNIT, EMAIL, keyPair)
    serializeCSR(csr, alias+ ".csr")
    

if __name__ == "__main__":
    main()