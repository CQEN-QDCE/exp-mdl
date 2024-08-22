#!/bin/bash

set -e 

source base.params 
source utils.sh

echo $COLOR_GREEN "Configurations actives pour le script: [${0##*/}] " 
echo "Project Home: $PROJECT_HOME"
echo "Project BKP:  $PROJECT_HOME$PROJECT_BKP_HOME"
echo "Project SRC:  $PROJECT_HOME$PROJECT_SRC_HOME"
echo "PKI Home:     $PKI_HOME"

cp -r $PROJECT_HOME$PROJECT_BKP_HOME/ca/root/config/* $PKI_HOME/ca/root/config/.
cp -r $PROJECT_HOME$PROJECT_BKP_HOME/ca/cqen/config/* $PKI_HOME/ca/cqen/config/.
cp -r $PROJECT_HOME$PROJECT_BKP_HOME/ca/saaq/config/* $PKI_HOME/ca/saaq/config/.

cp -r $PROJECT_HOME$PROJECT_BKP_HOME/ca/root/scripts/* $PKI_HOME/ca/root/scripts/.
cp -r $PROJECT_HOME$PROJECT_BKP_HOME/ca/cqen/scripts/* $PKI_HOME/ca/cqen/scripts/.
cp -r $PROJECT_HOME$PROJECT_BKP_HOME/ca/saaq/scripts/* $PKI_HOME/ca/saaq/scripts/.

cp -r $PROJECT_HOME$PROJECT_BKP_HOME/scripts/* $PKI_HOME/scripts/.

echo $COLOR_GREEN "Fichiers restaurés avec succès."

#EOF
