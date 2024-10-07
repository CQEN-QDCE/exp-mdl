# Prototype de l'application émettrice - controller - react native

L'application émettrice - controller est une application react native frontend qui interagi avec l'agent instance ACA-Py (émettrice - ACA-Py) pour gérer l'offre de l'attestation (accepter, refuser, etc.). 

Cette application permet à l'utilisateur de recevoir son attestation du permis de conduire dans son portefeuille mobile:
1. L'utilisateur remplit les informations concernant le permis de conduire.
2. L'application communique avec le ACA-Py pour la création de l'attestation.
3. L'application affiche un code QR que l'utilisateur doit scanner avec son portefeuille numérique.
4. L'attestation du permis de conduire est reçue par le portefeuille numérique.

## Installation locale

Dans le répertoire courant (/app)
```
pnmp install
pnmp start
```
Le prototype sera accessible à l'url http://localhost:3000/ par défaut.

## Configuration

**Variables d'environnement**

| Variable | Description |
| -------- | ----------- |
| **REACT_APP_ISSUER_API_BASE_URL** | L'URL de l'API de l'agent ACA-Py émetteur. |
| **REACT_APP_OID4VCI_SUPPORTED_CREDENTIAL_ID** | L'identificateur utilisé pour l'appel à l'API de l'agent ACA-Py émetteur pour enregistrer les informations du permis de conduire. |
