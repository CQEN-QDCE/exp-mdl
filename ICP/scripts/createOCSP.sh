#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
ROOT="$HOME/icpGouvQC"
CQEN_DIR="$ROOT/ca/cqen"
CQEN_CONF="$CQEN_DIR/config/openssl.conf"
CQEN_PASSWORD_FILE="$CQEN_DIR/private/ca_password.txt"
OCSP_PASSWORD_FILE="$CQEN_DIR/private/ocsp_password.txt"

# Generate OCSP responder key using ECDSA with P-521 curve
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $CQEN_DIR/private/ocsp.key.pem -passout file:$OCSP_PASSWORD_FILE

# Generate CSR for OCSP responder
openssl req -config $CQEN_CONF -new -sha512 \
    -key $CQEN_DIR/private/ocsp.key.pem \
    -out $CQEN_DIR/csr/ocsp.csr.pem \
    -subj "/C=CA/ST=QC/O=Gouvernement du Quebec/CN=OCSP Responder de l'ICP du Gouvernement du Quebec" \
    -passin file:$OCSP_PASSWORD_FILE

# Sign OCSP responder certificate
openssl ca -batch -config $CQEN_CONF \
    -extensions ocsp -days 3650 -notext -md sha512 \
    -in $CQEN_DIR/csr/ocsp.csr.pem \
    -out $CQEN_DIR/certs/ocsp.cert.cer \
    -passin file:$CQEN_PASSWORD_FILE

# Copy the OCSP certificate into cacerts
cp $CQEN_DIR/certs/ocsp.cert.cer $ROOT/cacerts/ocsp.cert.cer

echo -e "\033[31m Certificate du OCSP responder de l'ICP du Gouvernement du Quebec créé avec succès.\033[0m"

#EOF
