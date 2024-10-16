[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![Licence](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENCE)

---

<div>
    <img src="https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png" />
</div>

## Expérimentation pour intégrer le standard (ISO 18013-5) "Mobile driver's license" ou "mDL" aux attestations vérifiables.


>[Consulter l'hypothèse](exp/hypothese.md)

>[Consulter le rapport d'expérimentation](exp/rapport.md)

## Comment utiliser ce dépôt ?

La stratégie du CQEN quant aux dépôts de code source des expérimentations, établie que le dépôt doit contenir entre autres, le code des prototypes, et la documentation liée à l'expérimentation. Dans le cas de cette expérimentation (mDL), le dépôt est structuré de la manière suivante:
- Code des prototypes:
  - [aca-py-oid4vci](./aca-py-oid4vci/README.md): API de l'agent ACA-Py (Aries Cloud Agent Python), couche backend de l'émetteur.
  - [issuer-frontend](./issuer-frontend/README.md): Application web, couche frontend de l'émetteur.
  - [portefeuille-mobile-mdl](./portefeuille-mobile-mdl): Application mobile (react native) de portefeuille électronique qui permet de recevoir le permis de conduire mobile (mDL).
  - [ICP (PKI)](./ICP/README.md): Application qui permet la gestion des clés de chiffrement et la délivrance de certificats numériques, tout en assurant la sécurité des échanges d'information et des transactions électroniques effectuées par l'intermédiare d'un reseau informatique tel Internet.
- Documentation de l'expérimentation
  - [documentation](./documentation): Dépôt des documents divers de la phase découverte, exploration et analyse de l'expérimentation.
  - [exp](./exp/README.md): Documentation de l'expérimentation.
- Scripts de déploiement dans Openshift
  - [openshift](./openshift/README.md): Dépôt des scripts nécessaires pour le déploiement des prototypes sur Openshift.


## Licence

Le code et la documentation de cette expérimentation sont la propriété intellectuelle du Gouvernement du Québec et sont publiés sous la licence libre du Québec - Permissive (LiLiQ-P) version 1.1. 

Référez-vous au fichier [LICENCE](LICENCE) pour plus de détails.