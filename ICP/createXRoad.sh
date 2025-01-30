#!/bin/bash

source base.params
source root.params 
source xroad.params

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
echo "Vars du fichier xroad.params.env" 
echo "    XROAD_ROOT:            $XROAD_ROOT"
echo "    XROAD_CONF:            $XROAD_CONF"
echo "    XROAD_PASSWORD_FILE:   $XROAD_PASSWORD_FILE"
echo "    XROAD_CN:              $XROAD_CN"
echo "    XROAD_OCSP_URL:        $XROAD_OCSP_URL"
echo "    XROAD_CRL_URL:         $XROAD_CRL_URL"
echo " " 

# Create necessary directories and files
mkdir -p    $XROAD_ROOT/{certs,config,crl,newcerts,private,db}
chmod 700   $XROAD_ROOT/private
touch       $XROAD_ROOT/db/index.txt
echo 1000 > $XROAD_ROOT/db/serial
echo 1000 > $XROAD_ROOT/db/crlnumber

# Generate XROAD key
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $XROAD_ROOT/private/xroad.key -passout file:$XROAD_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Generate CSR for xroad CA
openssl req -config $XROAD_CONF -new -sha512 \
    -key $XROAD_ROOT/private/xroad.key \
    -out $XROAD_ROOT/csr/xroad.csr \
    -subj "$XROAD_CN" \
    -passin file:$XROAD_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Sign XROAD certificate with root CA
openssl ca -batch -config $ROOT_CONF \
    -extensions v3_ca \
    -days 3650 -notext -md sha512 \
    -in $XROAD_ROOT/csr/xroad.csr \
    -out $XROAD_ROOT/certs/xroad.cer \
    -passin file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Copy CA cert to CACerts dir sous le nom ACInterXROADDevV1.cer
cp $XROAD_ROOT/certs/xroad.cer $PKI_HOME/cacerts/ACInterXRoadDevV1.cer

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Create the chain bundle file 
openssl crl2pkcs7 -nocrl -certfile $PKI_HOME/cacerts/ACInterXRoadDevV1.cer -certfile $PKI_HOME/cacerts/ACRacineGouvQCDevV1.cer -out $PKI_HOME/cacerts/ACInterXRoadDevV1.cer-CHAIN.p7s -outform der

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

cat $PKI_HOME/cacerts/ACInterXRoadDevV1.cer $PKI_HOME/cacerts/ACRacineGouvQCDevV1.cer > $PKI_HOME/cacerts/ACInterXRoadDevV1.cer-CHAIN.pem

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'cat bundle ' \033[0m"
    exit 1
fi

# Generate initial CRL
openssl ca -config $XROAD_CONF -gencrl -out $XROAD_ROOT/crl/xroad.crl -passin file:$XROAD_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

echo -e "\033[32m AC Intermediaire XROAD Dev v1 créé avec succès.\033[0m"

#EOF
