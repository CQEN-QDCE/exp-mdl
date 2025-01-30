#!/bin/bash

source ../../../scripts/base.params
source ../../../scripts/xroad.params

echo -e "\033[32m===== Configurations actives pour le script: [${0##*/}] =====\033[0m" 
echo -e "\033[34mVars du fichier base.params.env\033[0m" 
echo "    PROJECT_HOME:         $PROJECT_HOME"
echo "    PROJECT_BKP_HOME:     $PROJECT_BKP_HOME"
echo "    PROJECT_SRC_HOME:     $PROJECT_SRC_HOME" 
echo "    PKI_HOME:             $PKI_HOME"
echo -e "\033[34mVars du fichier xroad.params.env\033[0m" 
echo "    XROAD_ROOT:            $XROAD_ROOT"
echo "    XROAD_CONF:            $XROAD_CONF"
echo "    XROAD_PASSWORD_FILE:   $XROAD_PASSWORD_FILE"
echo "    XROAD_CN:              $XROAD_CN"
echo "    XROAD_OCSP_URL:        $XROAD_OCSP_URL"
echo "    XROAD_CRL_URL:         $XROAD_CRL_URL"
echo " " 

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echo -e "\033[33m[WARN] Usage: $0 <username>\033[0m"
    exit 1
fi

USERNAME=$1

# Generate a new ECDSA key pair for the user using the P-256 curve
openssl ecparam -name prime256v1 -genkey -noout -out ${XROAD_ROOT}/private/${USERNAME}.pem
openssl ec -in ${XROAD_ROOT}/private/${USERNAME}.pem -out ${XROAD_ROOT}/private/${USERNAME}.key -aes256

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m [ERROR] 'openssl ecparam' \033[0m"
    exit 1
fi

# Create a certificate signing request (CSR)
openssl req -new -key ${XROAD_ROOT}/private/${USERNAME}.key -out ${XROAD_ROOT}/csr/${USERNAME}.csr -config ${XROAD_ROOT}/config/user-cert.conf

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m [ERROR] 'openssl req' \033[0m"
    exit 2
fi

# Clean up
rm ${XROAD_ROOT}/private/${USERNAME}.pem

echo -e "\033[32mGenerated ECDSA private key (P-256 curve): ${XROAD_ROOT}/private/${USERNAME}.key"
echo -e "Generated CSR: ${XROAD_ROOT}/csr/${USERNAME}.csr\033[0m"
echo -e "\033[32mCSR générée avec succès.\033[0m"

#EOF
