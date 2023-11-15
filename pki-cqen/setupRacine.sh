#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Exp V1                ***
# ************************************************************
# Configuration de la structure de l'AC Racine. 
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2003-10-30
#
ACRAIZ=$(pwd)
AC_SIGLA="ACRacineCQENExpV1"

# Determine le type de sistème d'explotation 
case $OSTYPE in 
    [wW]indows* | [mM]sys*) 
        SO=1
        ;;
    [lL]inux*)
        SO=2
        ;;
    [dD]arwin* | [mM]ac*)
        SO=3
        ;;
    *) 
        SO=0
        echo "ERREUR: Système d'explotation non identifié. Quitte l'app."
        exit -1
        ;;
esac 

# Créé la structure de repertoires de l'AC
mkdir -p ca certs certs/users crl etc ca/csr ca/db ca/private

# Initialise elements de données 
cp /dev/null ca/db/$AC_SIGLA.db
cp /dev/null ca/db/$AC_SIGLA.db.attr
cp /dev/null ca/db/$AC_SIGLA.crt.srl 
echo "01"    ca/db/$AC_SIGLA.crl.srl

# Pour faire la génération du numéro de série initial, on calcule le hash du nom de l'AC, et l'on 
# copie dans le fichier de serial number. Ceci est la façon d'avoir un serial number qui soit suffisament 
# long pour chaque nouveau certificat. 
# Ancienne version: echo 01 > ca/db/$AC_SIGLA.crt.srl 

case $SO in
        1 | 2)
            echo "Configure le système d'explotation: Win / Linux"
            SERNUM=$(openssl dgst -sha1 <<< $AC_SIGLA)
            read -ra TEMP <<< $SERNUM
            echo ${TEMP[1]} > $AC_SIGLA.crt.srl
            SERNUM=${TEMP[1]}
            ;;
        3)
            echo "Configure le système d'explotation: Mac"
            SERNUM=$(openssl dgst -sha1 <<< $AC_SIGLA)
            ;;
esac
echo $SERNUM > ca/db/$AC_SIGLA.crt.srl

# Protège le repertoire de la clé privée
chmod 700 ca/private 

#EOF