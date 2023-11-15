#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Dev V1                ***
# ************************************************************
# Configuration de la structure de la PKI de l'Autorité de Certification CQEN. 
# Environnement de développement. 
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-10-30
#
BASE=$(pwd)

# Change les permissions des scripts 
chmod +x *.sh

echo "\e[32m[+] Configuration de la structure de l'AC Racine \e[39m"
mkdir -p $BASE/ACRacine
cp remove.sh ./ACRacine
cp setupRacine.sh             ./ACRacine
cp emettreRacine.sh           ./ACRacine
cp emettreIntermediaire.sh    ./ACRacine
cp emettreSAAQ.sh             ./ACRacine

cd $BASE/ACRacine
echo "[.] Clean ..."
./remove.sh
echo "[.] Créér structure ..."
./setupRacine.sh

cp ACRacineCQENExpV1.cnf ./ACRacine/etc/

echo "\e[32m[+] Configuration de la structure de l'AC Intermediaire \e[39m"
cd $BASE
mkdir -p $BASE/ACIntermediaire
cp ./remove.sh ./ACIntermediaire
cp ./setupIntermediaire.sh ./ACIntermediaire
cp ./usager.sh             ./ACIntermediaire

cd $BASE/ACIntermediaire
echo "[.] Clean ..."
./remove.sh
echo "[.] Créér structure ..."
./setupIntermediaire.sh

echo "\e[32m[+] Configuration de la structure de l'AC SAAQ mDL \e[39m"
cd $BASE 
mkdir -p $BASE/ACSAAQ
cp ./remove.sh ./ACSAAQ
cp ./setupSAAQmDL.sh ./ACSAAQ
cd $BASE/ACSAAQ
echo "[.] Clean ..."
./remove.sh
echo "[.] Cria estrutura ..."
./setupSAAQmDL.sh

# Copier les fichiers de configuration des autorités de certification
cd $BASE
cp ACRacineCQENExpV1.cnf           ./ACRacine/etc/
cp ACIntermediaireCQENExpV1.cnf    ./ACRacine/etc/
cp ACIntermediaireCQENExpV1.cnf    ./ACIntermediaire/etc/
cp ACSAAQmDLExpV1.cnf              ./ACRacine/etc/
cp ACSAAQmDLExpV1.cnf              ./ACSAAQ/etc/
cp usager.cnf                      ./ACIntermediaire/etc/
cp usager.cnf                      ./ACSAAQ/etc/

echo "[+] Émission des certificats des autorités de certification ..."

cd $BASE/ACRacine

echo "[..] Émettre certificat auto-signé ..."
./emettreRacine.sh

echo "[..] Émettre certificat AC Intermediaire Intermediaire ..."
./emettreIntermediaire.sh

echo "[..] Émettre certificat AC Intermediaire SAAQ ..."
./emettreSAAQ.sh

echo "[-] Fin de la configuration des ACs ."

echo "FIN DE PROGRAMME"

# EOF