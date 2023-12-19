#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Exp V1                ***
# ************************************************************
# Génère la demande d'émission de certificat (CSR) et émet le certificat 
# auto-signé de l'AC Racine.  
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-10-30
#
ACRAIZ="ACRacineCQENExpV1"

# Génère le pair de clés ECDSA 
    echo "Génération du pair de clés ECDSA"
    openssl ecparam -genkey -name secp256k1 -noout -out ./ca/private/$ACRAIZ.pem
    openssl ec -in ./ca/private/$ACRAIZ.pem -out ./ca/private/$ACRAIZ.key -aes256
    
    echo "Génération de la demande de certificat (CSR)"
    openssl req -new -config etc/$ACRAIZ.cnf -out ./ca/csr/$ACRAIZ.csr -sha256 -key ./ca/private/$ACRAIZ.key 

# Émet le certificat numérique auto-signé
    echo "Émission du certificat auto-signé de l'AC Racine" 
    # openssl req -new -config etc/$ACRAIZ.cnf -out ca/csr/$ACRAIZ.csr -keyout ca/private/$ACRAIZ.key
    openssl ca -selfsign -config etc/$ACRAIZ.cnf -in ca/csr/$ACRAIZ.csr -out certs/$ACRAIZ.crt -extensions root_ca_ext

# Clean-up de la clé privée non chiffrée
    echo "Nettoyage: remove le fichier de clés non chiffré"
    rm ./ca/private/$ACRAIZ.pem
#
# EOF
