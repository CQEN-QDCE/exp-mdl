# Déployer ACA-py avec le plugin OID4VCI sur OpenShift

Ce dépôt contient les instructions nécessaires pour déployer ACA-py avec le plugin OID4VCI sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [aca-py-oid4vci.yaml](https://github.com/CQEN-QDCE/exp-mdl/blob/prod/openshift/templates/aca-py-oid4vci.yaml) | Installation d'ACA-py avec le plugin OID4VCI. |
| [aca-py-oid4vci.dev.params](https://github.com/CQEN-QDCE/exp-mdl/blob/prod/openshift/templates/aca-py-oid4vci.dev.params) | Paramètres pour un environnement de développement. |

## Paramètres du gabarit

Pour spécifier les paramètres requis manquants, créer un fichier nommé 'aca-py-oid4vci.dev.params' dans le même répertoire que celui du gabarit. Il doit contenir les paramètres suivants:

| Paramètre | Description |
| --------- | ----------- |
| **APP_DOMAIN** | Le nom de domaine externe pour accéder à l'application. |
| **WALLET_ENCRYPTION_KEY** | Clé de chiffrement du portefeuille de l'agent. |
| **POSTGRESQL_PASSWORD** | Mot de passe utilisateur de la base de données PostgreSQL. |
| **POSTGRESQL_ADMIN_PASSWORD** | Mot de passe administrateur de la base de données PostgreSQL. |

Le fichier de paramètres permet la personnalisation de l'installation pour un environnement particulier (par exemple).

Commencer par créer un projet sur OpenShift:
```bash
oc new-project aca-py-oid4vci
```
Lancez l'installation sur OpenShift
```bash
oc process -f ./aca-py-oid4vci.yaml --param-file=./aca-py-oid4vci.dev.params | oc apply -f -
```

Une fois que tous les pods sont démarrés, vous pouvez accéder à l'OpenAPI du service à l'adresse https://mdl-issuer-admin.<APP_DOMAIN>.

Utilisez la route POST
https://mdl-issuer-admin.<APP_DOMAIN>/oid4vci/credential-supported/create
```json
{
    "format": "mso_mdoc",
    "doc_type": "org.iso.18013.5.1.mDL",
    "id": "MobileDrivingLicense",
    "cryptographic_binding_methods_supported": [
        "cose_key"
    ],
    "cryptographic_suites_supported": [
        "ES256", "ES384", "ES512"
    ],
    "display": [
        {
            "name": "Mobile Driving License",
            "locale": "en-US",
            "logo": {
                "url": "https://examplestate.com/public/mdl.png",
                "alt_text": "a square figure of a mobile driving license"
            },
            "background_color": "#12107c",
            "text_color": "#FFFFFF"
        },
        {
            "name": "在籍証明書",
            "locale": "ja-JP",
            "logo": {
                "url": "https://examplestate.com/public/mdl.png",
                "alt_text": "大学のロゴ"
            },
            "background_color": "#12107c",
            "text_color": "#FFFFFF"
        }
    ],
    "claims": {
        "org.iso.18013.5.1": {
            "given_name": {
                "display": [
                    {
                        "name": "Given Name",
                        "locale": "en-US"
                    },
                    {
                        "name": "名前",
                        "locale": "ja-JP"
                    }
                ]
            },
            "family_name": {
                "display": [
                    {
                        "name": "Surname",
                        "locale": "en-US"
                    }
                ]
            },
            "birth_date": {}
        },
        "org.iso.18013.5.1.aamva": {
            "organ_donor": {}
        }
    }
}
```

| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **APP_NAME** | Nom utilisé pour regrouper les composantes ensembles dans la console OpenShift. | exp-mdl |
| **AGENT_SUBDOMAIN** | Le nom de sous domaine pour accéder à l'application. | exp-mdl |
| **POSTGRESQL_NAME** | Nom assigné à tous les objets PostgreSQL déployés par le gabarit. | mdl-issuer-database |
| **POSTGRESQL_USERNAME** | Nom d'utilisateur PostgreSQL. | dbuser |
| **POSTGRESQL_ADMIN_USERNAME** | Nom d'utilisateur de l'administrateur PostgreSQL. | postgres |
| **POSTGRESQL_DATABASE_NAME** | Nom de la base de données de l'application. | mdl-issuer |
| **POSTGRESQL_PORT** | Numéro de port sur lequel PostgreSQL écoute. | 5432 |
| **POSTGRESQL_VOLUME_SIZE** | Capacité du volume persistant PostgreSQL. | 1Gi |
| **WALLET_STORAGE_TYPE** | Type de stockage utilisé ('postgres_storage' or 'sqlite_storage'). | postgres_storage |
| **ACA_PY_OID4VCI_NAME** | Nom assigné à tous les objets ACA-py déployés par le gabarit. | mdl-issuer |
| **ACAPY_LABEL** | Libellé de l'agent ACA-py. | OID4VCI mDL issuer |
| **GITHUB_REPOSITORY_URI** | URI du dépôt GitHub. | https://github.com/CQEN-QDCE/exp-mdl.git |
| **CPU_REQUEST** | CPU requis par le service. | 100m |
| **CPU_LIMIT** | Limite de ressources CPU utilisé par le service | 250m |
| **MEMORY_REQUEST** | Mémoire requise par le service. | 128Mi |
| **MEMORY_LIMIT** | Limite de mémoire utilisé par le service. | 256Mi |
| **STORAGE_CLASS_NAME** | Nom de la classe de stockage utilisé. | gp2 |