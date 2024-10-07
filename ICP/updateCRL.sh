#!/bin/bash

source base.params
source root.params 
source cqen.params
source saaq.params
source utils.sh

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
echo "Vars du fichier saaq.params.env" 
echo "    SAAQ_ROOT:            $SAAQ_ROOT"
echo "    SAAQ_CONF:            $SAAQ_CONF"
echo "    SAAQ_PASSWORD_FILE:   $SAAQ_PASSWORD_FILE"
echo "    SAAQ_CN:              $SAAQ_CN"
echo "    SAAQ_OCSP_URL:        $SAAQ_OCSP_URL"
echo "    SAAQ_CRL_URL:         $SAAQ_CRL_URL"
echo " " 

# Update Root CA CRL
echolor $COLOR_BLUE "Update Root CA CRL"
openssl ca -config $ROOT_CONF -gencrl -out $PKI_ROOT/crl/ca.crl -passin file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: update ROOT crl \033[0m"
    exit 1
fi

# Update IntermeCQENdiate CA CRL
echolor $COLOR_BLUE "Update IntermeCQENdiate CA CRL"
openssl ca -config $CQEN_CONF -gencrl -out $CQEN_ROOT/crl/cqen.crl -passin file:$CQEN_PASSWORD_FILE
retVal=$?

if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: update CQEN crl \033[0m"
    exit 2
fi

# Update SAAQ CA CRL
echolor $COLOR_BLUE "Update SAAQ CA CRL"
openssl ca -config $SAAQ_CONF -gencrl -out $SAAQ_ROOT/crl/saaq.crl -passin file:$SAAQ_PASSWORD_FILE
retVal=$?

if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: update SAAQ crl \033[0m"
    exit 3
fi

echo -e "\033[32mToutes les CRLs ont été mises èà jour avec succès.\033[0m"
