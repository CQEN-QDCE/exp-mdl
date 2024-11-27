# Architecture du registre de confiance - Mobile's Drivers Licence 

**Objectif:** 

Faire le dessin de l'architecture du registre de confiance, en y répresentant les rélations existantes entre la PKI et et les méthodes de gestion de clés implantés dans l'aries-cloudagent - acapy. Ensuite, établir les rélations et les opérations entre les records sur le registre de confiance et ceux qui sont publiés dans une des plusieurs VICALs disponibles.


## Introduction 

Le registre de confiance pour le modèle proposé par la norme ISO-18013-5 et par le Guide d'Implemententation de l'AAMVA est créé avec deux composantes principaux:  une instance de la PKI (public key infrastructure, ou infrastructure à clés publiques) et une liste d'autorités de certification émettrices certifiées VICAL Verified Issuer Certificate Authority List. 

La PKI est utilisée pour émettre des certificats numériques qui attestent l'indetité des entités qui sont enrolées dans le protocole (autorité emettrice - Issuing Authotiry (IA)), le citoyen, le dispositif mobile (modile device); la VICAL est un service qui sert de point de confiance aux participants de mDL, où la liste d'autorités autorisées est publiée  



### PKI - Public Key Infrastructure 

ISO, section E-6: PKI and trust model, p. 140

L'intégrité et l'autenticité d'un document mDL est protegée par l'utilisation de mechanismes cryptographiques et certificats numériques gerés par une Infrastructure à clés publiques (Public Key Infrastructure  - PKI) sous le contrôle de son autorité émettrice respective (Issuing authority - IA). Dans le centre de cette PKI est l'Autorité de Certification Racine (AR) de l'autorité émettrice (SAAQ), connue comme IACA (Issuing Authority Certification Authority) à partir de laquelle un ensemble de certificats est créé et utilisé pour proteger les données et transactions de la mDL. 

L'IACA (une seule par IA) est la racine de confiance pour tous les vérificateurs 



### VICAL - liste d'autorités de certification émettrices certifiées

Le modèle de confiance adopté par le mDL c'est de la PKI décentralisée. Ceci demande un méchanisme de distribution et de dissemination 
l'ensemble de certificats des autorités de certification des organizations émettrices de mDL. (ISO, Annexe C, p.90)

The decentralized PKI trust model adopted by the mDL requires a mechanism to distribute and
disseminate the set of certification authorities’ certificates by issuing authorities. Furthermore,
the lack of a global organization having oversight over the mDL ecosystem and willing to play an
operational role (as is the case of ICAO for the electronic passport) limits the possibility of having a
single central repository with all the IACA certificates and working as the reference trust anchor for all
mDL participants.

In this context, a mechanism referred to as VICAL is hereby described whereby an entity (Provider) can
compile, operate and provide such a trust anchor in the form of a service to mDL participants. As this
service plays a critical role on the overall security and interoperability of the mDLs, a minimum set of
security requirements are defined.


### ACA-PY - aries-cloudagent-python

L'agent "aries infonuagique Python" (plus connu comme `aca-py`), est l'agent émetteur responsable de la génération et émission des documents dans le format mDL. 

Détenteur de la paire de clés qui sont utilisées pour la signature de certificats numériques et des émissions de documents mDL.

*Endpoints* 

I   POST /wallet/x509/keypair   
II  POST /wallet/x509/csr   
III POST /wallet/verification-method/sign   
iV  POST /wallet/verification-method/verify   


Provisionnement des Autorités de Certification 

1. Exécuter I - générer keypair de l'Autorité Racine 
2. Exécuter I - générer keypair de l'Autorité Intermediaire 
3. Exécuter II - générer la CSR de l'Autorité Racine (CSR-AR)
4. Exécuter II - générer la CSR de l'Autorité Intermediaire (CSR-AI)
5. Émettre le certificat de l'Autorité Racine à l'aide de la CSR-AR
6. Enregistrer le certificat sur le dépôt de long-term (linked data dans la blockchain, trusted store... à discuter) 
7. Émettre le certificat de l'Autorité Intermediaire à l'aide de la CSR-AI
8. Enregistrer le certificat sur le dépôt de long-term (linked data dans la blockchain, trusted store... à discuter)

Si vous voulez éxecuter les étapes 2, 4, 6 et 8 pour la création des Autorités Intermediaires supplémentaires 



