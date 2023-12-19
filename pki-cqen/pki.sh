#!/bin/bash
#
# ************************************************************
# *** Autorité de Certification CQEN Exp V1                ***
# ************************************************************
# Configuration de la structure de la PKI de l'Autorité de Certification CQEN. 
# Environnement de développement. 
# Autor: Julio Cesar Torres (@torjc01)
# Data : 2023-10-30
#
BASE=$(pwd)

# Change les permissions des scripts 
chmod +x *.sh

echo "\e[32m[+] Création de la structure de répertoire de base \e[39m" 
mkdir -p $BASE/ACRacine $BASE/ACIntermediaire $BASE/ACSAAQ $BASE/ACXRoad

# =======================================================================
echo "[CONFIG-ACS] Configuration de la structure de l'AC Racine "

cp remove.sh                  ./ACRacine
cp setupRacine.sh             ./ACRacine
cp emettreRacine.sh           ./ACRacine
cp emettreIntermediaire.sh    ./ACRacine
cp emettreSAAQ.sh             ./ACIntermediaire
cp emettreXRoad.sh            ./ACIntermediaire

cd $BASE/ACRacine
echo "[.] Clean ..."
./remove.sh
echo "[.] Créér structure ..."
./setupRacine.sh

echo " " 

# =======================================================================
echo "[CONFIG-ACS] Configuration de la structure de l'AC Intermediaire"
cd $BASE
cp ./remove.sh             ./ACIntermediaire
cp ./setupIntermediaire.sh ./ACIntermediaire
cp ./usager.sh             ./ACIntermediaire

cd $BASE/ACIntermediaire
echo "[.] Clean ..."
./remove.sh
echo "[.] Créér structure ..."
./setupIntermediaire.sh

echo " " 

# =======================================================================
echo "[CONFIG-ACS] Configuration de la structure de l'AC SAAQ mDL"
cd $BASE 
cp ./remove.sh         ./ACSAAQ
cp ./setupSAAQmDL.sh   ./ACSAAQ
cp ./mdl.sh            ./ACSAAQ

cd $BASE/ACSAAQ
echo "[.] Clean ..."
./remove.sh
echo "[.] Cria estrutura ..."
./setupSAAQmDL.sh

echo " "

# =======================================================================
echo "[CONFIG-ACS] Configuration de la structure de l'AC XRoad"
cd $BASE 
cp remove.sh                  ./ACXRoad
cp setupXRoad.sh              ./ACXRoad
cp emettreXRoad.sh            ./ACXRoad
cp xroad.sh                   ./ACXRoad

cd $BASE/ACXRoad
echo "[.] Clean ..."
./remove.sh
echo "[.] Créér structure ..."
./setupXRoad.sh

echo "Configure le mot de passe des clés privées "
./setupPw.sh

echo " " 

# =======================================================================
# Copier les fichiers de configuration des autorités de certification
cd $BASE
# Copier vers l'AC Racine 
cp ACRacineCQENExpV1.cnf           ./ACRacine/etc/
cp ACIntermediaireCQENExpV1.cnf    ./ACRacine/etc/

# Copier vers l'AC Intermediaire de 1er niveau
cp ACIntermediaireCQENExpV1.cnf    ./ACIntermediaire/etc/
cp usager.cnf                      ./ACIntermediaire/etc/

# Copier vers l'AC SAAQ mDL de 2eme niveau
cp ACSAAQmDLExpV1.cnf              ./ACRacine/etc/
cp ACSAAQmDLExpV1.cnf              ./ACIntermediaire/etc/
cp ACSAAQmDLExpV1.cnf              ./ACSAAQ/etc/
cp mdl.cnf                         ./ACSAAQ/etc/

# Copier vers l'AC XRoad de 2eme niveau
cp ACXRoadExpV1.cnf                ./ACIntermediaire/etc/
cp ACXRoadExpV1.cnf                ./ACXRoad/etc/
cp xroad.cnf                       ./ACXRoad/etc/


echo " "
echo "<<<#########################################################>>>"
echo "[+] Émission des certificats des autorités de certification ..."

cd $BASE/ACRacine

echo "[..] Émettre certificat auto-signé ..."
./emettreRacine.sh

echo "[..] Émettre certificat AC Intermediaire Intermediaire ..."
./emettreIntermediaire.sh

cd $BASE/ACIntermediaire

echo "[..] Émettre certificat AC Intermediaire SAAQ ..."
echo $(pwd)
./emettreSAAQ.sh

echo "[..] Émettre certificat AC Intermediaire XRoad ..."
echo $(pwd)
./emettreXRoad.sh

echo "[..] Distribue le certificat racine à tous les ACs"
cd $BASE
cp ./ACRacine/certs/ACRacineCQENExpV1.crt ./ACSAAQ/certs
cp ./ACRacine/certs/ACRacineCQENExpV1.crt ./ACXRoad/certs

echo "[-] Fin de la configuration des ACs ."

echo "FIN DE PROGRAMME"

# EOF