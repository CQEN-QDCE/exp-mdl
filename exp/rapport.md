---
titre : Rapport d'expérimentation
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

# Expérimentation pour intégrer le standard (ISO 18013-5) "Mobile driver's license" ou "mDL" aux attestations vérifiables.

## 1. Objectifs 

## 2. Contexte 

## 3. Configuration et installation 

### 3.1 ICP / PKI (Infrastructure à clé publiques / Public Key Infrastructure)

La PKI Interne de Développement CQEN Dev V1 est créé pour donner support aux activités 
de développement dans un contexte d'expérimentation qui ont besoin d'une PKI fonctionnelle. 
Dans un premier temps, elle servira à fournir la infrastructure de certification nécessaire
pour l'éxpérimentation du permis de conduire mobile (Mobile Driver's Licence mDL).  

Information détaillé sur la structure de la PKI Interne de développement, consultez le document [PKI](./pki.md). 

### Configuration de la ICP Expérimentale du Gouvernement du Québec

#### Configuration des fichiers de paramètres dans le répertoire de scripts

Il y a un fichier de paramètre général, appelé `base.params`, et un fichier de paramètres par AC crée (p. ex. `cqen.params`, `saaq.params`, etc). 

La configuration du fichier général doit prendre en consideration les paramètres suivants: 


|Nom du paramètre | Obligatoirité | Valeur | Exemple | 
|---|---|---|---|
|PROJECT_HOME|O|Répertoire dans lequel les sources du projet github ont été clonés et à partir duquel l'ICP sera compilée et construite.|/home/usu/code-source/pkiCloneGithub|
|PROJECT_BKP_HOME|O|Répertoire de bkp des scripts et des fichiers de configuration des sources de l'ICP. Référer comme un sous répertoire de `$PROJECT_HOME`.|/bkp|
|PROJECT_SRC_HOME|O||/sources|
|PKI_HOME|O||/pki-gouvernementale|
||||

### 3.2 Plugin aca-py 

Pour préparer l'environnement de développement, il faut s'assurer d'avoir `python` et son package manager `poetry` dûment installés. Le projet d'aca-py est forké dans le repo du CQEN sous le nom `aries-cloudagent-python`. Clonez-le à la machine locale, puis créez et changez dans une nouvelle branche pour votre fonctionalité. 

```bash
git clone https://github.com/CQEN-QDCE/aries-cloudagent-python.git 
cd aries-cloudagent-python
git checkout -b features/votrebranche
```

Ensuite, créez dans la racine du projet le repertoire `.vscode`. Dans ce répertoire, créez deux fichiers,  `launch.json` et `local.yaml`. Copiez le contenu suivant dans les fichiers respectifs : 


- `launch.json`
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "DEBUG CQEN",
            "request": "launch",
            "type": "debugpy",
            "module": "aries_cloudagent",
            "justMyCode": true,
            "args": [
                "start",
                "--arg-file=${workspaceRoot}/.vscode/local.yaml"
            ]
        }
    ]
}
```

- `local.yaml`
```yaml
inbound-transport:
  - [http, 0.0.0.0, 8021]
outbound-transport: http
endpoint: http://localhost:8021 
genesis-url: https://raw.githubusercontent.com/ICCS-ISAC/dtrust-reconu/main/CANdy/dev/pool_transactions_genesis
auto-accept-invites: true
auto-accept-requests: true
auto-ping-connection: true
auto-respond-messages: true
auto-respond-credential-proposal: true
auto-respond-credential-offer: true
auto-respond-credential-request: true
auto-store-credential: true
auto-respond-presentation-proposal:
auto-respond-presentation-request: true
auto-verify-presentation: true
auto-provision: true
public-invites: true
requests-through-public-did: true
emit-new-didcomm-prefix: true
emit-new-didcomm-mime-type: true
monitor-ping: true
notify-revocation: true
monitor-revocation-notification: true
wallet-local-did: true
wallet-type: askar
wallet-name: issuer_agent1_candy_dev
wallet-key: key
wallet-storage-type: default 
seed: candi_issuer_0000000000000000001
admin: [0.0.0.0, 8024]
admin-insecure-mode: true
label: 'Issuer Agent1'
log-level: debug
debug-webhooks: true
plugin:
  -ecdsa-x509
