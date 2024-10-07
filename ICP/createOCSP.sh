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
echo "    CQEN_OCSP_PASSWORD_FILE:   $CQEN_OCSP_PASSWORD_FILE"
echo " " 

# Generate OCSP responder key using ECDSA with P-521 curve
openssl ecparam -name secp521r1 -genkey | openssl ec -aes256 -out $CQEN_ROOT/private/ocsp.key.pem -passout file:$CQEN_OCSP_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ecparam' \033[0m"
    exit 1
fi

# Generate CSR for OCSP responder
openssl req -config $CQEN_CONF -new -sha512 \
    -key $CQEN_ROOT/private/ocsp.key.pem \
    -out $CQEN_ROOT/csr/ocsp.csr.pem \
    -subj "/C=CA/ST=QC/O=Gouvernement du Quebec/CN=OCSP Responder de l'ICP du Gouvernement du Quebec" \
    -passin file:$CQEN_OCSP_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl req' \033[0m"
    exit 2
fi

# Sign OCSP responder certificate
openssl ca -batch -config $CQEN_CONF \
    -extensions ocsp -days 3650 -notext -md sha512 \
    -in $CQEN_ROOT/csr/ocsp.csr.pem \
    -out $CQEN_ROOT/certs/ocsp.cert.cer \
    -passin file:$CQEN_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'openssl ca' \033[0m"
    exit 3
fi

# Copy the OCSP certificate into cacerts
cp $CQEN_ROOT/certs/ocsp.cert.cer $PKI_HOME/cacerts/ocsp.cert.cer

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: 'copy' \033[0m"
    exit 4
fi

echo -e "\033[32m Certificate du OCSP responder de l'ICP du Gouvernement du Quebec créé avec succès.\033[0m"

#EOF
