#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
CQEN_ROOT="$HOME/icpGouvQC/ca/cqen"

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

USERNAME=$1

# Generate a new ECDSA key pair for the user using the P-256 curve
openssl ecparam -name prime256v1 -genkey -noout -out ${CQEN_ROOT}/private/${USERNAME}.key

# Create a certificate signing request (CSR)
openssl req -new -key ${CQEN_ROOT}/private/${USERNAME}.key -out ${CQEN_ROOT}/csr/${USERNAME}.csr -config ${CQEN_ROOT}/config/user-cert.conf

echo "Generated ECDSA private key (P-256 curve): ${CQEN_ROOT}/private/${USERNAME}.key"
echo "Generated CSR: ${CQEN_ROOT}/csr/${USERNAME}.csr"