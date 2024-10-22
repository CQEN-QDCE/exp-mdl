<!-- ENTETE -->
[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENSE)

---

<div>
    <a target="_blank" href="https://www.quebec.ca/gouvernement/ministere/cybersecurite-numerique">
      <img src="images/mcn.png" alt="Logo du Ministère de la cybersécurité et du numérique" />
    </a>
</div>
<!-- FIN ENTETE -->

# Plugin aca-py pour support à ECDSA et x.509 

## Ajustement de l'aca-py pour mDL 

Ajoute des keys pour les algorithmes ECDSA

- ECDSA with SHA-256
- ECDSA with SHA-384
- ECDSA with SHA-512

Algorithmes admis par la AAMVA: 

|Algorithme|Curve|Appelation|Py-Crypto class|
|----------|-----|----------|---------------|
|ES256     |P256 |NIST P-256|SECP256R1      |
|ES384     |P384 |NIST P-384|SECP384R1      |
|ES512     |P521 |NIST P-521|SECP521R1      |

*AAMVA Implementation Guidelines, p. 22*

## Algorithmes 

La liste des algorithmes de crypto qui sont utilisés dans aca-py et credo-ts.

Ensuite vérifie auprès du NIST/FIPS s'ils sont homologés. 

Les algorithmes utilisés dans aca-py sont: 

EdDSA: Edwards-curve Digital Signature Algorithm: c'est un algorithme de signature numérique qui utilise une variante de la Schnorr signature, basée sur les twisted Edwards curves. Les clés EdDSA sont définies avec exactement 256 bits de longueur. 

	Courbes utilisées: 
		Ed25519 : c'est le schema de signature EdDSA qui utlise SHA-512 et la Curve25519
		 x25519 : c'est une curve elliptique d'exchange de clés de Diffie-Hellman qui utilise la Curve25519

BLS Signature Algorithm : A BLS digital signature, also known as Boneh–Lynn–Shacham[1] (BLS), is a cryptographic signature scheme which allows a user to verify that a signer is authentic. 

	Courbes utilisées: 
		BLS12381G1, BLS12381G2, BLS12381G1G2 : famille de courbes elliptiques appelées Barreto-Lynn-Scott, pour des signatures numériques performantes 


Après les vérifications des algorithmes disponibles et du besoin en tant que l'intégration à une ICP exige, on a inclut les algorithmes qui s'en suivent: 

ECDSA: c'est une variante de l'algorithme DSA (Digital Signature Algorithm) qui utilise courbes elliptiques pour la génération de signatures numériques. 

	Courbes utilisées: 
		Curve P-256  
		Curve P-381  
		Curve P-521  

Le `Canadian Centre for Cyber Security` admet encore l'utilisation de la courbe `Curve P-224`, mais elle doit être éliminé progressivement d'ici 2030, alors aucun nouveau produit doit être crée en utilisant cette courbe. 

Le document `NIST SP 800-186 Recommendations for Discrete Logarithm-based Cryptography: Elliptic Curve Domain Parameters ` homologue les courbes `Ed25519 (Curve 25519)`, courbes `Curve P-256`, `Curve P-381`, `Curve P-521`. Les courbes de la famille `Barreto-Lynn-Scott` n'ont pas pu être trouvées dans la liste d'homologation du `NIST` ni de la `Canadian Centre for Cyber Security`. 

Dans CREDO, je n'ai pas trouvé de documentation qui spécifie quel algorithme de signature qui est utilisé dans le framework. Peut-être parce que le service est déjà fourni par des librairies externes, comme aca-py? 


### Quelle est la différence entre`les algorithmes EdDSA et ECDSA ?

`EdDSA (Edwards-curve Digital Signature Algorithm)` et `ECDSA (Elliptic Curve Digital Signature Algorithm)` sont tous deux des algorithmes de signature numérique qui utilisent la cryptographie à courbe elliptique, mais ils présentent plusieurs différences :

- **Type de courbe** : L'EdDSA utilise des courbes d'Edwards, tandis que l'ECDSA utilise des courbes sous forme de `short Weierstrass`. Les courbes d'Edwards présentent certains avantages en termes de sécurité et d'efficacité par rapport aux courbes de Weierstrass.

