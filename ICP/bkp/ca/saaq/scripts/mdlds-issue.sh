#!/bin/bash

source ../../../scripts/base.params
source ../../../scripts/saaq.params
source ../../../scripts/utils.sh

echolor $COLOR_BLUE "Configurations actives pour le script: [${0##*/}] =====" 
echolor $COLOR_BLUE  "Vars du fichier base.params.env"  
echo "    PKI_HOME:             $PKI_HOME"
echolor $COLOR_BLUE "Vars du fichier cqen.params.env" 
echo "    SAAQ_ROOT:            $SAAQ_ROOT"
echo "    SAAQ_PASSWORD_FILE:   $SAAQ_PASSWORD_FILE"
echo " " 

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echolor $COLOR_RED "Usage: $0 <username>"
    exit 1
fi

USERNAME=$1
DAYS_VALID=365

# Check if the CSR file exists
if [ ! -f "${SAAQ_ROOT}/csr/${USERNAME}.csr" ]; then
    echolor $COLOR_RED "Error: ${SAAQ_ROOT}/csr/${USERNAME}.csr not found"
    exit 1
fi

# Sign the CSR with your CA to create the certificate
openssl ca -batch -config ${SAAQ_ROOT}/config/openssl.conf \
    -extensions mdlds_cert -days ${DAYS_VALID} \
    -notext -md sha256 \
    -in ${SAAQ_ROOT}/csr/${USERNAME}.csr \
    -out ${SAAQ_ROOT}/certs/${USERNAME}.cer \
    -passin file:$SAAQ_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echolor $COLOR_RED "[Error] Émission du certificat mDL de ${USERNAME}"
    exit 1
fi

echolor $COLOR_GREEN "Generated certificate: ${SAAQ_ROOT}/certs/${USERNAME}.cer"

#EOF
