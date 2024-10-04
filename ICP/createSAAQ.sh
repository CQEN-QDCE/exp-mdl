#!/bin/bash

source base.params
source root.params 
source saaq.params

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
echo "Vars du fichier saaq.params.env" 
echo "    SAAQ_ROOT:            $SAAQ_ROOT"
echo "    SAAQ_CONF:            $SAAQ_CONF"
echo "    SAAQ_PASSWORD_FILE:   $SAAQ_PASSWORD_FILE"
echo "    SAAQ_CN:              $SAAQ_CN"
echo "    SAAQ_OCSP_URL:        $SAAQ_OCSP_URL"
echo "    SAAQ_CRL_URL:         $SAAQ_CRL_URL"
echo " " 

# Create necessary directories and files
mkdir -p $SAAQ_ROOT/{certs,crl,newcerts,private,db}
chmod 700 $SAAQ_ROOT/private
touch $SAAQ_ROOT/db/index.txt
echo 1000 > $SAAQ_ROOT/db/serial
echo 1000 > $SAAQ_ROOT/db/crlnumber

# Generate SAAQ CA key
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $SAAQ_ROOT/private/saaq.key -passout file:$SAAQ_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: openssl ecparam error generation of keys \033[0m"
    exit 1
fi

# Generate CSR for SAAQ CA
openssl req -config $SAAQ_CONF -new -sha512 \
    -key $SAAQ_ROOT/private/saaq.key \
    -out $SAAQ_ROOT/csr/saaq.csr \
    -subj "$SAAQ_CN" \
    -passin file:$SAAQ_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: openssl request generation error \033[0m"
    exit 2
fi

# Sign SAAQ CA certificate with Root CA
openssl ca -batch -config $ROOT_CONF \
    -extensions v3_ca \
    -days 1825 -notext -md sha512 \
    -in $SAAQ_ROOT/csr/saaq.csr \
    -out $SAAQ_ROOT/certs/saaq.cer \
    -passin file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: openssl ca certificate issuance \033[0m"
    exit 3
fi

# Copy CA cert to CACerts dir sous le nom ACSAAQDevV1.cer
cp $SAAQ_ROOT/certs/saaq.cer $PKI_HOME/cacerts/ACSAAQDevV1.cer

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: copy of certificate \033[0m"
    exit 4
fi

# Create the chain bundle file  
openssl crl2pkcs7 -nocrl -certfile $PKI_HOME/cacerts/ACSAAQDevV1.cer -certfile $PKI_HOME/cacerts/ACRacineGouvQCDevV1.cer  -out $PKI_HOME/cacerts/ACSAAQDevV1-CHAIN.p7s -outform der

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: openssl crlpkcs7 ca certificate bundling \033[0m"
    exit 5
fi

# Generate initial CRL
openssl ca -config $SAAQ_CONF -gencrl -out $SAAQ_ROOT/crl/saaq.crl -extensions v3_intermediate_ca -passin file:$SAAQ_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: openssl ca certificate issuance \033[0m"
    exit 6
fi

echo -e "\033[32m AC SAAQ Dev v1 créé avec succès.\033[0m"

#EOF
