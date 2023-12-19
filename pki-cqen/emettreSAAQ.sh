#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Exp V1                ***
# ************************************************************
# Génère la demande d'émission de certificat (CSR) et émet le certificat de l'AC SAAQ.  
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-10-30
#
#
# Definition des prefixes et vars utilisées 
ACINTERNE="ACIntermediaireCQENExpV1"
ACSAAQ="ACSAAQmDLExpV1"
AC_SAAQ_HOME=$(cd ../ && pwd)/ACSAAQ


# Génère le pair de clés ECDSA 
    echo "Génération du pair de clés ECDSA"
    openssl ecparam -genkey -name secp256k1 -noout -out ./ca/private/$ACSAAQ.pem
    openssl ec -in ./ca/private/$ACSAAQ.pem -out ./ca/private/$ACSAAQ.key -aes256


    echo "Génération de la demande de certificat (CSR)"
    openssl req -new -config etc/$ACSAAQ.cnf -out ./ca/csr/$ACSAAQ.csr -sha256 -key ./ca/private/$ACSAAQ.key 

# Émet le certificat numérique 
    echo "Émission du certificat auto-signé de l'AC Intermediaire" 
    openssl ca -create_serial -config etc/$ACINTERNE.cnf -in ca/csr/$ACSAAQ.csr -out certs/$ACSAAQ.crt -extensions signing_ca_ext

# Clean-up de la clé privée non chiffrée
    echo "Nettoyage: remove le fichier de clés non chiffré"
    rm ./ca/private/$ACSAAQ.pem

# Création du fichier bundle de certification 
    openssl crl2pkcs7 -nocrl -certfile certs/$ACSAAQ.crt -certfile certs/$ACINTERNE.crt -out certs/$ACSAAQ-chain.p7s -outform der
#
# Copier les objets cryptographiques au répertoire de l'AC SAAQ
    echo "Réalise la copie des objets cryptographiques vers le repositoire de l'AC SAAQ"
    cp ca/csr/$ACSAAQ.csr       $AC_SAAQ_HOME/ca/csr/$ACSAAQ.csr           # Demande
    cp ca/private/$ACSAAQ.key   $AC_SAAQ_HOME/ca/private/$ACSAAQ.key       # Clé privée
    cp certs/$ACSAAQ.crt        $AC_SAAQ_HOME/certs/$ACSAAQ.crt            # Certificat
    cp certs/$ACINTERNE.crt     $AC_SAAQ_HOME/certs/$ACINTERNE.crt         # Certificat racine
    cp certs/$ACSAAQ-chain.p7s  $AC_SAAQ_HOME/certs/$ACSAAQ-chain.p7s      # Certificat racine
#
# EOF
