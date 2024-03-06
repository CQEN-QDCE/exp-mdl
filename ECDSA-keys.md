# Ajustement de l'aca-py pour mDL 


Ajoute des keys pour les algorithmes ECDSA

- ECDSA with SHA-256
- ECDSA with SHA-384
- ECDSA with SHA-512

Algorithmes admis par la AAMVA: 

|Algorithme|Curve|Appelation|Py-Crypto class|
|----------|-----|----------|---------------|
|ES256|P256|NIST P-256|SECP256R1|
|ES384|P384|NIST P-384|SECP384R1|
|ES512|P521|NIST P-521|SECP521R1|

\* *AAMVA Implementation Guidelines, p. 22*

## Configuration 

Pour préparer l'environnement de développement, il faut s'assurer d'avoir `python` et son package manager `poetry` dument installés. Le projet d'acapy est forké dans le repo du CQEN sous le nom `aries-cloudagent-python`. Clonez-le à la machine locale, puis créez et changes dans une nouvelle branche pour votre feature. 

```bash
git clone https://github.com/CQEN-QDCE/aries-cloudagent-python.git 
cd aries-cloudagent-python
git checkout -b features/votrebranche
```

Ensuite, créez dans la racine du projet le repertoire `.vscode`. Dans ce répertoire, créez deux fichiers,  `launch.json` et `local.yaml`. Copiez le contenu suivant dans le fichier respectif : 


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

#wallet-storage-type: postgres_storage
#wallet-storage-config: '{"url":"localhost:5432","max_connections":5}'
#wallet-storage-creds: '{"account":"postgres","password":"postgres","admin_account":"postgres","admin_password":"postgres"}'
#tails-server-base-url: https://ws.dev.tails-server.diti.di.gov.on.ca 
#multitenant
#multitenant: true
#multitenant-admin: true
#jwt-secret: admin-jwt-secret
```

Ensuite, il faut configurer l'environnement virtuel via `poetry`. À la première démarrage, il faut installer les packages de poetry. Aux démarrages suivantes, vous n'avez qu'à lancer l'environnement. 

```bash 
poetry install --extras="askar bbs"
poetry shell 
code . 
```

Un fois VSCode lancé, l'environnement et le degub sont prêts. 

## Implementation 

**Package Py-Crypto:** 
```
cryptography.hazmat.primitives.assymetric.ec
```

Endpoint à modifier: /wallet/did/create   
Source: aries_cloudagent/wallet/routes.py

Lien direct à l'endpoint:   
http://localhost:8024/api/doc#/wallet/post_wallet_did_create

Json à utiliser dans les essais. Remplacer le keyType par `p256`, `p384` ou `p521`.

```json
{
  "method": "key",
  "options": {
    "key_type": "ed25519"
  }
}
```

OID pour ed25519: {iso(1) identified-organization(3) thawte(101) id-Ed25519(112)}

### Outil auxiliaire de génération de clés et CSR 

L'outil auxiliaire fait la création des clés et génération de la CSR, en utilisant les mêmes librairies et code 
que sont déployes dans aca-py. 

Pour l'utilisation, il faut créér deux répertoires sous ECDSA-CSR, nommés `csr` and `keys`. 

```bash 
mkdir -p csr/ keys/
```

Tout d'abord, utilisez l'endpoint /wallet/did/create-did pour générer un nouveau paire de clés. Prennez en note l'identificateur du did:, qui sera utilisé comme alias dans les étapes suivantes. 

Ensuite, exécutez le programme `ECCSR.py`, avec ses deux paramètres: a curve name (p256, p384 ou p521), et un alias, 
qui sera utilisé comme `common-name` dans le certificat.  

```bash
python3 ECCSR.py p256 did:key:WgWxqztrNooG92RXvxSTWv
```
 
Les clés seront générées sous le répertoire `/keys` et la CSR sous le répertoire `/CSR`. 

Finalement, pour émettre le certificat, exécuter le scritp ./certificateIssuance.sh, avec le même alias en paramètre, qu'il sera émis par la structure de la PKI interne. 

```bash
./certiticateIssuance.sh did:key:WgWxqztrNooG92RXvxSTWv
```



## Références 

Librairie Python Cryptography   
https://cryptography.io/en/latest/hazmat/primitives/asymmetric/ec/

