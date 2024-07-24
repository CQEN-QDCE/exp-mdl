#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
PKI_ROOT="$HOME/icpGouvQC"
ROOT_DIR="$PKI_ROOT/ca/root"
CQEN_DIR="$PKI_ROOT/ca/cqen"
SAAQ_DIR="$PKI_ROOT/ca/saaq"

ROOT_CONF="$ROOT_DIR/config/openssl.conf"
CQEN_CONF="$CQEN_DIR/config/openssl.conf"
SAAQ_CONF="$SAAQ_DIR/config/openssl.conf"

ROOT_PASSWORD_FILE="$ROOT_DIR/private/ca_password.txt"
CQEN_PASSWORD_FILE="$CQEN_DIR/private/ca_password.txt"
SAAQ_PASSWORD_FILE="$SAAQ_DIR/private/ca_password.txt"

# Update Root CA CRL
openssl ca -config $ROOT_CONF -gencrl -out $ROOT_DIR/crl/ca.crl -passin file:$ROOT_PASSWORD_FILE

# Update IntermeCQENdiate CA CRL
openssl ca -config $CQEN_CONF -gencrl -out $CQEN_DIR/crl/cqen.crl -passin file:$CQEN_PASSWORD_FILE

# Update SAAQ CA CRL
openssl ca -config $SAAQ_CONF -gencrl -out $SAAQ_DIR/crl/saaq.crl -passin file:$SAAQ_PASSWORD_FILE

echo "All CRLs updated successfully."
