---
titre : Hypothèse
sous-titre : Expérimentation pour intégrer le standard (ISO 18013-5) "Mobile driver's license" ou "mDL" aux attestations vérifiables.
auteur : Centre d'expertise appliquée en innovation
date : 2024-10-01
statut : en cours
---


<!-- ENTETE -->
[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--P-blue)](../LICENCE)
---
![Logo MCN](https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png)
<!-- FIN ENTETE -->

# Expérimentation pour intégrer le standard (ISO 18013-5) "Mobile driver's license" ou "mDL" aux attestations vérifiables.

## Contexte 

Depuis quelques années des normes et standards encadrant le déploiement des permis de conduire numériques (Mobile Driver’s License – mDL) ainsi que de l’identité numérique (Digital Identity – eID) à l’échelle internationale ont été publiés. Dans le domaine de la sécurité routière, la norme ISO 18013-5 (mDL) ainsi que des normes de l’American Association of Motor Vehicle Administrators (AAMVA) viennent encadrer le déploiement du permis de conduire numérique sur appareil mobile, et ce, pour la région nord-américaine. Au Canada et au Québec, le Pan-Canadian Trust Framework (PCTF) du Digital Identity and Authentication Council of Canada (DIACC) viennent établir les grandes orientations et balises pour le déploiement de l’identité numérique. 

## La problématique

L’enjeu actuel majeur est le fait que les orientations, les cadres et les technologies soutenant le déploiement du permis de conduire numérique ainsi que de l’identité numérique à l’échelle nationale et internationale évoluent en parallèle et présentent certains manquements en termes d’interopérabilité et de compatibilité. Le CQEN serait précurseur dans l’établissement des prérequis nécessaires à la mise en place d’une solution d’affaires répondant à la fois aux normes de l’AAMVA et ISO mDL ainsi qu’aux orientations du pays et de la région en matière d’identité numérique, tout en étant interopérable à l’échelle nord-américaine et internationale. Qui plus est, cet arrimage est requis afin d’assurer la viabilité de la solution finale au-delà de ses frontières notamment puisque la pièce permis représente un élément essentiel à la concrétisation de la vision de l’écosystème d’identité numérique incluant le portefeuille numérique gouvernemental.  

## Hypothèse[^1]

**Nous croyons qu’** une implémentation conciliée des normes de l’identité numérique et du permis de conduire numérique (ISO 18013-5 (mDL) et AAMVA) peut être conservé dans un portefeuille numérique. 

**Résultera** en un permis de conduire numérique qui est arrimé à l’initiative d’identité numérique et qui est conforme aux normes mDL et de l’AAMVA.

**Ceci sera prouvé si :** 

- Nous démontrerons qu’il est faisable d’utiliser un lecteur standardisé conforme à la norme mDL et pouvant être utilisé par n’importe quelle force de l’ordre nord-américaine; 

- À travers une recherche utilisateur auprès des parties prenantes essentielles tels que le citoyen, les forces de l’ordre, les contrôleurs routiers et le secteur privé:
  - Nous arriverons à mesurer une réelle augmentation de la productivité sur les tâches des contrôleurs routiers et du privé; 
  - Nous validerons l’acceptabilité de la part les parties prenantes; 
  - Nous identifierons les bonnes pratiques à adopter avec la version numérique intégré à l’identité numérique. 

## Méthode 

Cette preuve de concept se fera en mode cocréation entre le CQEN et certains représentants spécialisés gouvernementaux en matière d’identité numérique. Des spécialistes en matière de permis de conduire numériques de ces gouvernements pourraient être interpelés également.

Nous réutiliserons des prototypes déjà réalisés dans le cadre du projet de l’identité numérique pour émettre un permis de conduire au portefeuille numérique. 

Nous réaliserons une implémentation à même le portefeuille numérique conciliant les normes de l’identité numérique et du permis de conduire numérique (ISO 18013-5 (mDL) et AAMVA) qui en permet la présentation à un lecteur. 

Dans un souci d’expérience utilisateur intuitive et à valeur ajoutée, de compatibilité technologique en plus de l’acceptabilité des parties prenantes, nous réaliserons le bout en bout avec un lecteur minimal qui valide la lecture d’un permis de conduire respectant les normes ISO mDL et de l’AAMVA.  

