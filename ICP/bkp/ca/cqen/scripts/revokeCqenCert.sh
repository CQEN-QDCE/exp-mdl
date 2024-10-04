#!/bin/bash
# Si le fichier du certificat est disponible: 
# openssl ca -config ca.conf -revoke path/to/certificate_to_revoke.pem -crl_reason cessationOfOperation
#
# Si le serial number est disponible:  
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
source ../../../scripts/cqen.params
source ../../../scripts/utils.sh

echolor $COLOR_BLUE "===== Configurations actives pour le script: [${0##*/}] =====" 
echolor $COLOR_BLUE "Vars du fichier base.params.env" 
echo "    PKI_HOME:             $PKI_HOME"
echolor $COLOR_BLUE "Vars du fichier cqen.params.env" 
echo "    CQEN_ROOT:            $CQEN_ROOT"
echo "    CQEN_PASSWORD_FILE:   $CQEN_PASSWORD_FILE"
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

openssl ca -config $CQEN_ROOT/config/openssl.conf -revoke $CQEN_ROOT/certs/$ID_CERT.cer -crl_reason $REASON -passin file:$CQEN_PA

SSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echolor $COLOR_RED "Error: 'openssl ca - certificate revocation'"
    exit 1
fi

echolor $COLOR_GREEN "Certificat $ID_CERT est revoqué avec succès."

#EOF