- **Vitesse de signature** : le processus de génération de signature de l'EdDSA est plus rapide que celui de l'ECDSA en raison des calculs plus simples qu'il implique.

- **Sécurité** : EdDSA est conçu pour résister aux attaques side-channel. L'ECDSA, quant à lui, nécessite un bon générateur de nombres aléatoires pour chaque signature; s'il n'est pas correctement mis en œuvre, il peut entraîner une fuite de la clé privée.

- **Signatures déterministes** : EdDSA génère des signatures déterministes (le même message signé plusieurs fois produira toujours la même signature), ce qui n'est pas le cas avec ECDSA, à moins qu'il ne soit implémenté avec la RFC 6979.

- **Adoption** : L'ECDSA est plus largement adopté et existe depuis plus longtemps que l'EdDSA. L'ECDSA est utilisé dans les certificats SSL/TLS, Bitcoin et Ethereum. EdDSA est utilisé dans des systèmes plus récents comme Signal, Tor, et est la valeur par défaut de SSH.

- **Implémentations spécifiques** : Une implémentation courante d'EdDSA est Ed25519, qui utilise Curve25519. L'ECDSA est souvent utilisé avec une variété de courbes, les plus courantes étant secp256k1 (utilisée par Bitcoin), secp256r1 (également connue sous le nom de P-256), et secp384r1 (également connue sous le nom de P-384).


### Quels sont les avantages et les inconvénients de l'utilisation de Ed25519 par rapport à ECDSA pour les signatures numériques ?

Ed25519 est une implémentation spécifique de l'EdDSA (Edwards-curve Digital Signature Algorithm), tandis que l'ECDSA (Elliptic Curve Digital Signature Algorithm) est un algorithme plus général qui peut être utilisé avec différentes courbes elliptiques. Voici quelques avantages et inconvénients de l'utilisation de Ed25519 par rapport à ECDSA :

**Avantages de Ed25519 par rapport à ECDSA :**

- **Vitesse :** Ed25519 a un processus de génération et de vérification de signature plus rapide que la plupart des implémentations ECDSA.

- **Sécurité :** Ed25519 est conçu pour résister aux attaques side channel. L'ECDSA, quant à lui, nécessite un bon générateur de nombres aléatoires pour chaque signature ; s'il n'est pas correctement implémenté, il peut entraîner une fuite de la clé privée.

- **Signatures déterministes :** Ed25519 génère des signatures déterministes (le même message signé plusieurs fois produira toujours la même signature), ce qui n'est pas le cas avec ECDSA, à moins qu'il ne soit implémenté avec la RFC 6979.

- **Petite taille de clé :** Les clés Ed25519 ne font que 256 bits, ce qui est plus court que les 384 bits souvent utilisés avec ECDSA pour atteindre le même niveau de sécurité.

**Inconvénients du Ed25519 par rapport à l'ECDSA :**

- **Compatibilité :** L'ECDSA est plus largement adopté et existe depuis plus longtemps que le Ed25519. L'ECDSA est utilisé dans les certificats SSL/TLS, Bitcoin et Ethereum. Si vous interagissez avec des systèmes qui ne prennent en charge que l'ECDSA, vous devrez utiliser l'ECDSA au lieu de l'Ed25519.

- **Normalisation :** ECDSA est spécifié dans plus de normes que Ed25519. Par exemple, l'ECDSA est spécifié dans les normes `ANSI X9.62` et `IEEE 1363`.

- **Support matériel :** La prise en charge matérielle de l'ECDSA est plus courante que celle de l'Ed25519. De nombreux modules de sécurité matériels (HSM) et cartes à puce prennent en charge l'ECDSA, mais pas l'Ed25519.

N'oubliez pas que le choix entre Ed25519 et ECDSA dépendra de votre cas d'utilisation spécifique, notamment des systèmes avec lesquels vous interagissez, de vos besoins en termes de performances et de vos exigences en matière de sécurité.

### Quels sont les cas d'utilisation courants dans lesquels Ed25519 est préféré à ECDSA pour les signatures numériques ?

Ed25519 est souvent préférée à l'ECDSA (Elliptic Curve Digital Signature Algorithm) dans les cas d'utilisation suivants :

