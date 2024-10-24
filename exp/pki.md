---
titre : Infrastructure à clés publiques - ICP / PKI
sous-titre : Expérimentation pour intégrer le standard (ISO 18013-5) "Mobile driver's license" ou "mDL" aux attestations vérifiables.
auteur : Centre d'expertise appliquée en innovation
date : 2024-10-01
statut : en cours
---

<!-- ENTETE -->
[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![Licence](https://img.shields.io/badge/Licence-LiLiQ--P-blue)](../LICENCE)
---
![Logo MCN](https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png)
<!-- FIN ENTETE -->

# ICP Interne de Développement CQEN Dev V1

Dans le monde d'aujourd'hui, la confiance repose sur les infrastructures à clé publique (ICP). Une ICP est composée de trois éléments : une méthodologie, une technologie et une infrastructure permettant d'effectuer des transactions. La méthode est relativement simple et repose sur la présentation de certificats de confiance entre les parties à une transaction. Si vous disposez d'un certificat auquel je fais confiance, je peux également vous faire confiance. Si j'ai un certificat auquel vous faites confiance, vous pouvez me faire confiance.

Les sources de confiance sont appelées autorités de certification. Généralement, les entités finales sont configurées avec un ou plusieurs points d'ancrage de la confiance qui sont ensuite utilisés comme point de départ pour valider un chemin de certification donné. La technologie utilisée est la cryptographie et, en particulier, la cryptographie à clé publique. 

L'intégrité et l'authenticité d'une mDL sont protégées par l'utilisation de mécanismes cryptographiques et de certificats numériques gérés par une infrastructure à clé publique (ICP) sous le contrôle de l'autorité émettrice (AI) concernée. Au cœur de cette ICP se trouve l'autorité de certification de l'autorité émettrice (IACA), à partir de laquelle un ensemble spécifique de certificats est généré et utilisé pour protéger les données et les transactions de la mDL. L'IACA (une par autorité de certification) est la base de confiance pour tous les vérificateurs de mDL (ou les parties qui se fient à ces certificats en général) qui doivent valider en toute sécurité l'intégrité et l'authenticité des mDL délivrés par l'autorité de certification concernée. Il est donc de la plus haute importance que les autorités administratives mettent en place des contrôles de sécurité stricts sur le déploiement, l'administration et le fonctionnement de leur IACA. Une compromission de l'IACA (par exemple, la divulgation de la clé privée de l'IACA, la délivrance frauduleuse de certificats de signature de documents, etc.) peut être exploitée pour falsifier des mDL et, en fin de compte, miner la confiance dans les mDL de l'autorité de délivrance. L'autorité de délivrance doit veiller à ce que des mesures de sécurité adéquates soient prises pour garantir un niveau de sécurité élevé lors de l'utilisation des clés du signataire du document.

La ICP Interne de Développement CQEN Dev V1 est créé pour donner support aux activités de développement dans un contexte d'expérimentation qui ont besoin d'une PKI fonctionnelle. 

Dans un premier temps, elle servira à fournir la infrastructure de certification nécessaire pour l'éxpérimentation du permis de conduire mobile (Mobile  Driver's Licence mDL), et permettre l'émission des certificats numériques qui seront ajoutés à la `VICAL - verified issuer certificate authority list` (Liste des autorités de certification des émetteurs vérifiés) de l'AAMVA.

Alors, la structure initialle de l'ICP est la suivante: 

```
     IDENTIFICATEUR DES NIVEAUX                                     DÉLAIS DE VALIDITÉ
    ----------------------------------------------------------     --------------------
    
    Autorité de Certification Racine CQEN Exp V1                    10 ans
    |
    |----Autorité de Certification Intermediaire CQEN Exp V1        5 ans
    |    |---- Certificat d'usager final                            1 an
    |
    |----Autorité de Certification mDL Exp V1                       5 ans
    |    |---- Certificat de mDL (Mobile Driver's Licence)          Délai à définir selon les normes adoptées          
```


**Attributs des autorités de certification CQEN** 

Nom: Autorité de Certification Racine CQEN Exp V1   
Niveau: 1er  
Prefix: ACRacineCQENExpV1  
Dir: /ACRacine  

