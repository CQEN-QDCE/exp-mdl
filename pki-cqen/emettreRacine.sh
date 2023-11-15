#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Dev V1                ***
# ************************************************************
# Génère la demande d'émission de certificat (CSR) et émet le certificat de l'AC Racine.  
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-10-30
#
ACRAIZ="ACRacineCQENExpV1"

openssl req -new -config etc/$ACRAIZ.cnf -out ca/csr/$ACRAIZ.csr -keyout ca/private/$ACRAIZ.key
openssl ca -selfsign -config etc/$ACRAIZ.cnf -in ca/csr/$ACRAIZ.csr -out certs/$ACRAIZ.crt -extensions root_ca_ext
#
# EOF
