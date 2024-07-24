#!/bin/bash
# 
HOME="</home/dir/a/la/racine/du/projet>"
ROOT="$HOME/icpGouvQC"
ROOT_DIR="$HOME/icpGouvQC/ca/root"
INT_DIR="$HOME/icpGouvQC/ca/cqen"
ROOT_CONF="$ROOT_DIR/config/openssl.conf"
INT_CONF="$INT_DIR/config/openssl.conf"
ROOT_PASSWORD_FILE="$ROOT_DIR/private/ca_password.txt"
INT_PASSWORD_FILE="$INT_DIR/private/ca_password.txt"

# Create necessary directories and files
mkdir -p $INT_DIR/{certs,crl,newcerts,private,db}
chmod 700 $INT_DIR/private
touch $INT_DIR/db/index.txt
echo 1000 > $INT_DIR/db/serial
echo 1000 > $INT_DIR/db/crlnumber

# Generate CQEN key
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $INT_DIR/private/cqen.key -passout file:$INT_PASSWORD_FILE

# Generate CSR for cqen CA
openssl req -config $INT_CONF -new -sha512 \
    -key $INT_DIR/private/cqen.key \
    -out $INT_DIR/csr/cqen.csr \
    -subj "/C=CA/ST=QC/O=Gouvernement du Quebec/CN=Autorite de Certification Intermediaire CQEN Dev v1" \
    -passin file:$INT_PASSWORD_FILE

# Sign CQEN certificate with root CA
openssl ca -batch -config $ROOT_CONF \
    -extensions v3_ca \
    -days 3650 -notext -md sha512 \
    -in $INT_DIR/csr/cqen.csr \
    -out $INT_DIR/certs/cqen.cer \
    -passin file:$ROOT_PASSWORD_FILE

# Copy CA cert to CACerts dir sous le nom ACInterCQENDevV1.cer
cp $INT_DIR/certs/cqen.cer $ROOT/cacerts/ACInterCQENDevV1.cer

# Create the chain bundle file 
openssl crl2pkcs7 -nocrl -certfile $ROOT/cacerts/ACInterCQENDevV1.cer -certfile $ROOT/cacerts/ACRacineGouvQCDevV1.cer -out $ROOT/cacerts/ACInterCQENDevV1.cer-CHAIN.p7s -outform der

# Generate initial CRL
openssl ca -config $INT_CONF -gencrl -out $INT_DIR/crl/cqen.crl -passin file:$INT_PASSWORD_FILE

echo -e "\033[31m AC Intermediaire CQEN Dev v1 créé avec succès.\033[0m"

#EOF