Nom: Autorité de Certification Intermediaire CQEN Exp V1   
Niveau: 2eme  
Prefix: ACIntermediaireCQENExpV1  
Dir: /ACIntermediaire  

Nom: Autorité de Certification mDL Exp V1  
Niveau: 2eme  
Prefix: ACmDLExpV1  
Dir: /ACmDL  


## Création de l'ICP 

Pour réproduire la création de la PKI de l'expérimentation, clonez le projet sur l'ordinateur local: 

```
git clone https://github.com/CQEN_QDCE/pki-mdl
``` 

Ensuite, rentrez dans le répertoire cloné (`cd pki-mdl`) et exécutez la commande `./pki.sh`. Cette commande créé la structure de répertoires necessaire, et lance le processus 
d'émission des certificats des autorités de certification de cette PKI. 

Après la création de la structure de répertoires, le script va faire la génération des clés et le la demande d'émission de 
certificat (CSR). Au prompt `Enter PEM pass phrase` rentrez et confirmez le mot de passe qui protegera la clé privée; ensuite, à la demande
`Enter pass phrase for ACRacineCQENDevV1.key`, rentrez à nouveau ce même mot de passe; il est utilisé pour signer l'émission 
du certificat de l'AC Racine:  

```
[..] Émettre certificat auto-signé ...
.........+.+...........+....+.....+.+...+.....+.+...........+...+.+......+.........+.....+.............+....................+.+.....+.......+...+..........................+.+...+...........+.+........+......+................+..+.+.........+.....+...+...+....+...+..+.+..+....+.........+...............+..+.......+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*..........+.....+.......+..+............+.+...+...........+.+......+...+...........+...+......+.........+.......+......+........+......+...+.+.........+........+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Enter PEM pass phrase:
Verifying - Enter PEM pass phrase:
-----
Using configuration from etc/ACRacineCQENDevV1.cnf
Enter pass phrase for /home/CQEN-QDCE/code/ongoing/pki-mdl/ACRacine/ca/private/ACRacineCQENDevV1.key:

Check that the request matches the signature
Signature ok
Certificate Details:
        Serial Number:
            a7:db:61:6e:16:d2:a0:c9:a7:59:fd:a0:ce:31:09:9a:59:fe:a3:67
        Validity
            Not Before: Nov 13 15:49:23 2023 GMT
            Not After : Nov 12 15:49:23 2033 GMT
        Subject:
            countryName               = CA
            stateOrProvinceName       = Quebec
            localityName              = Quebec City
            organizationName          = Centre Quebecois d'Excellence Numerique
            organizationalUnitName    = AC CQEN
            commonName                = Autorite de Certification Racine CQEN Dev V1
        X509v3 extensions:
            X509v3 Key Usage: critical
                Certificate Sign, CRL Sign
            X509v3 Basic Constraints: critical
                CA:TRUE
            X509v3 Subject Key Identifier: 
                7F:06:C5:1B:37:B5:83:33:B5:3C:37:5F:D3:2B:1D:11:94:8A:88:7E
            X509v3 Authority Key Identifier: 
                7F:06:C5:1B:37:B5:83:33:B5:3C:37:5F:D3:2B:1D:11:94:8A:88:7E
            X509v3 CRL Distribution Points: 
                Full Name:
                  URI:http://www.quebec.ca/crl/desenv/racine/v1/LatestRacineV1.crl
Certificate is to be certified until Nov 12 15:49:23 2033 GMT (3652 days)
Sign the certificate? [y/n]:
``` 

Répondez `y` aux demandes de confirmation. 

Ensuite, on fera l'émission des certificats des ACs de deuxième niveau: CQEN et mDL. Le processus est le même 
pour les deux ACs.  Au prompt `Enter PEM pass phrase` rentrez et confirmez un nouveau mot de passe qui protegera la clé
privée **de l'AC intermediaire**; ensuite, à la demande `Enter pass phrase for ACRacineCQENDevV1.key`, attention, rentrez le mot de 
passe créé pour **l'AC Racine**; ce mot de passe est utilisé par l'AC Racine pour signer l'émission du certificat de l'AC intermediaire.  

