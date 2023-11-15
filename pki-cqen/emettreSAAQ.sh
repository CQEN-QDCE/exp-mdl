#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Dev V1                ***
# ************************************************************
# Génère la demande d'émission de certificat (CSR) et émet le certificat de l'AC SAAQ.  
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-10-30
#
#
ACRACINE="ACRacineCQENExpV1"
ACSAAQ="ACSAAQmDLExpV1"
AC_SAAQ_HOME=$(cd ../ && pwd)/ACSAAQ

echo "AC SAAQ mDL: " $AC_SAAQ
openssl req -new -config etc/$ACSAAQ.cnf -out ca/csr/$ACSAAQ.csr -keyout ca/private/$ACSAAQ.key
openssl ca -create_serial -config etc/$ACRACINE.cnf -in ca/csr/$ACSAAQ.csr -out certs/$ACSAAQ.crt -extensions signing_ca_ext
#
openssl crl2pkcs7 -nocrl -certfile certs/$ACSAAQ.crt -certfile certs/$ACRACINE.crt -out certs/$ACSAAQ-chain.p7s -outform der
#
# Copier les objets cryptographiques au répertoire de l'AC SAAQ
echo "Réalise la copie des objets cryptographiques vers le repositoire de l'AC SAAQ"
cp ca/csr/$ACSAAQ.csr       $AC_SAAQ_HOME/ca/csr/$ACSAAQ.csr           # Demande
cp ca/private/$ACSAAQ.key   $AC_SAAQ_HOME/ca/private/$ACSAAQ.key       # Clé privée
cp certs/$ACSAAQ.crt        $AC_SAAQ_HOME/certs/$ACSAAQ.crt            # Certificat
cp certs/$ACRACINE.crt      $AC_SAAQ_HOME/certs/$ACRACINE.crt          # Certificat racine
cp certs/$ACSAAQ-chain.p7s  $AC_SAAQ_HOME/certs/$ACSAAQ-chain.p7s      # Certificat racine

# EOF
