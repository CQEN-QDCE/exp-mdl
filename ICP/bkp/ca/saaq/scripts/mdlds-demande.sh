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

# Generate a new ECDSA key pair for the user using the P-256 curve
openssl ecparam -name prime256v1 -genkey -noout -out ${SAAQ_ROOT}/private/${USERNAME}.key

# Create a certificate signing request (CSR)
openssl req -new -key ${SAAQ_ROOT}/private/${USERNAME}.key \
            -out ${SAAQ_ROOT}/csr/mDL_${USERNAME}.csr \
            -config ${SAAQ_ROOT}/config/openssl.conf \
            -subj "/C=CA/ST=QC/O=Gouvernement du Quebec/OU=Autorite de Certification SAAQ Dev v1/CN=$USERNAME" 

retVal=$?
if [ $retVal -ne 0 ]; then
    echolor $COLOR_RED "[Error] Génération de la CSR du certificat mDL de ${USERNAME}"
    exit 1
fi

echolor $COLOR_GREEN "Generated ECDSA private key (P-256 curve): ${SAAQ_ROOT}/private/${USERNAME}.key"
echolor $COLOR_GREEN "Generated CSR: ${SAAQ_ROOT}/csr/mDL_${USERNAME}.csr"

#EOF