```
[..] Émettre certificat AC Intermediaire Interne ...
AC Intermediaire:  /home/CQEN-QDCE/code/ongoing/pki-mdl/ACIntermediaire
......+...+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*.....+....+..+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*.+..+.......+.....+......+..................+.........+.............+..+.+......+.....+........+.......+........+..........+...+..............+.+......+........+............+......+..........+...+..+.........+....+......+...+........+...+.+.....+.+.........+...........+....+......+..+............+....+..+..........+..+..........+..+..........+......+...+.....+................+.....+...+.+..+.........+......+.........+....+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Enter PEM pass phrase:
Verifying - Enter PEM pass phrase:
-----
Using configuration from etc/ACRacineCQENDevV1.cnf
Enter pass phrase for /home/CQEN-QDCE/code/ongoing/pki-mdl/ACRacine/ca/private/ACRacineCQENDevV1.key:
Check that the request matches the signature
Signature ok
Certificate Details:
        Serial Number:
            a7:db:61:6e:16:d2:a0:c9:a7:59:fd:a0:ce:31:09:9a:59:fe:a3:68
        Validity
            Not Before: Nov 13 15:51:44 2023 GMT
            Not After : Nov 12 15:51:44 2033 GMT
        Subject:
            countryName               = CA
            stateOrProvinceName       = Quebec
            localityName              = Quebec City
            organizationName          = Centre Quebecois d'Excellence Numerique
            organizationalUnitName    = AC CQEN
            commonName                = Autorite de Certification Intermediaire CQEN Dev V1
        X509v3 extensions:
            X509v3 Key Usage: critical
                Certificate Sign, CRL Sign
            X509v3 Basic Constraints: critical
                CA:TRUE, pathlen:0
            X509v3 Subject Key Identifier: 
                3B:86:BE:A7:99:54:23:39:62:63:57:B7:78:50:E0:B0:5C:E0:41:8A
            X509v3 Authority Key Identifier: 
                7F:06:C5:1B:37:B5:83:33:B5:3C:37:5F:D3:2B:1D:11:94:8A:88:7E
            X509v3 CRL Distribution Points: 
                Full Name:
                  URI:http://www.quebec.ca/crl/desenv/racine/v1/LatestRacineV1.crl
Certificate is to be certified until Nov 12 15:51:44 2033 GMT (3652 days)
Sign the certificate? [y/n]:y

1 out of 1 certificate requests certified, commit? [y/n]y
Data Base Updated
Réalise la copie des objets cryptographiques vers le repositoire de l'AC mDL.
[-] Fin de la configuration des ACs .
``` 

Maintenant, la structure de la PKI, qui compte une AC racine et deux autorités de certification de 2eme niveau est créé 
et prête à être utilisée. 

Il est conseillé d'enregistrer les mots de passe créés pour chaque AC dans un programme gestionnaire de mot de passe, et 
ne pas les enregistrer dans code. S'il faut les utiliser dans des applications ou dans des automatisations, utilisez la 
structure de secrets de votre plateforme (Secrets d'Openshift, par exemple), ou crééz des fichiers d'environnement, en 
s'assurant qu'ils ne seront jamais commités dans une dépôt de code. Regardez l'article de [Bruce Schneider](01) sur le sujet. 

[01]: [https://www.schneier.com/blog/archives/2005/06/write_down_your.html]("Write down you passwords") 

## Références 

[An Overview of X.509 Certificates](https://www.ibm.com/support/pages/system/files/inline-files/An_Overview_of_x.509_certificates.pdf)

**Requests for Comments** 
======================

RFC 3339 - [Date and time on the Internet : Timestamps](https://datatracker.ietf.org/doc/html/rfc3339) 

RFC 4648 - [The Base16, Base32, and Base64 Data Encodings](https://datatracker.ietf.org/doc/html/rfc4648)

RFC 5280 - [Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile](https://datatracker.ietf.org/doc/html/rfc5280)

RFC 5869 - [HMAC-based Extract-and-Expand Key Derivation Function (HKDF)](https://datatracker.ietf.org/doc/html/rfc5869)

**NIST**
=========
NIST SP 800-38D - [Recommendation for Block Cipher Modes of Operation: Galois/Counter Mode (GCM) and GMAC](https://csrc.nist.gov/pubs/sp/800/38/d/final)
