#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
SAAQ_ROOT="$HOME/icpGouvQC/ca/saaq"
SAAQ_PASSWORD_FILE="$SAAQ_ROOT/private/ca_password.txt"

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

USERNAME=$1
DAYS_VALID=365

# Check if the CSR file exists
if [ ! -f "${SAAQ_ROOT}/csr/${USERNAME}.csr" ]; then
    echo "Error: ${SAAQ_ROOT}/csr/${USERNAME}.csr not found"
    exit 1
fi

# Sign the CSR with your CA to create the certificate
openssl ca -batch -config ${SAAQ_ROOT}/config/openssl.conf \
    -extensions mdlds_cert -days ${DAYS_VALID} \
    -notext -md sha256 \
    -in ${SAAQ_ROOT}/csr/${USERNAME}.csr \
    -out ${SAAQ_ROOT}/certs/${USERNAME}.cer \
    -passin file:$SAAQ_PASSWORD_FILE

echo "Generated certificate: ${SAAQ_ROOT}/certs/${USERNAME}.cer"

#EOF
