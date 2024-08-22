#!/bin/bash

source ../../../scripts/base.params
source ../../../scripts/cqen.params

echo -e "\033[32m===== Configurations actives pour le script: [${0##*/}] =====\033[0m" 
echo -e "\033[34mVars du fichier base.params.env\033[0m" 
echo "    PKI_HOME:                 $PKI_HOME"
echo -e "\033[34mVars du fichier cqen.params.env\033[0m" 
echo "    CQEN_ROOT:                $CQEN_ROOT"
echo "    CQEN_OCSP_PASSWORD_FILE:  $CQEN_OCSP_PASSWORD_FILE"
echo " " 

CQEN_OCSP_PASSWORD_FILE="$CQEN_ROOT/private/ocsp_password.txt"

openssl ocsp -index $CQEN_ROOT/db/index.txt \
    -port 2561 \
    -rsigner $CQEN_ROOT/certs/ocsp.cert.cer \
    -rkey $CQEN_ROOT/private/ocsp.key.pem \
    -CA $PKI_HOME/cacerts/ACInterCQENDevV1.cer-CHAIN.pem \
    -text -out ocsp_log.txt \
    -passin file:$CQEN_OCSP_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: le répondeur OCSP de l'Autorité du CQEN ne peut pas être démarré. \033[0m"
    exit 1
fi

#EOF