Finalement, l’utilisation d’une recherche utilisateur permettra d’aider à établir l’atteinte de l’hypothèse. 

**Déroulement** : L’élaboration du prototype se déroulera en grandes phases :  
- Établissement de l’entente de co-création / partenariat entre le CQEN et les organismes impliqués; 
- Définition de la portée et des exigences affaires et technologiques des expérimentations; 
- Préparation de l’environnement et des scénarios d’essais permettant de valider l’atteinte de l’hypothèse de la preuve de concept ainsi que le développement du prototype; 
- Réalisation du prototype; 
- Mise à l’épreuve du prototype avec les parties prenantes essentielles; 
- Rédaction du rapport d’expérimentation incluant les leçons apprises et les recommandations pour les suites. 

## Références 

- https://fidoalliance.org/wp-content/uploads/2023/04/FIDO-EUDI-Wallet-White-Paper-FINAL.pdf 
- [S. 884 – The Improving Digital Identity Act of 2023](https://www.congress.gov/bill/118th-congress/senate-bill/884?q=%7B%22search%22%3A%5B%22s884%22%5D%7D&s=1&r=1)
- https://www.coindesk.com/business/2023/03/24/california-leads-the-way-as-us-federal-state-agencies-consider-blockchains-applications-bank-of-america/  
- https://developer.apple.com/documentation/passkit/wallet/requesting_identity_data_from_a_wallet_pass  
- https://www.mdlconnection.com/implementation-tracker-map/ 
- [Identity Verification & Digital Identity Recap 2022 - Security Boulevard](https://securityboulevard.com/2023/01/identity-verification-digital-identity-recap-2022/)
- [Une identité numérique sur la blockchain ? La Turquie fait le pari du web 3 - Journal du Coin](https://journalducoin.com/defi/turquie-identite-numerique-blockchain/)
- [Andrii Melashchenko | LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7015652530672050176/)
- [India lets banks use face recognition, iris scan for some transactions - sources | Reuters](https://www.reuters.com/world/india/india-lets-banks-use-face-recognition-iris-scan-some-transactions-sources-2023-01-13/)
- [UK Cabinet Office seeks feedback on data sharing legislation to develop digital ID - Global Government Forum](https://www.globalgovernmentforum.com/uk-cabinet-office-seeks-feedback-on-data-sharing-legislation-to-develop-digital-id/)
- [POTENTIAL Consortium – EU Digital Identity Wallet | IDEMIA](https://www.idemia.com/news/potential-consortium-selected-european-commission-pursue-its-journey-digital-european-identity-2023-01-11)
- [Hartford City Council measure would limit use of facial recognition technology by police. Here’s why there are concerns about its accuracy. – Hartford Courant](https://www.courant.com/community/hartford/hc-news-hartford-facial-recognition-city-council-police-20230113-xkod2fgbrjdpdmiquiv6sj3wwi-story.html)
- [Digital IDs on iPhone launching soon in California (9to5mac.com)](https://9to5mac.com/2023/01/10/apple-wallet-digital-ids-california-launch/)
- [CA Ready to Roll Out Digital IDs in 'Matter of Months', Critics Warn of 'Privacy Nightmare' | CBN News](https://www1.cbn.com/cbnnews/us/2023/january/ca-ready-to-roll-out-digital-ids-in-matter-of-months-critics-warn-of-privacy-nightmare)
- [What can I do with a California digital drivers license? (fox40.com)](https://fox40.com/news/california-connection/what-can-i-do-with-californias-digital-drivers-license-wallet-mdl/)
- https://project.linuxfoundation.org/openwallet_davos2023 
- https://fintechbusinessweekly.substack.com/p/what-apples-secret-dmv-contracts 
- https://www.figma.com/file/bwZv2AodGhty4KPEMjYKvm/Comprendre-le-portefeuille-num%C3%A9rique?node-id=1%3A2138 


[^1]: Énoncé basé sur le principe du [*Hypothesis-driven development*](https://www.ibm.com/garage/method/practices/learn/practice_hypothesis_driven_development) (IBM Garage Methodology, Adrian Cho, 2023)