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
ACRACINE="ACRacineCQENExpV1"
ACINTERNE="ACIntermediaireCQENExpV1" 
AC_INTERMEDIAIRE_HOME=$(cd ../ && pwd)/ACIntermediaire

echo "AC Intermediaire: " $AC_INTERMEDIAIRE_HOME
openssl req -new -config etc/$ACINTERNE.cnf -out ca/csr/$ACINTERNE.csr -keyout ca/private/$ACINTERNE.key
openssl ca -create_serial -config etc/$ACRACINE.cnf -in ca/csr/$ACINTERNE.csr -out certs/$ACINTERNE.crt -extensions signing_ca_ext
#
openssl crl2pkcs7 -nocrl -certfile certs/$ACINTERNE.crt -certfile certs/$ACRACINE.crt -out certs/$ACINTERNE-chain.p7s -outform der
#
# Copier les objets cryptographiques au répertoire de l'AC Intermediaire
echo "Réalise la copie des objets cryptographiques vers le repositoire de l'AC Intermediaire"
cp ca/csr/$ACINTERNE.csr        $AC_INTERMEDIAIRE_HOME/ca/csr/$ACINTERNE.csr           # Demande
cp ca/private/$ACINTERNE.key    $AC_INTERMEDIAIRE_HOME/ca/private/$ACINTERNE.key       # Clé privée
cp certs/$ACINTERNE.crt         $AC_INTERMEDIAIRE_HOME/certs/$ACINTERNE.crt            # Certificat 
cp certs/$ACRACINE.crt          $AC_INTERMEDIAIRE_HOME/certs/$ACRACINE.crt             # Certificat racine
cp certs/$ACINTERNE-chain.p7s   $AC_INTERMEDIAIRE_HOME/certs/$ACINTERNE-chain.p7s      # Certificat racine

# EOF