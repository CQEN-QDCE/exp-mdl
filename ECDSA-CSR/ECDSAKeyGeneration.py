import sys
from   cryptography.hazmat.primitives.asymmetric import ec
from   cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey, Ed25519PublicKey

# Supported elliptic curves
CURVE_P256      = "P256"
CURVE_P384      = "P384"
CURVE_P521      = "P521"
CURVE_ED25519   = "Ed25519"

def generateKeyPair(curveName: str):
    """
    Generates a key pair using the specified algorithm.

    This function generates a public and private key pair using the algorithm specified by the curveName parameter.

    Args:
        curveName (str): The name of the key generation algorithm to use. 
        This should be a string representing a valid supported elliptic curve, such as 'P256', 'P384', 'P521' or 'Ed25519'.

    Returns:
        tuple: A tuple containing the generated private and public keys, in that order.

    Raises:
        ValueError: If the curveName parameter is not a recognized key generation algorithm.
    """
    keyPair = None

    if   curveName.casefold() == CURVE_P256.casefold():
         keyPair =   ec.generate_private_key(ec.SECP256R1())
    elif curveName.casefold() == CURVE_P384.casefold():
         keyPair =   ec.generate_private_key(ec.SECP384R1())
    elif curveName.casefold() == CURVE_P521.casefold():
         keyPair =   ec.generate_private_key(ec.SECP521R1())
    elif curveName.casefold() == CURVE_ED25519.casefold():
         keyPair =   Ed25519PrivateKey.generate()
    else:
        print("Unsupported curve name. Supported curve names are P256, P384, P521 and Ed25519.")
        return None

    return keyPair


def main():
    print("Teste unitaire")

    if sys.argv.__len__() < 2:
        print("Missing parameters. Usage: python3 ECDSAKeyGeneration.py <curveName>")
        sys.exit(1)

    if sys.argv[1] not in ["P256", "P384", "P521"] or len(sys.argv) != 2:
        print("Unsupported curve name. Supported curve names are P256, P384, P521.")
        sys.exit(1)

    curveName = sys.argv[1]
    keyPair = generateKeyPair(curveName)
    print("Curve name: %s", keyPair.curve.name)
    print("Private Key: %s", keyPair)
    print("Public Key: %s", keyPair.public_key())
    sys.exit(0)

if __name__ == "__main__":  
    main()