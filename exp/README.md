## Expérimentation pour intégrer le standard (ISO 18013-5) "Mobile driver's license" ou "mDL" aux attestations vérifiables.

## Prototypes

### Applications

Démontrer la faisabilité technique de l'intégration du standard ISO 18013-5, mDL aux attestations vérifiables.

- Émetteur du permis de conduire mobile: Pour que l'émetteur du permis de conduire mobile fonctionne, il a besoin de trois composants:
  - **Application web et mobile** qui sert de couche "frontend" de l'émetteur.
  - **API de l'agent ACA-Py** qui sert de couche "backend" de l'émetteur.
  - **Application mobile de portefeuille numérique** qui sert à:
    - Balayer le code QR que l'application frontend affiche.
    - Recevoir le permis de conduire mobile de l'API de l'agent ACA-Py avec les informations du code QR balayé .
- **ICP: Application d'Infrastructure à clé publique (PKI)**
  - TODO
- **Plugin ACA-Py**
  - TODO

## Cas à démontrer

### L'utilisateur est capable de recevoir son permis de conduire mobile dans son portefeuille numérique

## Architecture de la solution

![Architecture de l'émetteur de permis de conduire ](https://www.plantuml.com/plantuml/proxy?cache=no&fmt=svg&src=https://raw.githubusercontent.com/CQEN-QDCE/exp-mdl/prod/documentation/Architecture/Issuer.puml)

**Architecture Haut Niveau**

![Aperçu de l'écosystème du permis de conduire mobile](./images/architecture_haut_niveau.png)

