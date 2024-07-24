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

HOME="</home/dir/a/la/racine/du/projet>"
ROOT_ROOT="$HOME/icpGouvQC/ca/root"
ROOT_PASSWORD_FILE="$ROOT_ROOT/private/ca_password.txt"

# Check if a username was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <id do certificado>"
    exit 1
fi

ID_CERT=$1

openssl ca -config $ROOT_ROOT/config/openssl.conf -revoke $ROOT_ROOT/certs/$ID_CERT.cer -crl_reason unspecified -passin file:$ROOT_PASSWORD_FILE

#EOF
