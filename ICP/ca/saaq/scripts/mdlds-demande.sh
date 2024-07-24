#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
SAAQ_ROOT="$HOME/icpGouvQC/ca/saaq"

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

USERNAME=$1

# Generate a new ECDSA key pair for the user using the P-256 curve
openssl ecparam -name prime256v1 -genkey -noout -out ${SAAQ_ROOT}/private/${USERNAME}.key

# Create a certificate signing request (CSR)
openssl req -new -key ${SAAQ_ROOT}/private/${USERNAME}.key \
            -out ${SAAQ_ROOT}/csr/${USERNAME}.csr \
            -config ${SAAQ_ROOT}/config/openssl.conf \
            -subj "/C=CA/ST=QC/O=Gouvernement du Quebec/OU=Autorite de Certification SAAQ Dev v1/CN=$USERNAME" 

echo "Generated ECDSA private key (P-256 curve): ${SAAQ_ROOT}/private/${USERNAME}.key"
echo "Generated CSR: ${SAAQ_ROOT}/csr/${USERNAME}.csr"

#EOF
