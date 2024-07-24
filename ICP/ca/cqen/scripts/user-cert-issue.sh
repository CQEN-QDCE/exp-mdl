#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
CQEN_ROOT="$HOME/icpGouvQC/ca/cqen"
CQEN_PASSWORD_FILE="$CQEN_ROOT/private/ca_password.txt"

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

USERNAME=$1
DAYS_VALID=365

# Check if the CSR file exists
if [ ! -f "${CQEN_ROOT}/csr/${USERNAME}.csr" ]; then
    echo "Error: ${CQEN_ROOT}/csr/${USERNAME}.csr not found"
    exit 1
fi

# Sign the CSR with your CA to create the certificate
openssl ca -batch -config ${CQEN_ROOT}/config/openssl.conf -extensions client_cert -days ${DAYS_VALID} -notext -md sha256 \
    -in ${CQEN_ROOT}/csr/${USERNAME}.csr \
    -out ${CQEN_ROOT}/certs/${USERNAME}.cer \
    -passin file:$CQEN_PASSWORD_FILE

echo "Generated certificate: ${CQEN_ROOT}/certs/${USERNAME}.cer"