```

Ensuite, il faut configurer l'environnement virtuel via `poetry`. À la première démarrage, vous devez installer les packages de poetry. Aux démarrages suivantes, vous n'avez qu'à lancer l'environnement. 

```bash 
poetry install --extras="askar bbs ecdsa-x509"
poetry shell 
code . 
```

Dans la dépendence `askar` il faut aussi ajouter du code pour supporter l'émission de clés avec les nouveaux algorithmes. 

`aries-askar/types.py` il faut rajouter les lignes suivantes dans la classe `KeyAlg`:
```python 
ECDSAP256 = "p256"
ECDSAP384 = "p384"
ECDSAP521 = "p521"
```

Un fois VSCode lancé, l'environnement et le degub sont prêts. 

### 3.3 Application émettrice 

### 3.4 Portefeuille mobile mDL
Pour être en mesure de tester Lémission d'un mDL, une application mobile de type portefeuille numérique a été développé. Pour l'utiliser, [Consulter son dépôt](https://github.com/CQEN-QDCE/portefeuille-mobile-mdl/) et suivre la procédure d'installation.

## 4. Démarche de l'expérimentation 

### 4.1 Étude de la norme ISO/IEC 18013-5

L'ISO/IEC 18013-5 est une norme internationale qui définit les spécifications des permis de conduire mobiles (mobile Driver's License - mDL). L'étude de la norme était un prérequis à la réalisation de cette expérimentation. Nous devions rapidement comprendre sa structure générale, le modèle de données, les protocoles de communication, les mécanismes de sécurité, les fonctionnalités de confidentialité, l'interopérabilité et les cas d'utilisation qu'elle supporte.

#### Composants principaux
Comme pour l'infrastructure d'identité numérique, l'éco-système mDL se compose de trois éléments principaux (le fameux triangle de confiance):

1. L'infrastructure de l'autorité émettrice;
2. Le mDL lui-même, enregistré sur l'appareil mobile du détenteur du permis;
3. Le lecteur mDL, utilisé pour vérifier un mDL.

#### Caractéristiques clés

##### Éléments de données et sécurité
Le mDL contient des éléments de données spécifiques sur le détenteur du permis, tels que son nom, sa date de naissance ainsi que ses privilèges de conduite. Ces éléments de données sont protégés par des mécanismes cryptographiques et des certificats numériques gérés par une infrastructure à clé publique (PKI) sous le contrôle d'une autorité émettrice.

##### Intégrité des données et authentification
Le mDL inclut un objet de sécurité mobile (MSO) qui contient un condensé des éléments de données. Ce dernier est signé numériquement par l'autorité émettrice. Cela permet aux lecteurs mDL de vérifier l'intégrité et l'authenticité des éléments données.

##### Protection de la vie privée
Une des caractéristiques clés offerte par un mDL est la divulgation sélective, permettant aux détenteurs de partager uniquement le sous-ensemble nécessaire de leurs informations personnelles. Les éléments de données divulgés varient en fonction du cas d'utilisation.

##### Processus d'utilisation du mDL

- **Initialisation** : Le détenteur présente son mDL à un lecteur mDL pour vérification.
- **Demande de preuve** : Le lecteur mDL demande les éléments de données à valider à l'appareil du détenteur.
- **Consentement** : Le détenteur reçoit une invite montrant les éléments de données demandés et doit consentir à les partager.
- **Transmission** : Après consentement, les éléments de données du mDL, y compris l'objet de sécurité mobile (MSO), sont partagées via une communication sécurisée avec le lecteur.
- **Vérification** : Le lecteur mDL valide l'intégrité des éléments de données reçues en vérifiant la signature de l'objet de sécurité mobile (MSO) et en contrôlant le hachage de chaque élément de données individuellement.

##### Technologies de communication
Le mDL peut échanger des données avec les lecteurs en utilisant la communication en champ proche (NFC), le Bluetooth Low Energy (BLE) ou le Wi-Fi Aware1.
Modèle de confiance
L'ISO/IEC 18013-5 utilise un modèle de confiance d'infrastructure à clé publique (PKI) décentralisé2. Les lecteurs mDL doivent posséder la chaîne de certificats de signature mDL de l'autorité émettrice pour vérifier l'authenticité du mDL.

En normalisant ces aspects, l'ISO/IEC 18013-5 vise à assurer l'interopérabilité, la sécurité et la confidentialité dans la mise en œuvre et l'utilisation des permis de conduire mobiles à travers différentes juridictions et cas d'utilisation.

## 5. Analyse des résultats 

## 6. Conclusion

## 7. Références 


### Sécurité de l'information

**FIPS 140-2 : Security Requirements for Cryptographic Modules**   
https://csrc.nist.rip/publications/detail/fips/140/2/final

Cette norme fédérale de traitement de l'information (FIPS 140-2) spécifie les exigences de sécurité qui seront satisfaites par un module cryptographique, en fournissant quatre niveaux qualitatifs croissants destinés à couvrir une large gamme d'applications et d'environnements potentiels. Les domaines couverts, liés à la conception et à la mise en œuvre sécurisées d'un module cryptographique, comprennent la spécification ; les ports et les interfaces ; les rôles, les services et l'authentification ; le modèle à états finis ; la sécurité physique ; l'environnement opérationnel ; la gestion des clés cryptographiques ; les interférences électromagnétiques/compatibilité électromagnétique (EMI/EMC) ; les auto-tests ; l'assurance de la conception ; et l'atténuation des autres attaques.

**Cryptographic Module Validation Program**  
https://csrc.nist.rip/projects/cryptographic-module-validation-program

Le 17 juillet 1995, le NIST a mis en place le programme de validation des modules cryptographiques (CMVP) qui valide les modules cryptographiques conformément aux normes FIPS (Federal Information Processing Standards) 140-1, Security Requirements for Cryptographic Modules, et à d'autres normes FIPS basées sur la cryptographie. La norme FIPS 140-2, Security Requirements for Cryptographic Modules, a été publiée le 25 mai 2001 et remplace la norme FIPS 140-1. Le CMVP est un effort conjoint du NIST et du Centre canadien pour la cybersécurité (CCCS), une branche du Centre de la sécurité des télécommunications (CST).

Les modules validés comme étant conformes à la norme FIPS 140-2 sont acceptés par les agences fédérales des deux pays pour la protection des informations sensibles.

Les fournisseurs de modules cryptographiques font appel à des laboratoires indépendants et accrédités de tests de cryptographie et de sécurité (CST) pour tester leurs modules. Les laboratoires du CST utilisent les exigences de test dérivées (DTR), les directives de mise en œuvre (IG) et les directives programmatiques CMVP applicables pour tester les modules cryptographiques par rapport aux normes applicables. La division de sécurité informatique (CSD) du NIST et le CCCS servent conjointement d'autorités de validation pour le programme, validant les résultats des tests et délivrant des certificats.