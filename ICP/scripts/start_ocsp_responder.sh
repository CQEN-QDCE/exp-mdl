#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
$PKI_ROOT="$HOME/icpGouvQC"

OCSP_CONF=$PKI_ROOT"/config/ocsp.conf"
INT_DIR=$PKI_ROOT"/ca/cqen"
OCSP_PASSWORD_FILE="$INT_DIR/private/ocsp_password.txt"

openssl ocsp -index $INT_DIR/db/index.txt \
    -port 2560 \
    -rsigner $INT_DIR/certs/ocsp.cert.pem \
    -rkey $INT_DIR/private/ocsp.key.pem \
    -CA $INT_DIR/certs/ca-chain.cert.pem \
    -text -out log.txt \
    -passin file:$OCSP_PASSWORD_FILE