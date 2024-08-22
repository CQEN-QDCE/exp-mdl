#!/bin/bash

source ./base.params
source ./utils.sh

echolor $COLOR_GREEN "Création de la structure de la ICP du Gouvernement du Quebec"
./createPKIStruct.sh
echo " "

echolor $COLOR_GREEN "Copie des fichiers de config et scripts d'opération"
./restore.sh
echo " "

echolor $COLOR_GREEN ">>>>[Émission du certificat de l'Autorité de Certification Racine du Gouvernement du Québec Dev V1"
./createRoot.sh
echo " "
sleep 1

echolor $COLOR_GREEN ">>>>[Émission du certificat de l'Autorité de Certification Intermediaire CQEN Dev V1"
./createCQEN.sh
echo " "
sleep 1

echolor $COLOR_GREEN ">>>>[Émission du certificat de l'Autorité de Certification SAAQ Dev V1"
./createSAAQ.sh
echo " "
sleep 1

echolor $COLOR_GREEN ">>>>[Émission du certificat de du OCSP Responder de l'ICP du Gouvernement du Québec]"
./createOCSP.sh
echo " " 
sleep 1

echolor $COLOR_GREEN ">>>>[Mise à jour des listes de certificat revoqués]"
./updateCRL.sh
echo " " 
sleep 1

echolor $COLOR_GREEN ">>>>[===== FIN DU DEPLOYEMENT DE L'ICP GOUVERNEMENTALE DU QUEBEC =====]"

