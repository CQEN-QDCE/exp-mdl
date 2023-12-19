#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Exp V1                ***
# ************************************************************
# Reinitialize la structure de la PKI CQEN. 
# Environnement de développement.
# 
# ATTENTION! # ATTENTION! # ATTENTION! # ATTENTION! # ATTENTION! # ATTENTION! # ATTENTION! 
# Ne pas déployer ce script en environnements d'acceptation ou de production!!! 
# ATTENTION! # ATTENTION! # ATTENTION! # ATTENTION! # ATTENTION! # ATTENTION! # ATTENTION! 
# 
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-10-31
#
BASE=$(pwd)

echo "Remove objets de l'AC Racine"
cd $BASE/ACRacine
./remove.sh

echo "Remove objets de l'AC Interne"
cd $BASE/ACIntermediaire
./remove.sh

echo "Remove objets de l'SAAQ"
cd $BASE/ACSAAQ
./remove.sh

cd $BASE

echo "Clean finalizado"

# EOF