- **Messagerie sécurisée :** Les applications de messagerie sécurisée comme Signal utilisent Ed25519 pour sa vitesse et ses fortes propriétés de sécurité.

- **Authentification SSH :** OpenSSH prend en charge les clés Ed25519. Elles sont plus rapides et plus sûres que les clés ECDSA.

- **TLS :** certaines implémentations de TLS (Transport Layer Security) prennent en charge la clé Ed25519. Il est utilisé dans les certificats pour HTTPS et d'autres protocoles de communication sécurisés.

- **Signature de logiciels :** Ed25519 est utilisé pour signer les paquets de logiciels dans certains systèmes de gestion des paquets en raison de ses signatures déterministes et de sa résistance à certains types d'attaques.

- **Réseau Tor :** Le réseau d'anonymat Tor utilise Ed25519 pour authentifier ses serveurs relais.

- **Cryptomonnaies :** Certaines crypto-monnaies récentes préfèrent Ed25519 à ECDSA en raison de ses avantages en termes de sécurité et de performance. Par exemple, Stellar et Nano utilisent Ed25519.

### Quelles sont les courbes homologuées par le NIST pour les algorithmes EdDSA et ECDSA ?

Le `National Institute of Standards and Technology (NIST)` a approuvé plusieurs courbes elliptiques à utiliser avec l'algorithme de signature numérique à courbe elliptique (ECDSA). Ces courbes sont définies dans la norme `NIST FIPS 186-4` et comprennent :

- P-192
- P-224
- P-256
- P-384
- P-521

Toutefois, le NIST n'a officiellement homologué aucune courbe pour une utilisation avec l'algorithme de signature numérique à courbe d'Edwards (EdDSA). L'EdDSA utilise généralement des courbes définies dans d'autres normes, telles que Curve25519 et Curve448, qui sont définies dans le RFC 7748. Ces courbes n'ont pas été développées par le NIST et ne sont pas incluses dans les normes du NIST.

Il est important de noter que si le NIST n'a homologué aucune courbe pour l'EdDSA, cela ne signifie pas nécessairement que l'EdDSA est moins sûr ou moins adapté à l'utilisation que l'ECDSA. La sécurité d'un algorithme de signature numérique dépend de nombreux facteurs, notamment de la courbe spécifique utilisée, de la mise en œuvre de l'algorithme et du contexte dans lequel l'algorithme est utilisé.

**Réf:** FIPS 186-5 - Digital Signature Standard (DSS)
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf

## Le schema BBS (Boneh-Boyen-Schachman)

Le schema de signature numérique BBS (Boneh-Boyen-Shacham) est un protocole de signature numérique multi-messages sécurisé qui permet le selective disclosure, l'Unlinkable Proofs et la Proof of Possession d'une signature dans un sous-ensemble des messages signés. 

Pour dire qu'un produit qui traite des informations sensibles peut être utilisé dans le context du gouverment fédéral canadien ou dans le gouvernement des E-U, il faut faire la validation de ce produit par le Cryptographic Module Validation Program (CMVP). Ce programme valide le produit selon le standard NIST-FIPS-140-3, qui normatise les algorithmes, tailles de clés, les courbes, etc..., bien comme l'utiilisation des bonnes pratiques preconisées par la CSE. 

L'utilisation du schema de signature BBS peut se montrer un empêchement lors de la validation du produit dans la CMVP. Un produit non homologué est potentiellement non utilisable dans des applications qui traitent de l'information sensible, dans le cadre gouvernemental (fédéral et américain). 

Il est important de noter que même si le schema de signature BBS n'est pas actuellement homologué par le NIST, il possède les fonctionnalités de selective disclosure et de proof-of-knowledge requises par les applications qui préservent la privacité, comme la blockchain d'identité, et il est utilisé dans diverses applications qui sont en cours de normalisation dans d'autres organisations telles que le W3C.


## Configuration du plugin 

### Pré-requis 

Assurez-vous d'avoir installé :
- Python
- Poetry (gestionnaire de paquets)

### Étapes d'installation

Pour préparer l'environnement de développement, il faut s'assurer d'avoir `python` et son package manager `poetry` dûment installés. Le projet d'aca-py est forké dans le repo du CQEN sous le nom `aries-cloudagent-python`. Clonez-le à la machine locale, puis créez et changez dans une nouvelle branche pour votre fonctionalité. 

