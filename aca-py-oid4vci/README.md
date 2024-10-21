# Prototype de l'application émettrice - ACA-Py agent

ACA-Py est un service web qui sert de foundation pour la création d'écosystèmes de gestion d'attestation vérifiable. Il fonctionne dans la deuxième et lam troisième couches du cadre [Trust Over IP](https://trustoverip.org/wp-content/uploads/2020/05/toip_050520_primer.pdf) en offrant une variété de formats et de protocoles d'attestaions vérifiables. ACA-Py s'exécute sur des serveurs (cloud, entreprise, appareils IoT, etc.) et n'est pas conçu pour fonctionner sur des appareils mobiles.

ACA-Py est extensible. Il offre la possibilité d'y ajouter des extensions. Ce dépôt permet de lancer une instance d'ACA-Py qui inclut une extension pour émettre un permis de conduire mobile au format mDL via le protocol [OID4VCI](https://www.authlete.com/developers/oid4vci/). L'émission est disponible uniquement avec le Pre-Authorized Code Flow. L'Authorization Code Flow n'est pas supporté.
