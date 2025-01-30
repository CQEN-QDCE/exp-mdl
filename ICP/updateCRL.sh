#!/bin/bash

source base.params
source root.params 
source cqen.params
source xroad.params
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
echo "    XROAD_ROOT:            $XROAD_ROOT"
echo "    XROAD_CONF:            $XROAD_CONF"
echo "    XROAD_PASSWORD_FILE:   $XROAD_PASSWORD_FILE"
echo "    XROAD_CN:              $XROAD_CN"
echo "    XROAD_OCSP_URL:        $XROAD_OCSP_URL"
echo "    XROAD_CRL_URL:         $XROAD_CRL_URL"
echo " " 

# Update Root CA CRL
echolor $COLOR_BLUE "Update Root CA CRL"
openssl ca -config $ROOT_CONF -gencrl -out $PKI_ROOT/crl/ca.crl -passin file:$ROOT_PASSWORD_FILE

retVal=$?
if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: update ROOT crl \033[0m"
    exit 1
fi

# Update Intermediate CQEN CA CRL
echolor $COLOR_BLUE "Update IntermeCQENdiate CA CRL"
openssl ca -config $CQEN_CONF -gencrl -out $CQEN_ROOT/crl/cqen.crl -passin file:$CQEN_PASSWORD_FILE
retVal=$?

if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: update CQEN crl \033[0m"
    exit 2
fi

# Update Intermediate XROAD CA CRL
echolor $COLOR_BLUE "Update XROAD CA CRL"
openssl ca -config $XROAD_CONF -gencrl -out $XROAD_ROOT/crl/cqen.crl -passin file:$XROAD_PASSWORD_FILE
retVal=$?

if [ $retVal -ne 0 ]; then
    echo -e "\033[31m Error: update XROAD crl \033[0m"
    exit 2
fi

# Update SAAQ CA CRL
#echolor $COLOR_BLUE "Update SAAQ CA CRL"
#openssl ca -config $SAAQ_CONF -gencrl -out $SAAQ_ROOT/crl/saaq.crl -passin file:$SAAQ_PASSWORD_FILE
#retVal=$?

#if [ $retVal -ne 0 ]; then
#    echo -e "\033[31m Error: update SAAQ crl \033[0m"
#    exit 3
#fi

echo -e "\033[32mToutes les CRLs ont été mises èà jour avec succès.\033[0m"