```bash
git clone https://github.com/CQEN-QDCE/aries-cloudagent-python.git 
cd aries-cloudagent-python
git checkout -b features/votrebranche
```

Ensuite, créez à la racine du projet le repertoire `.vscode`. Dans ce répertoire, créez deux fichiers,  `launch.json` et `local.yaml`. Copiez le contenu suivant dans les fichiers respectifs : 

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

***Modifications dans les dépendances***

Ajoutez la ligne suivante dans le fichier `./pyproject.toml`: 

```
oid4vci = { path = "~/CQEN-MCN/code/ongoing/merging/aries-acapy-plugins/oid4vci/", develop = true, optional = true }
```

***Lancement de l'application*** 

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

***Reconfiguration*** 

Si l'installation est faite sur une ancienne installation, et que vous voulez repartir le répositoire à nouveau, alors il faudrait faire la suppréssion du cache de poetry. Dans un système Linux, ce cache se situe dans le repertoire `~/.cache/pypoetry/virtualenv/aries*`. Exécutez la commande ci-dessous pour supprimer le répertoire du cache: 

```bash 
sudo rm -rf ~/.cache/pypoetry/virtualenv/aries*
``` 

## Opération

### Nouveaux endpoints de l'application

| Méthode | Endpoint | Fonction | Schémas                                                    |
|---------|----------|----------|------------------------------------------------------------|
| POST | `/wallet/x509/keypair` | `wallet_x509_keypair` | `req_schema`, `res_schema`         |
| POST | `/wallet/x509/csr`     | `wallet_x509_create_csr` | `req_schema`, `res_schema`      |
| GET  | `/wallet/x509/csr`     | `wallet_x509_get_csr` | `querystring_schema`, `res_schema` |
| POST | `/wallet/x509/sign`    | `wallet_x509_sign` | `req_schema`, `res_schema`            |
| POST | `/wallet/x509/verify`  | `wallet_x509_verify` | `req_schema`, `res_schema`          |

### JSON pour tests

Utilisez le JSON suivant pour tester, en remplaçant `keyType` par `p256`, `p384` ou `p521` :

```json
{
  "method": "key",
  "options": {
    "key_type": "ed25519"
  }
}
```

Note : L'OID d'ed25519 est `{iso(1) identified-organization(3) thawte(101) id-Ed25519(112)}`

### Outil auxiliaire de génération de clés et CSR

Un outil auxiliaire a été développé pour la création des clés et la génération de la CSR, utilisant les mêmes librairies et code que ceux déployés dans aca-py.

**Package Py-Crypto:**

```
cryptography.hazmat.primitives.assymetric.ec
```

***Utilisation***

1. Créez deux répertoires sous ECDSA-CSR :

```bash 
mkdir -p csr/ keys/
```

2. Utilisez l'endpoint `/wallet/did/create-did` pour générer une nouvelle paire de clés. Notez l'identifiant du DID qui sera utilisé comme alias dans les étapes suivantes.

3. Exécutez le programme `ECCSR.py` avec deux paramètres : le nom de la courbe (p256, p384 ou p521) et l'alias :

```bash
python3 ECCSR.py p256 did:key:WgWxqztrNooG92RXvxSTWv
```

Les clés seront générées dans le répertoire `/keys` et la CSR dans le répertoire `/CSR`.

4. Pour émettre le certificat, exécutez le script `certificateIssuance.sh` avec le même alias en paramètre :

```bash
./certificateIssuance.sh did:key:WgWxqztrNooG92RXvxSTWv
```

### Méthodes équivalents en OpenSSL

Les commandes OpenSSL qui suivent ont été utilisées pour faire la validation des objets crées par l'exécution des méthodes implementées dans le plugin. 

Malgré que les objets crées ne se constituent pas exactement des mêmes données, parce que les algorithmes des courbes elliptiques sont principalement `non-deterministes`, ces objets peuvent être comparés en termes de structure et de codification, ainsi qu'utilisés de façon inter-opérable, pour démontrer leur validité.  

**Générer une clé privée pour une courbe elliptique en utilisant l'algorithme EdDSA25519**
```bash
openssl genpkey -algorithm ed25519 -out ed25519key.pem
```

