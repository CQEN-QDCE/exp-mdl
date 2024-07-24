echo -e "\033[33m Création de la structure de la ICP du Gouvernement du Quebec\033[0m"
./createPKIStruct.sh
echo " "

echo -e "\033[31m Copie des fichiers de config et scripts d'opération\033[0m"
./restore.sh
echo " "

echo -e "\033[32m >>>>[Émission du certificat de l'Autorité de Certification Racine du Gouvernement du Québec Dev v1]<<<<\033[0m"
./createRoot.sh
echo " "
sleep 1

echo -e "\033[32m >>>>[Émission du certificat de l'Autorité de Certification Intermediaire CQEN Dev v1]<<<<\033[0m"
./createCQEN.sh
echo " "
sleep 1

echo -e "\033[32m >>>>[Émission du certificat de l'Autorité de Certification SAAQ Dev v1]<<<<\033[0m"
./createSAAQ.sh
echo " "
sleep 1

echo -e "\033[32m >>>>[Émission du certificat de du OCSP Responder de l'ICP du Gouvernement du Québec]<<<<\033[0m"
./createOCSP.sh
echo " " 
sleep 1
