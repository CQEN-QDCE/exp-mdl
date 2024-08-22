#!/bin/bash

source ../../../scripts/base.params
source ../../../scripts/cqen.params

echo -e "\033[32m===== Configurations actives pour le script: [${0##*/}] =====\033[0m" 
echo -e "\033[34mVars du fichier base.params.env\033[0m" 
echo "    PROJECT_HOME:         $PROJECT_HOME"
echo "    PROJECT_BKP_HOME:     $PROJECT_BKP_HOME"
echo "    PROJECT_SRC_HOME:     $PROJECT_SRC_HOME" 
echo "    PKI_HOME:             $PKI_HOME"
echo -e "\033[34mVars du fichier cqen.params.env\033[0m" 
echo "    CQEN_ROOT:            $CQEN_ROOT"
echo "    CQEN_CONF:            $CQEN_CONF"
echo "    CQEN_PASSWORD_FILE:   $CQEN_PASSWORD_FILE"
echo "    CQEN_CN:              $CQEN_CN"
echo "    CQEN_OCSP_URL:        $CQEN_OCSP_URL"
echo "    CQEN_CRL_URL:         $CQEN_CRL_URL"
echo " " 

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echo -e "\033[33m[WARN] Usage: $0 <username>\033[0m"
    exit 1
fi

USERNAME=$1

# Generate a new ECDSA key pair for the user using the P-256 curve
openssl ecparam -name prime256v1 -genkey -noout -out ${CQEN_ROOT}/private/${USERNAME}.key

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m [ERROR] 'openssl ecparam' \033[0m"
    exit 1
fi

# Create a certificate signing request (CSR)
openssl req -new -key ${CQEN_ROOT}/private/${USERNAME}.key -out ${CQEN_ROOT}/csr/${USERNAME}.csr -config ${CQEN_ROOT}/config/user-cert.conf

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m [ERROR] 'openssl req' \033[0m"
    exit 2
fi

echo -e "\033[32mGenerated ECDSA private key (P-256 curve): ${CQEN_ROOT}/private/${USERNAME}.key"
echo -e "Generated CSR: ${CQEN_ROOT}/csr/${USERNAME}.csr\033[0m"
echo -e "\033[32mCSR générée avec succès.\033[0m"

#EOF
