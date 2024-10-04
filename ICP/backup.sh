#!/bin/bash

source base.params 
BKP_HOME=$PROJECT_HOME$PROJECT_BKP_HOME

echo "===== Configurations actives pour le script:backup.sh =====" 
echo "Vars du fichier base.params.env" 
echo "    PROJECT_HOME:         $PROJECT_HOME"
echo "    PROJECT_BKP_HOME:     $PROJECT_BKP_HOME"
echo "    PROJECT_SRC_HOME:     $PROJECT_SRC_HOME" 
echo "    PKI_HOME:             $PKI_HOME"

exit 1

mkdir -p $BKP_HOME/ca/root/config
mkdir -p $BKP_HOME/ca/cqen/config
mkdir -p $BKP_HOME/ca/saaq/config
mkdir -p $BKP_HOME/scripts

cp -r $PKI_HOME/ca/root/config  $BKP_HOME/ca/root/
cp -r $PKI_HOME/ca/cqen/config  $BKP_HOME/ca/cqen/
cp -r $PKI_HOME/ca/saaq/config  $BKP_HOME/ca/saaq/
cp -r $PKI_HOME/ca/root/scripts $BKP_HOME/ca/root/
cp -r $PKI_HOME/ca/cqen/scripts $BKP_HOME/ca/cqen/
cp -r $PKI_HOME/ca/saaq/scripts $BKP_HOME/ca/saaq/
cp -r $PKI_HOME/scripts         $BKP_HOME

#EOF
