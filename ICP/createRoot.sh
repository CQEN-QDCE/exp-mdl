#!/bin/bash

source base.params
source root.params 

echo -e "\033[32m===== Configurations actives pour le script: [${0##*/}] =====\033[0m" 
echo "Vars du fichier base.params.env" 
echo "    PROJECT_HOME:         $PROJECT_HOME"
echo "    PROJECT_BKP_HOME:     $PROJECT_BKP_HOME"
echo "    PROJECT_SRC_HOME:     $PROJECT_SRC_HOME" 
echo "    PKI_HOME:             $PKI_HOME"
echo "Vars du fichier root.params.env" 
echo "    PKI_ROOT:             $PKI_ROOT"
echo "    ROOT_CONF:            $ROOT_CONF"
echo "    ROOT_PASSWORD_FILE:   $ROOT_PASSWORD_FILE"
echo "    ROOT_CN:              $ROOT_CN"
echo "    ROOT_OCSP_URL:        $ROOT_OCSP_URL"
echo "    ROOT_CRL_URL:         $ROOT_CRL_URL"
echo " " 

# Create necessary directories and files
mkdir -p $PKI_ROOT/{certs,crl,newcerts,private,db}
chmod 700 $PKI_ROOT/private
touch $PKI_ROOT/db/index.txt
echo 1000 > $PKI_ROOT/db/serial
echo 1000 > $PKI_ROOT/db/crlnumber

# Generate root key
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $PKI_ROOT/private/ca.key -passout file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Generate root certificate
openssl req -config $ROOT_CONF -new -x509 -sha256 -extensions v3_ca \
    -key $PKI_ROOT/private/ca.key \
    -out $PKI_ROOT/certs/ca.cer \
    -days 7300 \
    -subj "$ROOT_CN" \
    -passin file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl req' \033[0m"
    exit 1
fi

# Generate initial CRL
openssl ca -config $ROOT_CONF -gencrl -out $PKI_ROOT/crl/ca.crl -passin file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ca' \033[0m"
    exit 2
fi

# Copy CA cert to CACerts dir sous le nom ACRacineGouvQCDevV1.cer
cp $PKI_ROOT/certs/ca.cer $PKI_HOME/cacerts/ACRacineGouvQCDevV1.cer

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: copie du fichier \033[0m"
    exit 3
fi

echo -e "\033[32m AC Racine du Gouvernement du Québec créé avec succès.\033[0m"
#EOF

