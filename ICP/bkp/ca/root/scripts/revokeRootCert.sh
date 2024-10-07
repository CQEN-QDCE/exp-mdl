#!/bin/bash
# Se o arquivo de certificado esta disponivel 
# openssl ca -config ca.conf -revoke path/to/certificate_to_revoke.pem -crl_reason cessationOfOperation
#
# Se o serial number esta disponivel 
# openssl ca -config ca.conf -revoke /dev/null -crl_reason cessationOfOperation -serial 0x<serial_number>

# Reasons for revocation: 
# 
#   unspecified
#   keyCompromise
#   CACompromise
#   affiliationChanged
#   superseded
#   cessationOfOperation
#   certificateHold

source ../../../scripts/base.params
source ../../../scripts/saaq.params
source ../../../scripts/utils.sh

echolor $COLOR_BLUE "===== Configurations actives pour le script: [${0##*/}] =====" 
echolor $COLOR_BLUE "Vars du fichier base.params.env" 
echo "    PKI_HOME:             $PKI_HOME"
echolor $COLOR_BLUE "Vars du fichier saaq.params.env" 
echo "    PKI_ROOT:             $PKI_ROOT"
echo "    ROOT_PASSWORD_FILE:   $ROOT_PASSWORD_FILE"
echo " " 


# Vérifier les paramètres de la fonction
if [ "$#" -gt 2 ]; then
    echolor $COLOR_RED "Usage: $0 <id do certificado> <optional revocation reason>"
    exit 1
fi

ID_CERT=$1

if [ -n "$2" ]
then
    REASON=$2
else
    REASON="unspecified"
fi

openssl ca -config $PKI_ROOT/config/openssl.conf -revoke $PKI_ROOT/certs/$ID_CERT.cer -crl_reason $REASON -passin file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echolor $COLOR_RED "Error: 'openssl ca - certificate revocation'"
    exit 1
fi

echolor $COLOR_GREEN "Certificat $ID_CERT est revoqué avec succès."

#EOF
