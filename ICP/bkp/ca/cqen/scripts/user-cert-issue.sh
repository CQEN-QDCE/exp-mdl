#!/bin/bash

source ../../../scripts/base.params
source ../../../scripts/root.params
source ../../../scripts/cqen.params

echo -e "\033[32m===== Configurations actives pour le script: [${0##*/}] =====\033[0m" 
echo -e "\033[34mVars du fichier base.params.env\033[0m" 
echo "    PKI_HOME:             $PKI_HOME"
echo -e "\033[34mVars du fichier cqen.params.env\033[0m" 
echo "    CQEN_ROOT:            $CQEN_ROOT"
echo " " 

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

USERNAME=$1
DAYS_VALID=365

# Check if the CSR file exists
if [ ! -f "${CQEN_ROOT}/csr/${USERNAME}.csr" ]; then
    echo -e "\033[31mError: ${CQEN_ROOT}/csr/${USERNAME}.csr not found\033[0m"
    exit 1
fi

# Sign the CSR with your CA to create the certificate
openssl ca -batch -config ${CQEN_ROOT}/config/openssl.conf -extensions client_cert -days ${DAYS_VALID} -notext -md sha256 \
    -in ${CQEN_ROOT}/csr/${USERNAME}.csr \
    -out ${CQEN_ROOT}/certs/${USERNAME}.cer \
    -passin file:$CQEN_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31mError: 'openssl ca - certificate issuance' \033[0m"
    exit 1
fi

echo -e "\033[32mGenerated certificate: ${CQEN_ROOT}/certs/${USERNAME}.cer\033[0m"
echo -e "\033[32mÉmission de certificat réalisée avec succès.\033[0m"

#EOF
