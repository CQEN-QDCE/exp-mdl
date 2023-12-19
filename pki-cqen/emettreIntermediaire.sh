#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Exp V1                ***
# ************************************************************
# Génère la demande d'émission de certificat (CSR) et émet le certificat de l'AC Intermediaire.  
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-10-30
#
#
# Definition des prefixes et vars utilisées 
ACRACINE="ACRacineCQENExpV1"
ACINTERNE="ACIntermediaireCQENExpV1" 
ACSAAQ="ACSAAQmDLExpV1"
AC_INTERMEDIAIRE_HOME=$(cd ../ && pwd)/ACIntermediaire

# Génère le pair de clés ECDSA 
    echo "Génération du pair de clés ECDSA"
    openssl ecparam -genkey -name secp256k1 -noout -out ./ca/private/$ACINTERNE.pem
    openssl ec -in ./ca/private/$ACINTERNE.pem -out ./ca/private/$ACINTERNE.key -aes256

    echo "Génération de la demande de certificat (CSR)"
    openssl req -new -config etc/$ACINTERNE.cnf -out ./ca/csr/$ACINTERNE.csr -sha256 -key ./ca/private/$ACINTERNE.key 

# Émet le certificat numérique 
    echo "Émission du certificat auto-signé de l'AC Intermediaire" 
    openssl ca -create_serial -config etc/$ACRACINE.cnf -in ca/csr/$ACINTERNE.csr -out certs/$ACINTERNE.crt -extensions signing_ca_ext

# Clean-up de la clé privée non chiffrée
    echo "Nettoyage: remove le fichier de clés non chiffré"
    rm ./ca/private/$ACINTERNE.pem

# Création du fichier bundle de certification  
    openssl crl2pkcs7 -nocrl -certfile certs/$ACINTERNE.crt -certfile certs/$ACRACINE.crt -out certs/$ACINTERNE-chain.p7s -outform der
#
# Copier les objets cryptographiques au répertoire de l'AC Intermediaire
    echo "Réalise la copie des objets cryptographiques vers le repositoire de l'AC Intermediaire"
    cp ca/csr/$ACINTERNE.csr        $AC_INTERMEDIAIRE_HOME/ca/csr/$ACINTERNE.csr           # Demande
    cp ca/private/$ACINTERNE.key    $AC_INTERMEDIAIRE_HOME/ca/private/$ACINTERNE.key       # Clé privée
    cp certs/$ACINTERNE.crt         $AC_INTERMEDIAIRE_HOME/certs/$ACINTERNE.crt            # Certificat 
    cp certs/$ACRACINE.crt          $AC_INTERMEDIAIRE_HOME/certs/$ACRACINE.crt             # Certificat racine
    cp certs/$ACINTERNE-chain.p7s   $AC_INTERMEDIAIRE_HOME/certs/$ACINTERNE-chain.p7s      # Certificat racine

    cp ca/private/$ACINTERNE.key    $AC_INTERMEDIAIRE_HOME/ca/private/$ACINTERNE.key       # Clé privée
    cp certs/$ACINTERNE.crt         $AC_INTERMEDIAIRE_HOME/certs/$ACINTERNE.crt            # Certificat 
#
# EOF