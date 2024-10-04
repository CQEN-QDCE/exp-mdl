#!/bin/bash

source base.params
source root.params 
source cqen.params

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
echo "Vars du fichier cqen.params.env" 
echo "    CQEN_ROOT:            $CQEN_ROOT"
echo "    CQEN_CONF:            $CQEN_CONF"
echo "    CQEN_PASSWORD_FILE:   $CQEN_PASSWORD_FILE"
echo "    CQEN_CN:              $CQEN_CN"
echo "    CQEN_OCSP_URL:        $CQEN_OCSP_URL"
echo "    CQEN_CRL_URL:         $CQEN_CRL_URL"
echo " " 

# Create necessary directories and files
mkdir -p    $CQEN_ROOT/{certs,crl,newcerts,private,db}
chmod 700   $CQEN_ROOT/private
touch       $CQEN_ROOT/db/index.txt
echo 1000 > $CQEN_ROOT/db/serial
echo 1000 > $CQEN_ROOT/db/crlnumber

# Generate CQEN key
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $CQEN_ROOT/private/cqen.key -passout file:$CQEN_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Generate CSR for cqen CA
openssl req -config $CQEN_CONF -new -sha512 \
    -key $CQEN_ROOT/private/cqen.key \
    -out $CQEN_ROOT/csr/cqen.csr \
    -subj "$CQEN_CN" \
    -passin file:$CQEN_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Sign CQEN certificate with root CA
openssl ca -batch -config $ROOT_CONF \
    -extensions v3_ca \
    -days 3650 -notext -md sha512 \
    -in $CQEN_ROOT/csr/cqen.csr \
    -out $CQEN_ROOT/certs/cqen.cer \
    -passin file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Copy CA cert to CACerts dir sous le nom ACInterCQENDevV1.cer
cp $CQEN_ROOT/certs/cqen.cer $PKI_HOME/cacerts/ACInterCQENDevV1.cer

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Create the chain bundle file 
openssl crl2pkcs7 -nocrl -certfile $PKI_HOME/cacerts/ACInterCQENDevV1.cer -certfile $PKI_HOME/cacerts/ACRacineGouvQCDevV1.cer -out $PKI_HOME/cacerts/ACInterCQENDevV1.cer-CHAIN.p7s -outform der

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

cat $PKI_HOME/cacerts/ACInterCQENDevV1.cer $PKI_HOME/cacerts/ACRacineGouvQCDevV1.cer > $PKI_HOME/cacerts/ACInterCQENDevV1.cer-CHAIN.pem

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'cat bundle ' \033[0m"
    exit 1
fi

# Generate initial CRL
openssl ca -config $CQEN_CONF -gencrl -out $CQEN_ROOT/crl/cqen.crl -passin file:$CQEN_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

echo -e "\033[32m AC Intermediaire CQEN Dev v1 créé avec succès.\033[0m"

#EOF
