#!/bin/bash
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
source ../../../scripts/xroad.params
source ../../../scripts/utils.sh

echolor $COLOR_BLUE "===== Configurations actives pour le script: [${0##*/}] =====" 
echolor $COLOR_BLUE "Vars du fichier base.params.env" 
echo "    PKI_HOME:             $PKI_HOME"
echolor $COLOR_BLUE "Vars du fichier saaq.params.env" 
echo "    XROAD_ROOT:            $XROAD_ROOT"
echo "    XROAD_PASSWORD_FILE:   $XROAD_PASSWORD_FILE"
echo " " 

# Vérifier les paramètres de la fonction
if [ "$#" -gt 2 ]; then
    echolor $COLOR_RED "Usage: $0 <id du certificat> <raison de revocation optionelle>"
    exit 1
fi

ID_CERT=$1

if [ -n "$2" ]
then
    REASON=$2
else
    REASON="unspecified"
fi

openssl ca -config $XROAD_ROOT/config/openssl.conf -revoke $XROAD_ROOT/certs/$ID_CERT.cer -crl_reason unspecified -passin file:$XROAD_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echolor $COLOR_RED "Error: 'openssl ca - certificate revocation'"
    exit 1
fi

echolor $COLOR_GREEN "Certificat $ID_CERT revoqué avec succès." 

#EOF
