#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Exp V1                ***
# ************************************************************
# Génère la demande d'émission de certificat (CSR) et émet le certificat de l'AC SAAQ.  
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-11-28
#
#
# Definition des prefixes et vars utilisées 
ACINTERNE="ACIntermediaireCQENExpV1"
ACXROAD="ACXRoadExpV1"
ACXROAD_HOME=$(cd ../ && pwd)/ACXRoad


# Génère le pair de clés ECDSA 
    echo "Génération du pair de clés ECDSA"
    openssl ecparam -genkey -name secp256k1 -noout -out ./ca/private/$ACXROAD.pem
    openssl ec -in ./ca/private/$ACXROAD.pem -out ./ca/private/$ACXROAD.key -aes256


    echo "Génération de la demande de certificat (CSR)"
    openssl req -new -config etc/$ACXROAD.cnf -out ./ca/csr/$ACXROAD.csr -sha256 -key ./ca/private/$ACXROAD.key 

# Émet le certificat numérique 
    echo "Émission du certificat auto-signé de l'AC Intermediaire" 
    openssl ca -create_serial -config etc/$ACINTERNE.cnf -in ca/csr/$ACXROAD.csr -out certs/$ACXROAD.crt -extensions signing_ca_ext

# Clean-up de la clé privée non chiffrée
    echo "Nettoyage: remove le fichier de clés non chiffré"
    rm ./ca/private/$ACXROAD.pem

# Création du fichier bundle de certification 
    openssl crl2pkcs7 -nocrl -certfile certs/$ACXROAD.crt -certfile certs/$ACINTERNE.crt -out certs/$ACXROAD-chain.p7s -outform der
#
# Copier les objets cryptographiques au répertoire de l'AC SAAQ
    echo "Réalise la copie des objets cryptographiques vers le repositoire de l'AC SAAQ"
    cp ca/csr/$ACXROAD.csr       $ACXROAD_HOME/ca/csr/$ACXROAD.csr           # Demande
    cp ca/private/$ACXROAD.key   $ACXROAD_HOME/ca/private/$ACXROAD.key       # Clé privée
    cp certs/$ACXROAD.crt        $ACXROAD_HOME/certs/$ACXROAD.crt            # Certificat
    cp certs/$ACINTERNE.crt      $ACXROAD_HOME/certs/$ACINTERNE.crt          # Certificat racine
    cp certs/$ACXROAD-chain.p7s  $ACXROAD_HOME/certs/$ACXROAD-chain.p7s      # Certificat racine
#
# EOF
