#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
ROOT="$HOME/icpGouvQC"
ROOT_DIR="$HOME/icpGouvQC/ca/root"
SAAQ_DIR="$HOME/icpGouvQC/ca/saaq"
ROOT_CONF="$ROOT_DIR/config/openssl.conf"
SAAQ_CONF="$SAAQ_DIR/config/openssl.conf"
ROOT_PASSWORD_FILE="$ROOT_DIR/private/ca_password.txt"
SAAQ_PASSWORD_FILE="$SAAQ_DIR/private/ca_password.txt"

# Create necessary directories and files
mkdir -p $SAAQ_DIR/{certs,crl,newcerts,private,db}
chmod 700 $SAAQ_DIR/private
touch $SAAQ_DIR/db/index.txt
echo 1000 > $SAAQ_DIR/db/serial
echo 1000 > $SAAQ_DIR/db/crlnumber

# Generate SAAQ CA key
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $SAAQ_DIR/private/saaq.key -passout file:$SAAQ_PASSWORD_FILE

# Generate CSR for SAAQ CA
openssl req -config $SAAQ_CONF -new -sha512 \
    -key $SAAQ_DIR/private/saaq.key \
    -out $SAAQ_DIR/csr/saaq.csr \
    -subj "/C=CA/ST=QC/O=Gouvernement du Quebec/CN=Autorite de Certification SAAQ Dev v1" \
    -passin file:$SAAQ_PASSWORD_FILE

# Sign SAAQ CA certificate with Root CA
openssl ca -batch -config $ROOT_CONF \
    -extensions v3_ca \
    -days 1825 -notext -md sha512 \
    -in $SAAQ_DIR/csr/saaq.csr \
    -out $SAAQ_DIR/certs/saaq.cer \
    -passin file:$ROOT_PASSWORD_FILE

# Copy CA cert to CACerts dir sous le nom ACSAAQDevV1.cer
cp $SAAQ_DIR/certs/saaq.cer $ROOT/cacerts/ACSAAQDevV1.cer

# Create the chain bundle file  
openssl crl2pkcs7 -nocrl -certfile $ROOT/cacerts/ACSAAQDevV1.cer -certfile $ROOT/cacerts/ACRacineGouvQCDevV1.cer  -out $ROOT/cacerts/ACSAAQDevV1-CHAIN.p7s -outform der

# Generate initial CRL
openssl ca -config $SAAQ_CONF -gencrl -out $SAAQ_DIR/crl/saaq.crl -extensions v3_intermediate_ca -passin file:$SAAQ_PASSWORD_FILE

echo -e "\033[31m AC SAAQ Dev v1 créé avec succès.\033[0m"

#EOF
