#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Exp V1                ***
# ************************************************************
# Émission de certificat pour un usager final, de l'AC Intermediaire CQEN. 
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2003-10-30
#
#
set -e

SCRIPT_HOME="$(cd "$(dirname "$0")" && pwd)"
ACRACINE="ACRacineCQENExpV1"
ACINTER="ACIntermediaireCQENExpV1"

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

usage() {
  cat <<-EOF


      Usage: $0 [command] [parms]
    
      commands: 

          demande <nom>
              Créér une CSR pour la demande d'un nouvel certificat.
          
          emettre <nom> 
              Genèrer un numéro de série et emet le certificat.
  
          emettreP12 <nom>  
              Genèrer un numéro de série et emet le certificat; exporte le resultat en format PKCS#12.

          usage 
              Affiche cette page d'aide. 

      parms:
      
          nom - nom de reference que sera utilisé pour la genération de la CSR et sera utilisé pour nommer 
                les objets cryptographiques qui seront générés (csr, keys, db, crt, pem, etc).  

EOF
  exit 1
}

demande(){
# Créér une CSR pour la demande d'un nouvel certificat.
    echo "Générer demande de certificat pour " $PARM
    openssl req -new -utf8 -config etc/usager.cnf -out ./ca/csr/$PARM.csr -keyout ./ca/private/$PARM.key
}

emettre(){
# Genèrer un numéro de série et emet le certificat.
    echo "Emettre certificat pour " $PARM

    echo "Calcule le serial number du certificat, basé sur la CSR"
    getSerialNumberHash

    openssl ca -create_serial -config etc/usager.cnf -in ca/csr/$PARM.csr -out certs/users/$PARM.crt -extensions usuario_reqext

    openssl crl2pkcs7 -nocrl -certfile certs/users/$PARM.crt -certfile certs/$ACINTER.crt -certfile certs/$ACRACINE.crt -out certs/users/$PARM-chain.p7s -outform der

}

getSerialNumberHash(){
  case $SO in
          1 | 2)
              SERNUM=$(openssl dgst -sha1 <<< ca/csr/$PARM.csr)
              read -ra TEMP <<< $SERNUM
              echo ${TEMP[1]} > $AC_SIGLA.crt.srl
              SERNUM=${TEMP[1]}
              ;;
          3)
              SERNUM=$(openssl dgst -sha1 <<< ca/csr/$PARM.csr)
              ;;
  esac

  echo $SERNUM > ca/db/$AC_SIGLA.crt.srl
}

toLower() {
  echo $(echo ${@} | tr '[:upper:]' '[:lower:]')
}

pushd $SCRIPT_HOME > /dev/null
COMMAND=$(toLower ${1})
PARM=${2}

if [ -z $PARM ]
then
    usage
else 
    case "$COMMAND" in 
    demande)
      demande
      ;;
    emettre)
      emettre
      ;;
    emettreP12)
      emettreP12
      ;;
    *) 
      usage
      ;;
    esac
fi

popd > /dev/null