**Extraire la clé publique à partir de la clé privée**
```bash
openssl pkey -in ed25519key.pem -pubout -out ed25519pub.pem 
```

**Générer clé publique ed25519 avec OpenSSL** (https://stackoverflow.com/questions/72151697/generating-public-ed25519-key-with-openssl)
```bash
openssl genpkey -algorithm ed25519 -outform DER -out test25519.der
openssl pkey -in private.pem -pubout -out public.pem
openssl pkey -in ed25519key.pem -pubout
```

**Génération de clé publique ed25519 - méthode alternative** (https://superuser.com/questions/1319543/gen-pubkey-openssl-ed25519)
```bash
openssl pkey -in ed25519key.pem -pubout
```

## Références

Ceci est une liste extensive des références qui ont été consultées et servi d'inspiration ou de source d'information pendant les travaux de développement du plugin aca-py. 

### Development and Setup

- [ACA-Py Development with Dev Container](https://github.com/CQEN-QDCE/aries-cloudagent-python/blob/main/devcontainer.md)
- [Becoming a Hyperledger Aries Developer - Getting Started](https://ldej.nl/post/becoming-a-hyperledger-aries-developer-getting-started/)
- [Hyperledger Aries ACA-Py Agents Setup and Running Tutorials — Part III— Dev Environment Setup](https://yunxi-zhang-75627.medium.com/hyperledger-aries-aca-py-agents-setup-and-running-tutorials-part-i-i-i-dev-environment-setup-20ab5a32457e)
- [Logging docs](https://github.com/hyperledger/aries-cloudagent-python/blob/main/Logging.md)
- [Aries ACA-Py Plugins](https://github.com/hyperledger/aries-acapy-plugins/tree/main/oid4vci)

### Protocols and Standards

- [Aries RFC 0434: Out-of-Band Protocols](https://github.com/hyperledger/aries-rfcs/tree/2da7fc4ee043effa3a9960150e7ba8c9a4628b68/features/0434-outofband)
- [RFC 0021 - Sender and recipient identifiers used in envelope as DID key references](https://github.com/hyperledger/aries-rfcs/issues/104)
- [BBS Cryptosuite v2023](https://www.w3.org/TR/vc-di-bbs/)
- [The did:key Method v0.7](https://w3c-ccg.github.io/did-method-key/#format)
- [Indy DID Method](https://hyperledger.github.io/indy-did-method/)
- [Aries RFC 0809: W3C Verifiable Credential Data Integrity Attachment format](https://github.com/hyperledger/aries-rfcs/tree/main/features/0809-w3c-data-integrity-credential-attachment)
- [Architectural Layering for Decentralized Identification](https://github.com/WebOfTrustInfo/rwot5-boston/blob/master/topics-and-advance-readings/Architectural-Layering-for-Decentralized-Identification.md)
- [W3C did:x509 Method Specification](https://w3c-ccg.github.io/did-method-web/)
- [Trust over IP - Spécification de la méthode did:x509](https://trustoverip.github.io/tswg-did-x509-method-specification/)
- [Microsoft did:x509](https://github.com/microsoft/did-x509)

### Cryptography and Key Management

- [Generating public ed25519 key with OpenSSL](https://stackoverflow.com/questions/72151697/generating-public-ed25519-key-with-openssl)
- [Gen pubkey openssl ed25519](https://superuser.com/questions/1319543/gen-pubkey-openssl-ed25519)
- [Convert Aries KMS public key to JWK](https://penkovski.com/post/convert-aries-pubkey-to-jwk/)
- [Multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv#L115)
- [Pure-Python ECDSA and ECDH](https://pypi.org/project/ecdsa/)
- [Welcome to pyca/cryptography](https://cryptography.io/en/latest/)
- [How to sign and verify signature with ecdsa in python](https://stackoverflow.com/questions/34451214/how-to-sign-and-verify-signature-with-ecdsa-in-python)
- [Encoding public keys in PEM format](https://jpassing.com/2021/11/30/using-pem-to-encode-public-keys/)
- [Extracting a public key from an Ed25519 private key with OpenSSL](https://superuser.com/questions/1700544/extracting-a-public-key-from-an-ed25519-private-key-with-openssl)
- [Librairie Python Cryptography](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/ec/)
- [Python-Cryptography: Key Serialization](https://github.com/pyca/cryptography/blob/main/docs/hazmat/primitives/asymmetric/serialization.rst)
- [P256 keys using Secure Enclave and Android StrongBox](https://github.com/hyperledger/aries-askar/pull/245/commits/fec3c574425560618626f40a3eb6862591cd19ae#)

### Encoding and Data Conversion

- [Exercise: Convert Data between Decimal, Base58, and Hex](https://learn.saylor.org/mod/page/view.php?id=36344)
- [base58](https://www.npmjs.com/package/base58-native?activeTab=readme)
- [Bienvenue à l'ASN.1 et au DER](https://letsencrypt.org/fr/docs/a-warm-welcome-to-asn1-and-der/)
- [JSON Web Key (JWK)](https://jwcrypto.readthedocs.io/en/latest/jwk.html)

### Tools and Libraries

- [Repositorio pydid](https://github.com/Indicio-tech/pydid/tree/main)
- [PyCose](https://github.com/TimothyClaeys/pycose)
- [starkbank/ecdsa-python](https://github.com/starkbank/ecdsa-python)
- [AntonKueltz/fastecdsa](https://github.com/AntonKueltz/fastecdsa)
- [tlsfuzzer/python-ecdsa](https://github.com/tlsfuzzer/python-ecdsa)
- [ecdsa PyPI](https://pypi.org/project/ecdsa/)
- [ecdsa ReadTheDocs](https://ecdsa.readthedocs.io/en/latest/index.html)
- [ASN.1 Tool - PKI Solutions](https://www.pkisolutions.com/tools/asn1editor)
- [Asn1Editor.WPF GitHub](https://github.com/PKISolutions/Asn1Editor.WPF)
- [Aries Askar sur PyPI](https://pypi.org/project/aries-askar/)
- [Aries Askar sur GitHub](https://start-here.hyperledger.org/pull-requests/hyperledger/aries-askar)
- [Open Wallet Foundation: Identity Credential](https://github.com/openwallet-foundation-labs/identity-credential)
- [Askar Storage](https://github.com/hyperledger/aries-askar/blob/main/docs/storage.md)
- [OpenWallet Foundation Credo-TS](https://github.com/openwallet-foundation/credo-ts)

### Security Notices

- [USN-4196-1: python-ecdsa vulnerabilities](https://ubuntu.com/security/notices/USN-4196-1)

### Miscellaneous

- [IDENTIFYING AND TRACKING PHYSICAL OBJECTS WITH HYPERLEDGER DECENTRALIZED APPLICATIONS (Thesis)](https://upcommons.upc.edu/bitstream/handle/2117/379937/Degree_thesis_DavidChicanoValenzuela.pdf?sequence=5&isAllowed=y)
- [open-source-community - Die Open Source Community](https://github.com/e-id-admin/open-source-community/blob/main/discussion-paper-tech-proposal/20231201_Question_Overview.pdf)
- [Command Line Arguments for Your Python Script](https://machinelearningmastery.com/command-line-arguments-for-your-python-script/)
- [INRUPT: New type of wallet, well built](https://www.inrupt.com/products/developer-portal)
- [INRUPT GitHub Repositories](https://github.com/orgs/inrupt/repositories?type=all)

NIST SP 800-186 Recommendations for Discrete Logarithm-based Cryptography: Elliptic Curve Domain Parameters 
https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-186.pdf

Edwards-Curve Digital Signature Algorithm (EdDSA) 
https://datatracker.ietf.org/doc/html/rfc8032

BLS Signatures 
https://www.ietf.org/archive/id/draft-irtf-cfrg-bls-signature-05.html 

Deterministic Usage of the Digital Signature Algorithm (DSA) and Elliptic Curve Digital Signature Algorithm (ECDSA) 
https://www.rfc-editor.org/rfc/rfc6979.html

Cryptographic algorithms for UNCLASSIFIED, PROTECTED A, and PROTECTED B information - ITSP.40.111 
https://www.cyber.gc.ca/en/guidance/cryptographic-algorithms-unclassified-protected-protected-b-information-itsp40111

FIPS 186-5 - Digital Signature Standard (DSS) 
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf

The BBS Signature Scheme
https://identity.foundation/bbs-signature/draft-irtf-cfrg-bbs-signatures.html

Cryptographic Module Validation Program (CMVP)
Canada
https://www.cyber.gc.ca/en/tools-services/cryptographic-module-validation-program-cmvp
E-U
https://csrc.nist.gov/Projects/cryptographic-module-validation-program/use-of-fips-140-2-logo-and-phrases

Digital Identity Guidelines
https://csrc.nist.gov/pubs/sp/800/63/4/ipd	

BBS+ Applications, Standardization and a Bit of Theory
https://csrc.nist.gov/csrc/media/presentations/2023/crclub-2023-10-18/images-media/20231018-crypto-club--greg-and-vasilis--slides--BBS.pdf


***References de crypto symétrique*** 

Symmetric Cryptography & Key Management: Exhaustion, Rotation, Defence
https://www.cryptomathic.com/news-events/blog/symmetric-cryptography-and-key-management-considerations-on-key-exhaustion-rotation-and-security-models#

An Overview of Symmetric Encryption and the Key Lifecycle
https://www.cryptomathic.com/news-events/blog/an-overview-of-symmetric-encryption-and-the-key-lifecycle

UBS SPARES ITS CLIENTS THE PAPERWORK AND INCREASES EFFICIENCY AND SECURITY USING QUALIFIED ELECTRONIC SIGNATURES
https://www.cryptomathic.com/casestudies/ubs

https://geraintluff.github.io/cbor-debug/

https://www.aamva.org/identity/mobile-driver-license-digital-trust-service/for-issuing-authorities

https://github.com/CQEN-QDCE/Portefeuille-mobile-qc-mDL/blob/main/DEVELOPER.md

https://github.com/nvm-sh/nvm

https://github.com/openwallet-foundation/credo-ts-ext/tree/main/packages/transport-ble


***Digital Identities - Mobile Driver's License (mDL) !!!!!***   

https://www.nccoe.nist.gov/projects/digital-identities-mdl

https://github.com/CQEN-QDCE/exp-mdl/blob/dev/documentation/notes.md

Multiple significant security vulnerabilities in the design of data integrity
https://github.com/w3c/vc-data-integrity/issues/272

Anoncreds-RS
https://github.com/hyperledger/anoncreds-rs

European blockchain regulatory sandbox for Distributed Ledger Technologies
https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/Sandbox+Project

European Blockchain Sandbox releases the complete Cohort 1 Best Practices Report
https://ec.europa.eu/digital-building-blocks/sites/display/EBSISANDCOLLAB/European+Blockchain+Sandbox+releases+the+complete+Cohort+1+Best+Practices+Report

Verifiable Credential Data Integrity 1.0
https://www.w3.org/TR/vc-data-integrity/

Data Integrity ECDSA Cryptosuites v1.0
https://www.w3.org/TR/vc-di-ecdsa/

Data Integrity BBS Cryptosuites v1.0
https://www.w3.org/TR/vc-di-bbs/

W3C CCG presentation on parallel signatures
https://docs.google.com/presentation/d/19uepe7zinY0MKdTkLkDu_bPX2P4BDj6mmFPtRjCfJX8/edit#slide=id.g2afc3854acf_0_0

Breakthrough: Parallel Signatures - NIST, ECDSA-SD, and BBS
https://lists.w3.org/Archives/Public/public-credentials/2024Jan/0054.html

Swiss E-ID & Trust Infrastructure — Technical Roadmap (WIP)
https://github.com/e-id-admin/open-source-community/blob/main/tech-roadmap/tech-roadmap.md

AnonCreds to W3C Format Verifiable Credential and Presentation Converter
https://github.com/andrewwhitehead/anoncreds-w3c-mapping

Aries VCR
https://github.com/bcgov/aries-vcr?tab=readme-ov-file

Indy-VDR (Verifiable Data Registry)
https://github.com/hyperledger/indy-vdr

React Native Ble DIDComm
https://github.com/animo/react-native-ble-didcomm/tree/main

Functional mdoc implementation
https://github.com/openwallet-foundation-labs/wallet-framework-dotnet/pull/120
