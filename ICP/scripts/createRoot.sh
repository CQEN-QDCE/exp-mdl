#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
ROOT="$HOME/icpGouvQC"
ROOT_DIR="$HOME/icpGouvQC/ca/root"
CONF="$ROOT_DIR/config/openssl.conf"
PASSWORD_FILE="$ROOT_DIR/private/ca_password.txt"

# Create necessary directories and files
mkdir -p $ROOT_DIR/{certs,crl,newcerts,private,db}
chmod 700 $ROOT_DIR/private
touch $ROOT_DIR/db/index.txt
echo 1000 > $ROOT_DIR/db/serial
echo 1000 > $ROOT_DIR/db/crlnumber

# Generate root key
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $ROOT_DIR/private/ca.key -passout file:$PASSWORD_FILE

# Generate root certificate
openssl req -config $CONF -new -x509 -sha512 -extensions v3_ca \
    -key $ROOT_DIR/private/ca.key \
    -out $ROOT_DIR/certs/ca.cer \
    -days 7300 \
    -subj "/C=CA/ST=QC/O=Gouvernement du Quebec/CN=Autorite de Certification Racine du Gouvernement Quebec Dev v1" \
    -passin file:$PASSWORD_FILE

# Generate initial CRL
openssl ca -config $CONF -gencrl -out $ROOT_DIR/crl/ca.crl -passin file:$PASSWORD_FILE

# Copy CA cert to CACerts dir sous le nom ACRacineGouvQCDevV1.cer
cp $ROOT_DIR/certs/ca.cer $ROOT/cacerts/ACRacineGouvQCDevV1.cer

echo -e "\033[31m AC Racine du Gouvernement du Québec créé avec succès.\033[0m"
#EOF
