from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec

def serializePair(pubKey, pubkeyFileName, privKey, privkeyFileName):
    """
    This function serializes a public and private key pair and writes them to files.

    Parameters:
    pubKey : The public key to be serialized.
    pubkeyFileName : The name of the file where the serialized public key will be written.
    privKey : The private key to be serialized.
    privkeyFileName : The name of the file where the serialized private key will be written.

    Returns:
    tuple: A tuple containing None values, as the function's main purpose is to write to files and not to return any value.
    """
    return serializePubKey(pubKey, pubkeyFileName), serializePrivKey(privKey, privkeyFileName)


def serializePubKey(pubKey, pubkeyFileName):
    """
    This function serializes a public key and writes it to a file.

    Parameters:
    pubKey : The public key to be serialized.
    pubkeyFileName : The name of the file where the serialized public key will be written.

    Returns:
    None: The function's main purpose is to write to a file and not to return any value.
    """
    pubkey_enc = pubKey.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    with open("keys/"+ pubkeyFileName, "wb") as f:
        f.write(pubkey_enc)
        f.close()

    return None


def serializePrivKey(privKey, privkeyFileName):
    """
    This function serializes a private key and writes it to a file.

    Parameters:
    privKey : The private key to be serialized.
    privkeyFileName : The name of the file where the serialized private key will be written.

    Returns:
    None: The function's main purpose is to write to a file and not to return any value.
    """
    privKey_enc = privKey.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )

    with open("keys/"+ privkeyFileName, "wb") as f:
        f.write(privKey_enc)
        f.close()

def serializeCSR(csr, csrFileName):
    """
    This function serializes a CSR and writes it to a file.

    Parameters:
    csr : The CSR to be serialized.

    Returns:
    None: The function's main purpose is to write to a file and not to return any value.
    """
    csr_enc = csr.public_bytes(
        encoding=serialization.Encoding.PEM
    )

    with open("csr/"+ csrFileName, "wb") as f:
        f.write(csr_enc)
        f.close()

    return None