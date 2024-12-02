---
titre : Rapport de la veille technologique
sous-titre : Expérimentation pour intégrer le standard (ISO 18013-5) "Mobile driver's license" ou "mDL" aux attestations vérifiables.
auteur : Centre d'expertise appliquée en innovation
date : 2024-12-02
statut : en cours
---

<!-- ENTETE -->
[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![Licence](https://img.shields.io/badge/Licence-LiLiQ--P-blue)](../LICENCE)
---
![Logo MCN](https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png)
<!-- FIN ENTETE -->

# Veille sur les permis de conduire numériques

## Table des matières

[Synthèse](#synthèse)

[Introduction](#introduction)

[I. Permis de conduire numériques](#permis-de-conduire-numériques)

[II. Avantages et inconvénients des permis de conduire numériques](#avantages-et-inconvénients-des-permis-de-conduire-numériques)

[1. Les avantages](#les-avantages)

[2. Les inconvénients et défis](#les-inconvénients-et-défis)

[III. Cycle de vie d'un permis de conduire numérique (inspiré du AAMVA)](#cycle-de-vie-dun-permis-de-conduire-numérique-inspiré-du-aamva)

[1. Émission](#émission)

[2. Validation](#validation)

[3. Mise à jour ](#mise-à-jour)

[4. Révocation](#révocation)

[IV. Portefeuille: portrait des initiatives à travers le monde](#portefeuille-portrait-des-initiatives-à-travers-le-monde)

[1. Amérique](#amérique)

[2. Asie-pacifique](#asie-pacifique)

[3. Europe](#europe)

[4. Afrique](#afrique)

[V. Dispositifs et technologies de contrôle et vérification des mDL](#dispositifs-et-technologies-de-contrôle-et-vérification-des-mdl)

[VI. Normes et protocoles des permis de conduire](#normes-et-protocoles-des-permis-de-conduire)

[1. ISO/IEC 18013-5](#isoiec-18013-5)

[2. ISO/IEC 18013-7](#isoiec-18013-7)

[3. ISO/IEC 23220-2 (MDoC)](#isoiec-23220-2-mdoc)

[4. American Association of Motor Vehicle Administrators (AAMVA) Guidelines](#american-association-of-motor-vehicle-administrators-aamva-guidelines)

[5. Règlement eIDAS](#règlement-eidas)

[6. World Wide Web Consortium (W3C)](#world-wide-web-consortium-w3c)

[7. Commissariat à la protection de la vie privée au Canada](#commissariat-à-la-protection-de-la-vie-privée-au-canada)

[8. Comparaison de normes](#comparaison-de-normes)

[VII. Analyse PESTEL](#analyse-pestel)

[1. Dimension politique](#dimension-politique)

[2. Dimension socio-économique](#dimension-socio-économique)

[3. Dimension technologique](#dimension-technologique)

[4. Dimension environnementale](#dimension-environnementale)

[5. Dimension légale](#dimension-légale)

[Constats et réflexions](#constats-et-réflexions)

[Table des figures](#table-des-figures)

[Références](#références)

# Synthèse 

La veille sur les permis de conduire numériques vise répondre à quatre objectifs principaux : (1) identifier les avantages et les inconvénients liés à  la mise en œuvre des permis de conduire numériques, (2) aperçu sur l'état actuel de l'adoption des permis de conduire numériques à  l'échelle mondiale, (3) comprendre les normes utilisées pour les permis de conduire numériques et, (4) comprendre les implications technologiques, juridiques et sociales liées de l'adoption des permis de conduire numériques.

Les permis de conduire numériques représentent une avancée majeure dans la transformation numérique des documents d'identité. Ces permis, stockées sur des appareils mobiles tels que les smartphones, permettent aux utilisateurs de prouver leur identité et leur droit de conduire sans dépendre de documents physiques. Le permis de conduire numériques se distinguent par leur sécurité, grâce au chiffrement avancé et a l'authentification biométrique, ainsi que la capacité offrir des mises à  jour en temps réel et un partage sélectif des données personnelles.

Toutefois, leur adoption grande échelle fait face à  des défis tels que l'infrastructure technologique, les préoccupations liées à  la protection des données personnelles et les besoins d'interopérabilité entre les juridictions. Malgré ces défis, les permis de conduire numériques s'imposent comme une solution innovante pour moderniser les systèmes d'identification et s'simplifier l'accès aux services publics.

L'adoption des permis de conduire numériques progresse de manière inégale à  travers le monde, reflétant des disparités dans les priorités, les infrastructures et les cadres réglementaire. En Amérique, les États-Unis font figure de pionniers, avec des initiatives soutenues par des partenariats public privé et l'intégration des outils comme Apple Wallet. Cependant, des défis liés à  l'interopérabilité et aux infrastructures freinent une adoption homogène. Au canada les efforts sont axés sur la mise en place des cadres de gouvernance pour assurer une adoption sécurisée et respectueuse des droits des citoyens, bien que les permis numériques ne soient pas encore opérationnels. En Amérique de sud, le Brésil se démarque par sa large adoption tandis que le Paraguay rencontre des défis réglementaires malgré la reconnaissance légale récente des permis numériques.
Dans la région Asie-Pacifique et moyen orient, Le déploiement des permis de conduire numériques progressent rapidement. En Asie, la Corée de sud a déployé cette technologie l'échelle nationale en 2022, en s'appuyant sur la chaine des blocs et des technologies cryptographiques avancées pour garantir la sécurité. Le Singapour intègre les permis numériques dans la plateforme singapass, facilitant l'accès sécurisé aux services publics. L'Australie voit une adoption rapide des permis numériques dans les états comme Queensland, alignées sur les standards ISO. La Nouvelle Zélande expérimente une application pilote pour simplifier l'accès aux services publics. Pour la région de moyen orient, Dubaï et l'Arabie saoudite ont lancé des initiatives pour les permis de conduite numérique intégrant des technologies comme la biométrie, permettant un accès en ligne et hors ligne pour moderniser les services publics.

En Europe, l'union européenne travaille sur l'interopérabilité et sécurité des permis de conduire numérique grâce aux normes eIDAS, harmonisant leur utilisation dans ses états membres. Des pays comme la France et le Portugal ont déployé des solutions juridiquement équivalentes aux documents physiques. L'Ukraine, malgré la guerre, se distingue avec son application Diia, qui centralise plusieurs documents numériques, dont les permis de conduire. Tandis que, des pays comme République tchèque et Royaume uni développent activement leurs solutions nationales.

En Afrique, l'adoption des permis de conduire numériques est encore émergente, avec des initiatives comme celle de l'Afrique du Sud, qui prévoit de lancer des mDL intégrant des fonctionnalités biométriques pour renforcer la sécurité et réduire la fraude d'ici 2025. Le Nigeria a également introduit des permis numériques via une application mobile, facilitant leur accessibilité tout en modernisant les services gouvernementaux.

Les normes et les protocoles encadrant les permis de conduire numériques s'articulent autour d'un écosystème complexe et en constante évolution. La norme ISO/IEC 18013-5 établit des fondements techniques, définissant les spécifications essentielles pour la sécurité, l'interopérabilité et la protection des données, tandis que la norme ISO/IEC 18013-7 en cours de développement vient potentiellement la compléter en ajoutant des fonctionnalités pour les interactions en ligne. Ces normes techniques sont soutenues par des cadres réglementaires régionaux comme le règlement eIDAS en Europe et les directives AAMVA au États-Unis, qui assurent l'harmonisation et la reconnaissance mutuelle des systèmes. Au Canada, les commissariats à  la protection de la vie privée ont établi des principes concernant la protection des données personnelles.

Malgré l'existence de ces normes internationales, Il est important de noter que de nombreuses initiatives des permis de conduire mobiles identifiés dans notre analyse suivent des standards nationaux plutôt que la norme ISO. Cette divergence souligne un défi majeur de l'interopérabilité internationale future des solutions des permis de conduire mobiles. Notre analyse n'a pas permis d'identifier clairement quelle approche internationale ou nationale serait la plus approprié. Cette question reste ouverte et nécessitera une évaluation continue à fur et à mesure que ces différentes approches démontrent leur efficacité dans la pratique.
L'analyse PESTEL des permis de conduire numériques met en lumière divers enjeux liés à leur adoption. Sur le plan politique, le canada fait face à des défis liés à son système fédéral, qui peut freiner l'interopérabilité. Économiquement, l'investissement initial pour la mise en place des infrastructures et la formation est élevé, mais des partenariats publics privé et l'optimisation administratives offrent un potentiel économique à long terme. Sur le plan social, l'inclusion numériques est essentielle pour éviter une fracture numérique qui pourrait exclure les populations marginalisées, comme les personnes âgées ou les communautés rurales. La sensibilisation, l'accompagnement, et le maintien des permis physiques sont cruciaux pour une adoption équitable.
D'un point de vue technologique, les défis incluent la cybersécurité, amplifié par l'ingénierie sociale, ou des tactiques sophistiquées exploitent la psychologie humaine pour accéder aux informations sensibles. Ces menaces s'ajoutent aux défis liés aux deepfakes et à l'informatique quantique, qui pourraient compromettre la sécurité des systèmes existants. Sur le plan environnemental, bien que la transition réduise l'utilisation de matériaux physiques, elle accroît les déchets électroniques à cause du renouvellement des appareils mobiles. Enfin, sur le plan légal, le projet de loi 82 au Québec propose un cadre centralisé pour la gestion des données numériques, mais cette approche soulève des préoccupations en matière de protection des renseignements personnels et de cohérence avec d'autres lois comme la loi 25.
Pour conclure, les permis de conduire numériques incarnent une avancée prometteuse vers une identification moderne et sécurisée. Malgré des défis d'interopérabilité, de sécurité et d'inclusion, leur adoption croissante témoigne de leur potentiel à simplifier l'accès aux services publics tout en répondant aux exigences de la transformation numérique. Une mise en œuvre réussie dépendra d'un équilibre entre innovation, réglementation harmonisée et inclusion sociale.

# Introduction

La direction des technologies émergentes et innovation en collaboration avec la Société de l'Assurance Automobile de Québec (SAAQ) a été mandatée pour effectuer une veille stratégique sur les permis de conduire numérique. Les permis de conduire numériques représentent une évolution signification dans la gestion et la vérification des identités des conducteurs cette transition vers le numérique permet d'améliorer la sécurité et l'efficacité administrative. Cependant, cette transition soulève également des questions importantes sur la protection de la vie privée, la sécurité des données et l'interopérabilité de ce type d'identifiant numérique. Dans un contexte ou la transition vers le numérique des services gouvernementaux s'accélère, comprendre les enjeux, les défis et les opportunités liés aux permis de conduire numériques devient crucial pour toute juridiction envisageant leur adoption.
**Objectif de la veille**
L'objectif principal de cette veille est de fournir un aperçu et une analyse de l'écosystème des permis de conduire numérique au niveau mondial. Cette veille servira de base pour éclairer les décisions stratégiques concernant le développement et la mise en œuvre potentiel d'un système de permis de conduire numérique.
Objectifs spécifiques de la veille :
-   Identifier les avantages et les inconvénients liés à la mise en œuvre des permis de conduire numériques
-   Aperçu sur l'état actuel de l'adoption des permis de conduire numériques à l’échelle mondiale
-   Comprendre les normes utilisées pour les permis de conduire numériques
-   Comprendre les implications technologiques, juridiques et sociales liées de l'adoption des permis de conduire numériques
**Processus de veille et de collecte de données**

Nous avons mis en place un processus pour collecter les données pertinentes pour notre veille sur les permis de conduire numériques, ayant recours à l'outil Inoreader. Voici les principales étapes que nous avons suivies :
1.  Identification des mots clés : nous avons défini les mots clés à explorer avec les collaborateurs du projet.

2.  Recensement manuel des sources : nous avons identifié les sites, les blogs et les sources d'information pertinentes pour notre veille. Cela nous a permis de constituer une base de données initiale des sources pertinentes à surveiller.
3.  Intégration dans Inoreader : après l'identification des sources, elles ont été intégrées dans l'outil Inoreader, qui permet d'agréger et de filtrer les nouvelles informations en fonction des mots clés prédéfinis.
4.  Analyse des articles : nous analysons les articles collectés par Inoreader en fonction de leur pertinence et nous les intégrons dans une fiche d'analyse hebdomadaire.
5.  Synthèse hebdomadaire : les articles recensés durant la semaine sont résumés pour avoir les principaux faits et tendances observées.
La période de recensement des articles s'est déroulée du **8 juillet au 2 septembre**. À la fin de cette phase, nous avons commencé la synthèse des résultats de la veille qui est maintenant compilée dans ce rapport.
## Permis de conduire numériques 
Un permis de conduire numérique (En anglais : Mobile Driver's License (mDL)) est une version numérique ou électronique du permis de conduire traditionnel qui est stockée et affichée sur un appareil mobile, comme un téléphone intelligent ou une tablette. Tout comme le permis de conduire traditionnel, le permis numérique permis à ses détenteurs de prouver divers aspects de leur identité, notamment son droit de conduire, son âge et son identité sans avoir à transporter de documents physiques. Les permis de conduire numériques offrent un niveau d'authenticité élevé. [^1], [^2], [^3]
Le permis de conduire numérique peut être sous forme d'application ou de fichier en temps d'exécution sécurisé, délivrés par les autorités responsables. Ces permis peuvent être vérifiés par les lecteurs de permis numériques ou les dispositifs d'inspection de l'identité, conformément aux normes internationales, telles que l'ISO 18013-5. Les permis de conduire numériques servent à l’identification en ligne et hors ligne, ce qui leur permet d'être rapidement inspectés par les forces de police, les aéroports et l'accès aux services commerciaux.\[4\]
Le mDL fonctionne grâce à un écosystème impliquant trois parties : l’émetteur (souvent le département des véhicules à moteur de l’État), le détenteur (la personne dont l’identité est confirmée), et le vérificateur (comme un agent de la police ou un contrôleur dans un aéroport). L’émetteur délivre le mDL via une application mobile, le signant numériquement pour en garantir l’authenticité. Le vérificateur utilise ensuite un lecteur de mDL pour scanner les informations et les vérifier, soit directement depuis le téléphone intelligent du détenteur, soit via un serveur de l’émetteur \[1\], \[5\].
## Avantages et inconvénients des permis de conduire numériques

### Les avantages : 

**Sécurité:**

Les mDL assurent une sécurité accrue pour les conducteurs en intégrant un cryptage de pointe et une authentification multi-facteurs, incluant l'empreinte digitale ou la reconnaissance faciale. Ces facteurs compliquent considérablement la falsification et protègent les données personnelles des titulaires de mDL contre tout accès non autorisé, réduisant ainsi le risque de vol d’identité ou de compromission des informations. Les permis numériques se distinguent par la protection supplémentaire offerte grâce à leur haut niveau de sécurité, que les permis de conduire traditionnels ne fournissent pas \[6\], \[7\], \[8\].

**Accessibilité :**

La praticité des permis de conduire numériques, en étant stockés directement dans le téléphone intelligent, élimine le besoin de transporter un document physique Les vérifications d'identité peuvent alors être effectuées plus rapidement et en toute transparence lors des contrôles routiers, dans les aéroports, ou lors de l'achat de produits réglementés tels que l'alcool. De plus, le fait que les smartphones soient toujours à portée de main réduit le risque de perdre des documents importants ou de les oublier dans les situations quotidiennes.

**Mises à  jour en temps réel:**

L'actualisation des permis de conduire numériques se fait en temps réelle par l'organisme émetteur, contrairement au permis de conduire physique qui ne peuvent être mis à jour qu'avec des modifications physiques dans les bureaux des autorités émettrices, ce qui assure l'actualisation des informations détenues, telles que le statut légal du permis. Cela élimine presque entièrement le risque d’informations incorrectes qui peut survenir à  cause du délai entre l’émission et la vérification du permis. Ce système rend l’identification de l’individu beaucoup plus fiable pour le vérificateur \[3\].

**Partage sélectif des données :**

Les permis de conduire numériques permettent aux titulaires de gérer avec précision les informations qu'ils souhaitent partager avec les vérificateurs. Par exemple, le titulaire peut prouver son âge sans révéler d'autres données personnelles comme l'adresse ou le numéro de permis. Cette capacité renforce la confidentialité et réduit l'exposition non désirée des informations, tout en répondant aux exigences spécifiques de divers cas de vérification d'identité \[6\],\[8\].

**Contrôle des utilisateurs :**

Les permis de conduire numériques offrent aux utilisateurs un plus grand contrôle sur leurs informations personnelles, car ils peuvent les bloquer ou les désactiver en cas de perte ou de vol de leur téléphone intelligent. Contrairement aux permis de conduire physiques, cette fonctionnalité permet de sécuriser instantanément les données et de réduire l'exposition des informations sensibles, offrant ainsi une sécurité accrue et une garantie supplémentaire contre la fraude \[9\],\[10\], \[11\]â€‹.

### Les inconvénients et défis:

**Problème de sécurité:**

Bien que les permis de conduire numériques soient basés sur des
protocoles de d'identité et à  d'autres menaces, telles que la
vulnérabilité aux attaques de type « man in the middle» ou le piratage
des bases de données \[1\], \[8\], \[12\]. Par exemple, la cyberattaque
de 2023 a entraîné la divulgation des données personnelles de tous les
titulaires de permis de conduire en Louisiane \[1\].

**Problèmes d'infrastructure et dépendance à  la technologie :**

La vérification efficace des permis de conduire numériques dépend de la
disponibilité d’une infrastructure appropriée, comme des lecteurs
numériques et des appareils de communication en champ proche (Near Field
Communication (NFC)) dans divers endroits. Par exemple, l’Illinois a
accepté l'utilisation des permis de conduire numériques, mais l’Ohio ne
les accepte pas pour le vote, il n'y a pas de lecteurs de permis de
conduire numériques dans les bureaux de vote \[13\]. Ainsi, l'absence
d’une infrastructure adéquate freine l’adoption des permis de conduire
numériques, indiquant que certaines régions pourraient ne pas être
prêtes à  utiliser cette technologie faute d’équipements appropriés.

L'accès aux permis de conduire numériques est restreint aux smartphones,
ce qui représente un défi pour les personnes qui ne disposent pas de cet
appareil ou qui ne les utilisent pas fréquemment. Il est possible que
cette dépendance à  la technologie exclue certains groupes de la
population, tels que les personnes âgées (voir Figure 1), celles à 
faibles revenus, ou celles vivant dans des régions oà¹ l’accès à  la
technologie est restreint. L'implémentation exclusive des permis de
conduire numérique, en l'absence des solutions alternatives, pourrait
marginaliser ces groupes et accentuer la fracture numérique.

<figure>
<img src="media/image1.png" style="width:6in;height:2.48681in"
alt="Une image contenant texte, capture dâ€™écran, diagramme, Tracé Description générée automatiquement" />
<figcaption><p><span id="_Ref181953203" class="anchor"></span>Figure 1:
Évolution de taux d'adoption des appareils mobiles par groupe d'âge au
Québec (extrait du rapport de l'académie de la transformation
numérique)<a href="#fn1" class="footnote-ref" id="fnref1"
role="doc-noteref"><sup>1</sup></a></p></figcaption>
</figure>
<section id="footnotes" class="footnotes footnotes-end-of-document"
role="doc-endnotes">
<hr />
<ol>
<li id="fn1"><p><a
href="https://transformation-numerique.ulaval.ca/wp-content/uploads/2022/09/netendances-2020-usage-des-appareils-mobiles-au-quebec.pdf">https://transformation-numerique.ulaval.ca/wp-content/uploads/2022/09/netendances-2020-usage-des-appareils-mobiles-au-quebec.pdf</a><a
href="#fnref1" class="footnote-back" role="doc-backlink">â†©ï¸Ž</a></p></li>
</ol>
</section>

**Interopérabilité**:

L'un des principaux enjeux des permis de conduire numériques est
l'interopérabilité, ce qui signifie que les mDL doivent être reconnus et
vérifiés de manière homogène dans différentes juridictions, états et
pays. Cela est réalisé en rendant les mDL compatibles avec divers
systèmes et équipements de vérification à  l'aide de protocoles
standardisés et conformes aux normes internationales. Le recours à  des
normes international tel que ISO/IEC 18013-5 pourrait d'assurer cette
interopérabilité en facilitant une lecture et une vérification
standardisées des permis numériques à  l’échelle mondiale. Mais, la mise
en œuvre de cette norme varie d'un état à  l'autre, et tous ne sont pas
encore en mesure d'investir dans l’infrastructure requise \[6\], \[8\],
\[14\], \[15\], \[16\]**.**

**Gestion des données personnelles :**

La vie privée est l'une des principales préoccupations de cette
technologie, car les informations personnelles sensibles collectées sont
échangées d'un appareil à  l'autre électroniquement. Les utilisateurs
peuvent craindre que leurs données soient mal gérées, mal stockées ou
qu'elles puissent être piratées \[8\], \[12\], \[17\], \[18\], \[19\].
Par exemple, les groupes de protection de la vie privée s'inquiètent de
la collecte excessive de données par l'agence nationale américaine de
sécurité dans les transports (Transportation Security Administration
(TSA)), qui pourrait augmenter la surveillance et le risque d'attaque
\[20\].

**Acceptation et adoption :**

Les permis de conduire numériques peuvent être largement acceptés si les
citoyens, les entreprises, les agences gouvernementales et les forces de
l'ordre les reconnaissent pour valider l’identification. Cependant, des
inquiétudes subsistent quant à  l'utilisation des données personnelles et
a la capacité accrue de surveillance. Le succès de déploiement national
des permis numériques repose sur des piliers essentiels : une campagne
efficace de sensibilisation aux avantages et à  la sécurité du système,
ainsi qu'un soutien gouvernemental concret, a l'image de l'approche
américaine combinant législation et allocation des ressources \[15\],
\[21\].

**Problèmes légaux :**

Étant donné que les permis de conduire numérique est une technologie
émergente, la législation concernant son utilisation et vérification est
encore en développement. Ainsi, les conditions d'utilisation, la
validité légale ainsi que les protections légales offertes nécessitent
toujours des analyses et des réponses. Les incertitudes concernant ces
éléments soulignent la complexité d'un déploiement à  grande échelle. De
ce fait, une normalisation des réglementations s'avère nécessaire pour
garantir que cette technologie devient une forme d'identification
fiable, largement répandue et sécurisés\[10\], \[15\].

## Cycle de vie d'un permis de conduire numérique (inspiré du AAMVA)

Le cycle de vie d'un permis de conduire englobe plusieurs phases,
passant de l'émission jusqu'à  la révocation éventuelle, en passant par
la gestion de validité et ses mécanismes de mises à  jour, pour garantir
l'intégrité et la sécurité du permis de conduire numérique. La Figure 1
illustre les 4 phases de cycle de vie d'un permis de conduire
numériques. Les détails de chaque phase seront expliqués dans les
sections suivantes.

<figure>
<img src="media/image2.png" style="width:3.04827in;height:1.82153in" />
<figcaption><p><span id="_Ref181265638" class="anchor"></span>Figure 2:
Cycle de vie permis de conduire numérique (inspiré du document AAMVA)<a
href="#fn1" class="footnote-ref" id="fnref1"
role="doc-noteref"><sup>1</sup></a></p></figcaption>
</figure>
<section id="footnotes" class="footnotes footnotes-end-of-document"
role="doc-endnotes">
<hr />
<ol>
<li id="fn1"><p><a
href="https://www.aamva.org/getmedia/261ed16b-3f5c-4678-a2db-cc3016934234/MobileDLImplementationGuidelines-Version1-3.pdf">https://www.aamva.org/getmedia/261ed16b-3f5c-4678-a2db-cc3016934234/MobileDLImplementationGuidelines-Version1-3.pdf</a><a
href="#fnref1" class="footnote-back" role="doc-backlink">â†©ï¸Ž</a></p></li>
</ol>
</section>

### Émission

Le processus d'émission d'un permis de conduire numérique commence par
une vérification rigoureuse de l'identité. Contrairement à  la version
traditionnelle, cette étape initiale requiert une attention particulière
à  la sécurité numérique. L'autorité émettrice doit s'assurer non
seulement de l'identité du demandeur, mais également la sécurité et
l'adaptabilité du dispositif qui accueillera le permis de conduire
numérique.

La vérification de l'identité repose sur une approche multi facteurs. Le
facteur incontournable est la biométrie. En fait, le demandeur doit
correspondre aux données biométriques déjà  enregistrées dans le système
d'autorité émettrice. Cette étape est renforcée grâce à  au moins un
autre facteur de vérification, qui peut être soit la possession d'un
élément physique (comme le permis de conduire physique), soit la
connaissance d'informations spécifiques vérifiables.

L'émission, étape technique, s'effectue via un canal de communication
sécurisé. Cette phase est cruciale car elle doit garantir que les
informations sensibles arrivent sur l'appareil du bon titulaire. Lors du
provisionnement, l'autorité émettrice doit notifier la personne via un
moyen autre que l'appareil concerné, comme par courriel, lettre, pour
confirmer l'émission du mDL.

### Validation

Les permis de conduire numérique se distinguent des permis de conduire
traditionnels par leur innovation en matière de gestion de validité des
permis. IL existe deux types de validité : la validité technique et la
validité légale. Cette dualité offre un meilleur contrôle ainsi qu'une
meilleure sécurité. La validité légale correspond à  la période de la
carte physique, qui peut être une ou plusieurs années. Cette durée
reflète les droits effectifs du conducteur.

En revanche, la validité technique, qui est sous le contrôle de l'objet
de sécurité mobile (MSO), fonctionne en cycle beaucoup plus courts :
typiquement 30 jours. Ce mécanisme assure une sécurité accrue en
nécessitant des mises à  jour régulières. Ces mises à  jour permettent de
vérifier que le titulaire est toujours en possession de ses droits et
que son permis de conduire numérique n'a pas été compromis.

### Mise à jour 

Les permis de conduire numérique, tout comme les permis physiques,
nécessitent des mises à  jour. Ces mises à  jour peuvent être déclenchées
par différents évènements : révocation du privilège de conduire,
changement d'adresse, etc. Les deux méthodes principales de mise à jour
sont : méthode de récupération serveur et méthode de récupération
appareil.

La méthode de récupération serveur, une méthode optionnelle, établit une
connexion directe avec l'infrastructure de l'autorité émettrice lors de
chaque vérification.

La méthode de récupération appareil implémente trois mécanismes de mises
à  jour : (1) mécanisme mise à jour manuelle : ce mécanisme donne le
privilège au titulaire la maitrise du processus de mise à jour via une
interface dédiée dans l'application. (2) mécanisme mise à jour
automatique : cette fonctionnalité permet une actualisation programmée
des données, sous réserve du consentement explicite du titulaire.
L'automatisation est supervisée par des paramètres de configuration
définis. (3) mécanisme Push : ce mécanisme permet à  l'autorité émettrice
d'exercer un contrôle direct sur le mdl dans des *situations* critiques.
Dans ce cas, le titulaire doit être informé de cette action.

### Révocation

La fin de vie d'un permis de conduire numérique peut survenir de
différentes manières :

La révocation administrative intervient dans des cas comme le
non-renouvellement du permis, des infractions, etc. Cette procédure suit
un protocole strict pour garantir que le titulaire ne puisse plus
utiliser le document révoqué.

La révocation technique peut être déclenchée par une compromission de
sécurité, une incompatibilité technique majeure ou la nécessité d'une
mise à jour critique. Dans ce cas, le système privilégie la sécurité en
bloquant l'utilisation du permis de conduire numérique jusqu'à  la
résolution du problème.

La révocation d'urgence s'applique dans des situations comme le vol de
l'appareil ou la détection d'une utilisation frauduleuse. Cette
procédure peut être initiée rapidement pour minimiser les risques.

## Portefeuille: portrait des initiatives à travers le monde

### Amérique

États-Unis :

L'adoption des permis de conduire numériques aux États-Unis est en
augmentation, mais elle manque d'uniformité à  travers le pays ( comme on
peut le remarqué dans la Figure 3) \[13\], \[15\], \[22\], \[23\],
\[24\], \[25\]. La Californie, l'Arizona, la Géorgie et la Virginie font
figure de pionniers en collaborant avec des entreprises privées comme
Apple et Idemia pour intégrer les permis de conduire numériques dans des
applications telles qu'Apple Wallet \[6\], \[26\], \[27\]. Ces
partenariats visent à  renforcer la sécurité grâce à  des technologies
biométriques telles que la reconnaissance faciale et la cryptographie,
tout en offrant aux utilisateurs la commodité de leurs téléphones
intelligents. L'objectif est de moderniser les processus
d'identification, notamment dans des environnements numériques comme les
aéroports.

<figure>
<img src="media/image3.png" style="width:6in;height:4.41875in"
alt="Une image contenant texte, carte, graphisme, Graphique Description générée automatiquement" />
<figcaption><p><span id="_Ref183183856" class="anchor"></span>Figure 3:
Portrait des initiatives au états unis<a href="#fn1"
class="footnote-ref" id="fnref1"
role="doc-noteref"><sup>1</sup></a></p></figcaption>
</figure>
<section id="footnotes" class="footnotes footnotes-end-of-document"
role="doc-endnotes">
<hr />
<ol>
<li id="fn1"><p><a
href="https://www.aamva.org/jurisdiction-data-maps#anchorformdlmap">https://www.aamva.org/jurisdiction-data-maps#anchorformdlmap</a><a
href="#fnref1" class="footnote-back" role="doc-backlink">â†©ï¸Ž</a></p></li>
</ol>
</section>

Cependant, plusieurs freins limitent l'adoption généralisée \[15\]. Le
manque de politique fédérale unifiée entrave l’interopérabilité entre
les États. Par exemple, en Ohio, bien que les mDLs soient lancés, le
manque de lecteurs dans certains bureaux de vote reste un obstacle
majeur \[13\]. Les efforts de l'AAMVA, à  travers National Trust Service,
pour faciliter l'interopérabilité n'a pas encore résolu tous les défis
liés à  la standardisation et à  la reconnaissance mutuelle entre les
états.

L'adoption des permis numériques est fortement soutenue par L'adoption
des permis numériques est fortement soutenue par l'agence nationale
américaine de sécurité dans les transports (Transportation Security
Administration (TSA)), en intégrant leur utilisation dans les aéroports
américains comme New York et Arizona, etc. \[9\]. Grâce à  la technologie
Credential Authentication Technology (CAT-2), la TSA peut lire et
vérifier les permis de conduire numériques en temps réel via une
connexion sécurisée, améliorant ainsi l'efficacité des contrôles
d'identité. La reconnaissance faciale est également utilisée pour
comparer les photos des passagers à  celles figurant sur les permis de
conduire numériques, garantissant une vérification précise. La
protection des données est assurée par la suppression immédiate après
vérification. Cette innovation facilite aujourd'hui les déplacements de
70 millions de citoyens.

Les avancées dans le domaine des permis numériques ne dissipent pas
toutes les inquiétudes. L'utilisation de la biométrie suscite notamment
des préoccupations, Par exemple, l'Electronic Frontier Foundation (EFF)
mettent en garde contre les risques de la collecte excessive de
informations personnelles, soulignant la nécessité d’une réglementation
stricte pour protéger la vie privée des utilisateurs \[18\].

Le soutien fédéral, promis par la Maison-Blanche \[21\], pourrait
accélérer l'adoption des permis de conduire numériques à  l'échelle
nationale. Des cadres législatifs et des ressources permettraient de
surmonter les obstacles techniques et infrastructurels, tout en
renforçant la sécurité et la confiance des utilisateurs. De plus, le
Département de la Sécurité intérieure des États-Unis (Department of
Homeland Security (DHS)) forme activement les forces de l'ordre pour
qu'elles puissent utiliser ces nouveaux systèmes et lutter contre les
crimes liés aux identifiants numériques \[28\].

En conclusion, bien que des progrès aient été réalisés dans l'adoption
des permis de conduire numériques aux États-Unis, des défis subsistent
en matière d'infrastructure, de normalisation et de protection des
données. Les partenariats public-privé sont essentiels pour développer
ces technologies, mais un soutien fédéral est crucial pour garantir une
adoption généralisée et répondre aux préoccupations liées à  la sécurité
et à  la confidentialité.

Canada

Le Canada adopte une approche structure pour les permis de conduire
numériques, appuyée par le cadre de gouvernance CANdy [^1]. Ce cadre est
élaboré par les gouvernements de Québec, de la Colombie Britannique et
de l'Ontario en collaboration avec IBM consulting. Ce cadre établit les
principes et les politiques pour gérer un registre distribué commun,
visant a renforcé la confiance numérique et l'interopérabilité.

L'entente entre la Colombie Britannique en 2023 illustre cette
collaboration en rendant leurs services d'identité interopérables[^2].
D'ailleurs un colloque fédéral provincial de 2024 a souligné
l'importance de moderniser les services publics tout en garantissant la
cybersécurité[^3], ce qui souligne l'engagement collectif pour un
écosystème numérique harmonisé.

En février 2023, la société de l'assurance automobile du Québec (SAAQ) a
lancé de nouveaux services en ligne permettant aux citoyens de
renouveler leur permis de conduire et d'effectuer d'autres transactions
numériquement [^4][^5]. Toutefois, la version électronique officielle de
permis de conduire n'est pas encore disponible. Par ailleurs, le projet
de loi 82 vise à  encadrer la gestion de l'identité numérique au Québec
en établissant un registre centralisé sous la gouvernance de ministère
de cybersécurité et Numérique, ce qui pourrait faciliter le
développement futur des permis numériques.

<figure>
<img src="media/image4.png" style="width:5.39398in;height:4.13476in"
alt="Une image contenant carte, texte Description générée automatiquement" />
<figcaption><p><span id="_Ref183793129" class="anchor"></span>Figure 4:
Portrait des initiatives au Canada<a href="#fn1" class="footnote-ref"
id="fnref1" role="doc-noteref"><sup>1</sup></a></p></figcaption>
</figure>
<section id="footnotes" class="footnotes footnotes-end-of-document"
role="doc-endnotes">
<hr />
<ol>
<li id="fn1"><p><a
href="https://www.aamva.org/jurisdiction-data-maps#anchorformdlmap">Jurisdiction
Data Maps - American Association of Motor Vehicle Administrators -
AAMVA</a><a href="#fnref1" class="footnote-back"
role="doc-backlink">â†©ï¸Ž</a></p></li>
</ol>
</section>

L'Ontario a introduit le programme d'identité numérique ontarienne qui
propose une version numérique sécurisée des documents d'identité émis
par le gouvernement, incluant éventuellement les permis de conduire. Ces
documents peuvent être enregistrée dans un portefeuille numérique sur
des dispositifs personnels, comme les téléphones. Cette solution offre
la possibilité de prouver son identité tout en protégeant la vie privée
grâce à  un chiffrement et au contrôle total des utilisateurs sur les
informations partagées. Depuis son annonce en 2021, La province a fait
des avancées en diffusant des outils techniques, en menant des
consultations publiques et en lançant des projets pilotes, notamment
dans le domaine de la santé [^6]. Cependant, il est important de noter
qu'à  ce jour la province ne dispose pas encore de permis de conduire
numérique en phase production.

Pour résumer, malgré ces progrès, les permis de conduire n'est pas
encore en phase opérationnelles dans les provinces canadiennes (voir
Figure 4). Les efforts se concentrent encore sur la mise en place des
bases juridiques et organisationnels pour garantir une adoption
sécurisée, interopérable et respectueuse des droits des citoyens.

Amérique de Sud :

Le Brazil est considéré comme un pionnier en Amérique du Sud dans
l'adoption des permis de conduire numériques, bien que les normes
utilisé restent inconnues [^7] [^8]. Depuis 2019, la version mobile est
disponible pour 60 millions de conducteur brésiliens. Cette initiative
vise à  accélérer les contrôles des autorités. Il est aussi possible de
télécharger le permis sous format PDF et l'utiliser comme moyen
d'identification valable dans endroits comme les banques et les agences
de location de voiture.

Le Paraguay a récemment introduit les permis de conduire mobiles,
reconnus légalement depuis l'adoption de la loi n° 7177/2023 en octobre
2023 [^9]. Bien que cette législation établisse une base juridique pour
les identités numériques, elle s'accompagne de préoccupations
importantes en raison de l'absence de réglementation adéquate. Selon
l'Association pour la technologie, l’éducation, le développement, la
recherche et la communication (TEDIC), les lacunes majeures sont :
l'absence de cadre légal de protection des données et le maintien de
l'émission des documents d'identité sous le contrôle des agences
policières. Bien que promoteurs, les permis de conduire numériques au
Paraguay nécessitent des réformes pour garantir leur fiabilité et le
respect des droits des citoyens.

### Asie-pacifique

L'adoption des permis de conduire numériques progresse rapidement dans
la région Asie-Pacifique, bien que la mise en œuvre varie d'un pays à 
l'autre.

En Corée du Sud, les permis de conduire numériques ont été lancés en
janvier 2022 avec un programme pilote, suivi d'un déploiement national
en juillet 2022 \[29\].L'alliance entre les autorités gouvernementales
et les forces de police nationale a conduit au développement d'un permis
de conduire numérique sécurisé, reposant sur la chaine des blocs
(blockchain) et des solutions cryptographiques avancés. Les citoyens
peuvent utiliser ces permis de conduire numériques dans divers contextes
que ce soit en ligne ou hors ligne, notamment les institutions
financières et les aéroports.

Le Japan prépare le déploiement de son permis de conduire numérique,
marquant une avancée dans sa transition numérique [^10]. Bien qu'aucun
calendrier précis n'était annoncé, le gouvernement a exprimé son
ambition de mettre en œuvre cette technologie rapidement. Cette
initiative d'appuie sur la carte d'identité nationale MY Number, qui
deviendra également un permis de conduire a partie de 24 mars 2025, avec
des informations intégr.es sur sa puce électronique.

Le Singapour a démarré l'intégration des permis de conduire numériques
dans sa plateforme numérique gouvernementale, Singpass \[30\].
Actuellement, les citoyens peuvent déjà  accéder à  divers services
publics et privés via cette plateforme. Cette initiative vise à 
renforcer l’inclusion numérique et la sécurité des données, tout en
facilitant l'accès des citoyens aux services gouvernementaux.

Le LTMS (Land Transportation Management System) des Philippines
représente une avancés dans la dématérialisation des permis de conduire.
Cette solution permet aux citoyens d'accéder directement à  leur permis
numérique (eDL) via leur téléphone \[31\], \[32\]. Ce système simplifie
la vérification des permis par les forces de l’ordre, qui peuvent
scanner un code QR pour vérifier les informations des conducteurs. L'eDL
bénéficie d'une reconnaissance légale équivalente à  la version physique,
et son accès est sécurisé par l'application LTMS. Récemment, les
Philippines ont intégré la plateforme HID Global dans leur application
d’identité numérique, conforme aux normes ISO, renforçant
l’interopérabilité et la sécurité des identifiants numériques pour une
utilisation nationale et internationale \[33\].

Dubai a récemment lancé son permis de conduire mobile, permettant à  ses
résidents de stocker et d’accéder à  leur permis de conduire via une
application mobile \[34\]. L'initiative vise à  réduire la dépendance aux
documents physiques en faveur de versions numériques, intégrant des
données biométriques pour renforcer la sécurité et prévenir la
falsification. Ce programme fait partie d’un effort plus vaste de
transformation numérique des services publics à  Dubai.

En Arabie Saoudite, la dématérialisation de permis de conduire s'opère à 
travers les plateformes Absher et Tawakkalna \[35\], \[36\],
privilégiant l'accès en ligne et hors ligne via un code QR. En
collaboration avec l'Autorité saoudienne des données et de
l'intelligence artificielle (SDAIA), ce service vise à  accroître la
productivité gouvernementale et la satisfaction des citoyens, tout en
offrant une alternative sécurisée aux documents physiques.

Plusieurs États australiens s'inscrivent dans cette tendance de
numérisation des services gouvernementales. Le Queensland a enregistré
plus de 500 000 téléchargements de permis de conduire numériques en sept
mois, ce qui représente une adoption rapide et une forte demande de la
part des citoyens \[6\]. Le permis de conduire numérique de Queensland
est le premier permis numérique en Australie aligné avec la norme
ISO/IEC18013-5 [^11]. En ce qui concerne la Nouvelle-Galles du Sud, elle
a investi 62,5 millions de dollars dans une plateforme de gestion
numérique des licences, servant de modèle pour une adoption nationale
harmonisée \[37\]. L'État de Victoria est sur le point de lancer un
projet pilote pour les permis de conduire mobiles (mDL) \[38\]. Cette
initiative s’inscrit dans la stratégie nationale visant à  moderniser
les processus d’identification et à  faciliter l’accès sécurisé aux
permis via des téléphones intelligents. En plus, la société MATTR aide à 
développer une plateforme interopérable conforme aux normes de sécurité
mondiales, facilitant l'adoption nationale \[39\].

En parallèle, la Nouvelle-Zélande, à  travers la New Zealand Transit
Agency (NZTA), a lancé une application pilote pour les permis de
conduire numériques, visant à  simplifier l’accès aux services
gouvernementaux comme l’enregistrement des véhicules et le paiement des
frais d’utilisation des routes \[40\]. Cette initiative, dirigée par
Judith Collins, encourage les citoyens à  participer à  l'amélioration du
système avant son lancement officiel.

### Europe 

L'Europe fait de rapides progrès en matière de déploiement du permis de
conduire mobile : plusieurs pays lancent des initiatives. L'Autriche a
inclus des permis de conduire mobiles dans son portefeuille numérique,
permettant aux citoyens de stocker leurs permis de conduire numériques
ainsi que d'autres documents comme la carte d'identité nationale et la
preuve d'âge. Au-delà  de l'automobile, ces documents numériques peuvent
être utilisés pour les contrôles d'identité tant par la police que dans
des situations privées. L'objectif derrière un tel système est
d'accroître la commodité de ses transactions administratives,
simultanément avec sa sécurité. Bref, l'ensemble du territoire s'efforce
de développer ses services publics modernes \[41\], \[42\].

La France et le Portugal ont fait des progrès significatifs en adoptant
des permis de conduire mobiles \[43\]. Les deux pays ont été en mesure
de permettre presque immédiatement des permis de conduire numériques
grâce à  des applications pour téléphones intelligents telles que France
Identité et id.gov pour le Portugal. Ces permis numériques sont
désormais juridiquement équivalents aux titres physiques grâce à  des
modifications législatives. L'application a été testée dans trois
régions avant d'être déployée dans tout le pays, et le Portugal ajoute
des fonctionnalités supplémentaires, telles que la preuve que la police
dispose d'une assurance automobile.

L'Estonie, connue pour son leadership en matière de services numériques,
a déclaré qu'elle autoriserait bientôt l'utilisation du permis de
conduire mobile via un téléphone intelligent \[44\], \[45\]. Les
citoyens pourront accéder à  leur document légal officiel, qu'il s'agisse
d'une carte d'identité ou d'un permis de conduire, via la plateforme
digitale du pays, nommée eesti.ee. Cette déclaration entre dans le cadre
de la stratégie digitale évoluée du pays, qui vise à  faciliter
l'accessibilité de ses services administratifs et à  renforcer la
sécurité digitale de ses citoyens. En parallèle, l’Estonie contribue
activement à  l’initiative européenne d’identité numérique en proposant
des solutions sécurisées et interopérables pour harmoniser l’identité
numérique à  travers l’UE \[46\].

La macédoine du Nord accélère sa transformation numérique avec le
lancement de l'application ELI, un portefeuille numérique permettant de
stocker cartes d'identité et permis de conduire numériques. Développée
dans le cadre du programme Digital Europe Programme, l'application est
reliée au portail portal.gov.mk, en cours de modernisation. Cependant,
des défis subsistent notamment un manque de compétences numériques chez
la population (32% de compétence de base malgré une connectivité de
80%). Pour répondre à  ces enjeux un nouveau ministre de la
transformation numérique a été créée en 2024, illustrant la volonté du
pays à  moderniser ses services publics et de renforcer son économie
numérique.

La République tchèque prévoit d'introduire la technologie permis de
conduire numériques via l'application eDokladovska \[47\], \[48\]. Le
plan est de convertir tous les documents d'identité, comme les permis de
conduire ou les cartes d'identité, en versions électroniques
téléchargeables sur les téléphones intelligents. L'application permet
des transferts de données sécurisés et non connectés basés sur des codes
QR et le Bluetooth. Même sans connexion Internet, les citoyens peuvent
vérifier l'identité des autres parties en quelques minutes. Le but
ultime est de rendre la gestion de documents plus efficace pour les
citoyens, tout en gardant un œil vigilant sur la sécurité et la
conformité avec les normes de l'ISO.

Le Royaume-Uni s'apprête à  lancer le développement des permis de
conduire mobiles pour l'année 2024 \[49\], \[50\]. Une telle innovation
se fera à  partir de l'application mobile qui remplacera les documents
physiques nécessaires aux citoyens britanniques, à  partir des licences
provisoires et des certificats MOT \[49\], \[51\]. Ces réformes font
partie de l'effort de numérisation du système de gestion des documents
et certificats autorisant la conduite et le désir de les rendre plus
accessibles pour les citoyens. Cependant, les options physiques
resteront également disponibles pour les citoyens qui le souhaitent. Les
expériences comme celle de Surrey montrent un grand intérêt pour cette
solution, car 90 % des utilisateurs les trouvent plus pratiques que les
documents traditionnels \[52\].

L'Ukraine est considéré comme un leader mondial en numérisation grâce à 
l'application Diia, lancé en 2019, qui permet d'accéder à  plusieurs
documents numériques, comme les permis de conduire numérique, avec la
même valeur légale que leurs équivalents physiques [^12]. L'application
continue à  se développer en offrant de nouvelles fonctionnalités comme
les documents d'évacuation numérique pour faciliter les déplacements
pendant la guerre. Le secteur informatique continue à  se développer dans
ce pays et représente 4% de PIB et environ 40% des exportations de
services du pays [^13]. Il est important aussi de souligner que
l'Ukraine repose sur des infrastructures héritées faciles restaurer en
cas d'attaque physiques et cybernétiques, ce qui permet de continuer à 
innover malgré les défis. Pour conclure, l'Ukraine montre que même en
période de crise, une stratégie numérique bien conçue peut transformer
l'accès aux services publics et renforcer la résilience économique.

L'Union européenne travaille à  l'établissement de normes intégrées pour
garantir la compatibilité entre les permis de conduire numériques dans
tous les États membres \[53\]. Cela crée un cadre réglementaire pour
l'interopérabilité en instaurant des permis de conduire numériques
conformes aux normes eIDAS (Electronic Identification, Authentication
and Trust Services) pour la protection des données électroniques. En
outre, le Conseil de l'UE a proposé d'instaurer des permis de conduire
numériques parfaitement équivalents aux versions traditionnelles, mais
avec davantage de capacités pour renforcer la sécurité routière et
faciliter les contrôles \[54\], \[55\]. Il s'agit d'une initiative au
sein de la proposition de refonte du permis de conduire de l'UE.

### Afrique

L'adoption des permis de conduire numériques en Afrique commence à 
émerger. En Afrique du Sud, le ministère a travaillé sur la création des
permis de conduire mobiles. Cette innovation sera lancée au cours de
l’exercice 2024/2025 \[29\], \[56\], \[57\], \[58\]. Le pays est
actuellement confronté à  des retards de production des permis de
conduire en raison de problèmes techniques, ce qui a conduit à  une
modernisation du système. L’idée de passer d’une version physique du
permis à  une version numérique a été développée. L’application sera
accessible via un téléphone intelligent, en complément de la carte
physique. De plus, de nouvelles cartes de permis seront émises avec des
fonctionnalités biométriques pour renforcer la sécurité et réduire la
fraude. Le ministère des Transports prévoit également de relier ces
cartes au système national d'information sur la circulation pour
garantir une vérification et une authentification sécurisées.

Dans le but de numériser les services gouvernementaux, le Nigeria a
introduit des permis de conduire numériques[^14], permettant à  tout
citoyen de recevoir et de télécharger une version numérique de son
permis via une application mobile \[59\]. Cette fonctionnalité facilite
l’accès au permis et réduit le risque de falsification d'identité en
offrant une alternative moderne et électronique aux permis
traditionnels.

## Dispositifs et technologies de contrôle et vérification des mDL

Les permis de conduire mobiles (mDL) sont une technologie à  enjeux
importants, avec plusieurs dispositifs et technologies associés pour
garantir leur protection et leur utilisation dans diverses conditions.
Les dispositifs reposent sur la cryptographie et la transmission
sécurisée, en intégrant des options comme les lecteurs NFC, Bluetooth et
biométriques. Voici une vue d’ensemble de ces technologies et des
exemples d’utilisation.

**Lecteur mDL sur téléphone intelligent :** Les lecteurs mDL sur
téléphone intelligent sont utilisés par les forces de l'ordre et les
entreprises pour vérifier les informations dans un permis de conduire
numérique sans nécessiter de lecteur spécialisé. Un exemple populaire
est l'application DMV Wallet en Californie \[60\], qui scanne le code QR
généré par l'application d'un utilisateur, déclenchant une vérification
cryptographique sans stockage de données sur l'appareil. Cette approche
accélère l'adoption, car elle ne nécessite pas de matériel spécifique en
dehors des téléphones intelligents.

**Lecteurs NFC et Bluetooth :** des entreprises, comme Socket Mobile
\[61\], propose des lecteurs avec NFC et Bluetooth pour lire
efficacement les permis de conduire numériques dans des environnements à 
connectivité limitée. Ces lecteurs sont utilisés dans des points de
contrôle comme les aéroports, les kiosques de libre-service, et les
boutiques. Ils permettent une vérification sécurisée des identifiants
sans l'utilisation d'équipement lourd et coà»teux. Grâce à  la technologie
NFC, ces lecteurs peuvent extraire les données du mDL, vérifier les
informations, puis effacer les données après utilisation.

**Credential Authentication Technology (CAT-2) :** Utilisé par la
‘Administration de la Sécurité des Transports (TSA) dans des aéroports
américains, le CAT-2 est conçu pour vérifier les permis de conduire
numériques en comparant la photo du permis avec une photo en temps réel
prise à  un point de contrôle. Cette technologie offre une vérification
rapide sans nécessiter de contact physique avec le document. Le CAT-2
utilise le NFC et le Bluetooth pour lire les mDLs, et est intégré aux
systèmes de sécurité de l’aéroport pour améliorer la fluidité des
processus de vérification \[9\]. Ce dispositif est utilisé dans des
aéroports comme Salt Lake City International, facilitant la vérification
des identités des voyageurs en quelques secondes \[62\].

<figure>
<img src="media/image5.jpeg" style="width:2.76351in;height:1.72688in"
alt="Une image contenant texte, ordinateur, écran dâ€™ordinateur, intérieur" />
<figcaption><p><span id="_Toc183860747" class="anchor"></span>Figure 5:
CAT 2</p></figcaption>
</figure>

**Lecteurs biométriques :** Pour garantir une plus grande sécurité, des
entreprises telles que HID Global et IDScan.net intègrent des lecteurs
biométriques dans leurs systèmes de permis de conduire numériques
\[63\], \[64\]. Ces dispositifs effectuent une double vérification via
empreintes digitales ou reconnaissance faciale, confirmant que le
titulaire est bien celui qu’il prétend être. Par exemple, le HID Signo
Biometric Reader combine l'authentification biométrique avec les options
NFC des permis de conduire numériques pour des applications sécurisées
dans des lieux à  haute sécurité tels que les aéroports \[64\].

## Normes et protocoles des permis de conduire

### ISO/IEC 18013-5 

La norme ISO/IEC 18013-5 \[65\], \[66\], \[67\], publié en septembre
2021, est une spécification internationale publiée par l’Organisation
internationale de normalisation (ISO). Elle définit les spécifications
techniques pour les permis de conduire mobiles, qui permettent de
stocker et de vérifier les informations d’identité à  partir de
dispositifs mobiles. Voici quelques éléments importants de cette norme :

-   **Modèle de données :** Cette norme spécifie le modèle de données
    pour les permis de conduire mobiles. Le modèle de données détermine
    la manière dont les informations d’identité, telles que les
    informations de permis de conduire, sont stockées, sécurisées et
    transférées sur les appareils mobiles.

-   **Présence de proximité :** Un aspect important de cette norme est
    la définition d’un mécanisme de présentation des informations du
    permis de conduire à  proximité. Cela permet à  un utilisateur de
    présenter son permis de conduire numérique en personne, par exemple
    à  un agent de police, sans avoir à  fournir son téléphone
    physiquement. Les technologies comme le NFC ou les codes QR
    sécurisés sont généralement utilisés pour ces échanges.

-   **Sécurité et confidentialité :** La norme aborde la sécurisation
    des données du permis de conduire en précisant les mécanismes de
    cryptographie qui protègent les informations sensibles lors de leur
    transfert ou leur stockage. La confidentialité des utilisateurs est
    également un point central, garantissant que les informations
    personnelles ne sont accessibles que par les parties autorisées.

-   **Interopérabilité :** L’un des objectifs majeurs de la norme est
    d’assurer l’interopérabilité entre différentes solutions de permis
    de conduire mobile à  travers divers systèmes de vérification. Cela
    permet aux permis d’être reconnus et vérifiés dans plusieurs
    juridictions ou par différents fournisseurs de services.

### ISO/IEC 18013-7

La norme ISO/IEC 18013-7 \[65\], \[66\], \[67\], en cours de
développement, vient compléter la norme ISO/IEC 18013-5 en ajoutant des
fonctions spécifiques pour les permis de conduire numériques. Alors que
ISO/IEC 18013-5 se concentre principalement sur la présentation de
proximité et l’utilisation des mDL pour les interactions physiques, la
norme ISO/IEC 18013-7 introduit des fonctionnalités supplémentaires pour
élargir l'utilisation des permis de conduire numériques, notamment en
ligne.

-   **Objectifs et Portée de la Norme**

La norme ISO/IEC 18013-7 vise à  couvrir les aspects non traités dans les
parties précédentes, en particulier la vérification des permis de
conduire numériques dans des scénarios en ligne et à  distance. Elle
propose des méthodes pour :

-   **Vérification en ligne:** Contrairement à  la norme ISO/IEC 18013-5
    qui se concentre sur la vérification de proximité (physique), cette
    nouvelle norme introduit des mécanismes pour l'utilisation des
    permis de conduire numériques dans des contextes en ligne. Cela
    permet aux détenteurs de permis de prouver leur identité à  distance,
    sans avoir à  être physiquement présents.

-   **Utilisation de standards ouverts :** L’un des objectifs
    principaux de cette norme est de permettre l’intégration avec des
    standards ouverts tels que OpenID for Verifiable Credentials et REST
    API pour la vérification des mDL en ligne. Ces intégrations
    facilitent la compatibilité avec les systèmes existants, renforçant
    l’adoption des permis de conduire numériques dans divers secteurs,
    comme les services gouvernementaux ou financiers.

-   **Fonctions supplémentaires :** Cette norme inclut également des
    fonctionnalités optionnelles, telles que la mise à jour des
    informations et la révocation des permis numériques en ligne. Ces
    fonctions permettent de maintenir les informations du permis à  jour
    sans avoir à  émettre un nouveau document physique.

<!-- -->

-   **Publication et Développement :** La première ébauche de la norme
    ISO/IEC 18013-7 a été publiée pour examen, et la version finale est
    attendue d’ici 2024 ou 2025. Elle complète ainsi les lacunes des
    précédentes normes en couvrant des aspects plus larges du cycle de
    vie des mDL, notamment l’émission, la gestion et la vérification en
    ligne.

### ISO/IEC 23220-2 (MDoC)

La famille de normes ISO/IEC 23220 représente une approche plus globale
de l’identité électronique (eID)[^15] \[66\], \[68\]. Cette série de
normes vise à  créer un cadre complet pour les identités numériques,
allant bien au-delà  des permis de conduire pour englober une variété de
cas d’utilisation. L’objectif principal est de définir un format
d’identifiant numérique universel, adaptable à  divers contextes, qu’il
s’agisse d’identifications gouvernementales, commerciales ou autres.
La première partie de cette série, l’ISO/IEC 23220-1:2023, pose les
fondations architecturales pour les systèmes d’eID mobiles, offrant un
cadre conceptuel pour les futures implémentations. Les développements
futurs de cette norme pourraient inclure l’intégration du format SD-JWT
(Selective Disclosure for JWTs), actuellement en développement par
l’IETF, ainsi qu’une harmonisation potentielle avec les standards W3C
pour les identifiants vérifiables. L’importance de l’ISO/IEC 23220
réside dans son potentiel à  devenir le standard de facto pour les
identités numériques à  l’échelle mondiale, facilitant ainsi
l’interopérabilité entre différents systèmes et juridictions.

### American Association of Motor Vehicle Administrators (AAMVA) Guidelines

La guideline de l'AAMVA fournit un cadre détaillé pour la création, la
gestion et l'utilisation des permis de conduire mobiles, en respectant
les normes internationales telles que ISO/IEC 18013-5. Ces lignes
directrices visent à  assurer l'interopérabilité, la sécurité et la
confidentialité des permis de conduire mobiles à  travers différentes
juridictions aux États-Unis et au Canada.

**Objectifs des Lignes Directrices AAMVA**\[69\]

Les principales priorités de ces directives sont :

-   **Interopérabilité technique :** Garantir que les permis de conduire
    mobiles (mDL) émis par une juridiction puissent être vérifiés et lus
    par d’autres juridictions.

-   **Sécurité et confidentialité :** Assurer une implémentation
    respectant la confidentialité des détenteurs de mDL, tout en
    garantissant la sécurité des échanges de données.

-   **Confiance entre les juridictions :** Instaurer un modèle de
    confiance oà¹ les permis émis par différentes autorités sont traités
    de manière sécurisée et standardisée.

**Types de Transactions : assistées vs non assistées**

Les transactions des permis numériques peuvent être divisées en deux
types :

-   **Transactions assistées (attended transactions) :** Le détenteur du
    permis et le vérificateur sont en proximité physique. Cette
    interaction est facilitée par des technologies comme NFC ou QR codes
    sécurisés.

-   **Transactions non assistées (unattended transactions) :** Celles-ci
    se déroulent à  distance, par exemple lors de transactions en ligne.
    ISO/IEC 18013-5 ne supporte pas encore entièrement ces transactions,
    mais des travaux sont en cours pour leur standardisation.

**Sécurité et Protection des Données**

Les lignes directrices AAMVA mettent l’accent sur la sécurité et la
confidentialité des données du permis numérique :

-   **Minimisation des données :** Le permis numérique doit permettre de
    partager uniquement les informations nécessaires pour la
    vérification (par exemple, prouver l’âge sans révéler l’adresse).

-   **Cryptographie :** Les informations échangées via permis numérique
    sont protégées par des signatures numériques et des certificats
    cryptographiques, garantissant l’intégrité et l’authenticité des
    données.

-   **Protection contre le suivi :** Les lignes directrices précisent
    qu’aucune donnée ne doit permettre de suivre ou de surveiller les
    déplacements des détenteurs de permis numérique.

**Modèle de Confiance et Certificats**

Le modèle de confiance dans les permis numériques repose sur
l'utilisation de certificats numériques, avec des clés publiques
délivrées par des autorités de certification reconnues. En Amérique du
Nord, l'AAMVA propose un service de confiance numérique (Digital Trust
Service), permettant aux vérificateurs d'obtenir les certificats
nécessaires pour authentifier les permis numériques. Ce modèle de
confiance garantit que les informations d’un permis numérique sont
valides et proviennent d’une autorité fiable.

**Mécanismes de Mise à  Jour et de Révocation**

Les permis numériques doivent pouvoir être mis à  jour et révoqués via
des méthodes standardisées :

-   **Mise à  jour :** Les informations du permis numérique peuvent être
    mises à  jour via des serveurs distants ou des connexions avec
    l’autorité émettrice.

-   **Révocation :** En cas de révocation, des mécanismes sont prévus
    pour informer toutes les juridictions concernées et révoquer
    l’accès au permis numérique dans l’ensemble du réseau.

### Règlement eIDAS

Le règlement Electronic Identification, Authentication, and Trust
Services (eIDAS) est un cadre juridique européen, instauré par le
Règlement (UE) No 910/2014, qui vise à  garantir l’interopérabilité et
la reconnaissance mutuelle des systèmes d’identification numérique au
sein de l’Union européenne \[54\], \[70\]. Ce cadre joue un rôle
crucial dans l’infrastructure nécessaire à  la mise en œuvre des permis
de conduire numériques. Le projet de directive sur les permis de
conduire introduit l'utilisation d’un permis mobile, qui sera délivré
sous forme d’attestation électronique via le Portefeuille d’Identité
Numérique Européen, conformément au règlement eIDAS. Cela permettra aux
citoyens de stocker et de gérer leurs permis dans un format numérique
sécurisé, tout en assurant leur interopérabilité au sein de l’UE. Ce
règlement assure 3 composantes clés :

1.  **Interopérabilité et Sécurité :** Le règlement eIDAS assure que les
    permis mobiles respecteront des normes strictes en matière
    d’authentification et de protection des données. Ces permis seront
    délivrés via un système sécurisé, et leur utilisation sera soumise
    aux standards ISO/IEC. L’interopérabilité entre les différents
    États membres est ainsi garantie, tout comme la protection contre la
    fraude et la falsification.

2.  **Mesures de Sécurité :** Les permis de conduire mobiles seront
    soumis à  des mesures de sécurité spécifiques pour garantir leur
    fiabilité et leur protection contre les abus :

-   *Sécurité des données et interopérabilité :* Les permis mobiles
    doivent être conformes aux normes ISO/IEC et eIDAS. Cela permet de
    garantir une vérification sécurisée et interopérable de l’identité
    électronique à  travers l’UE.

-   *Protection des données personnelles :* Les États membres devront
    s’assurer que les données personnelles nécessaires à  la
    vérification des droits de conduite ne sont pas retenues par les
    vérificateurs, sauf si cela est autorisé par la loi nationale ou
    européenne. Cela garantit une utilisation contrôlée des données des
    détenteurs de permis.

-   *Actes délégués pour la mise en œuvre de la sécurité :* La
    Commission européenne est autorisée à  adopter des actes délégués
    pour fixer les normes techniques et de sécurité concernant
    l’échange de permis mobiles. Ces actes couvriront l'apparence
    visuelle, les fonctionnalités d'interopérabilité, ainsi que les
    standards de sécurité pour la gestion et la protection des données.

3.  **Délivrance Gratuite et Accès Électronique :** Les États membres
    devront fournir aux citoyens un accès électronique gratuit à  leur
    permis de conduire mobile, qui pourra être récupéré via des systèmes
    sécurisés conformes aux exigences du cadre eIDAS. Cela simplifie
    l'accès aux permis, tout en renforçant la sécurité et
    l’authenticité de ces documents numériques.

### World Wide Web Consortium (W3C)

Le world Wide Web Consortium (W3C) développe des standards et des
technologies qui contribuent à  l'écosystème global de l'identité
numérique. Dans le contexte des permis de conduire numériques, il est
important que la norme principale régissant leur développement est
l'ISO/IEC 18013-5, établie par l'organisation internationale de
normalisation (ISO). \[71\], \[72\], \[73\]

Les vérifiable credentials, une spécification du W3C, constituent un
cadre technique pour la gestion des certificats numériques
vérifiables. Cette technologie, bien qu'elle ne soit pas intégrée dans
la norme ISO/IEC 18013-5 actuelle des permis de conduire numériques,
propose des mécanismes innovants pour le partage sécurisé
d'informations d'identité numériques.

Les identifiants décentralisés (DIDs), une autre spécification du W3C,
définissent une architecture pour la gestion d'identités numériques
sans dépendance à  une autorité centrale unique. Cette approche,
distincte de celle adoptée par la norme mDL actuelle, illustre des
possibilités alternatives pour la gestion d'identités numériques.

Finalement, l'expertise du W3C dabs le développement de standards web
pourrait contribuer à  l'évolution future de l'écosystème mDL,
notamment dans les domaines de l'interopérabilité et de la
standardisation des échanges des données d'identité numérique. Cette
synergie potentielle entre les standards web et les systèmes
d'identité gouvernementaux représente un axe de développement
important pour l'avenir des permis de conduire numériques.

### Commissariat à la protection de la vie privée au Canada

En octobre 2022, les commissariats et ombudsmans à  la protection de la
vie privée au niveaux fédéral, provincial et territorial du Canada ont
publié une résolution concernant l'identité numérique \[74\], \[75\].
Cette résolution vise à  faciliter la confirmation d'identité et les
transactions en ligne sécurisés.

Cette résolution souligne que, malgré les avantages potentiels de cette
technologie, sa mise en place doit respecter des standards élevés en
matière de protection de la vie privée, de sécurité et de transparence.
Les recommandations principales de la résolution établissent plusieurs
principes. Premièrement, la participation doit être volontaire, avec
possibilité de recours à  des alternatives. Les individus doivent garder
le contrôle sur leurs renseignements personnels, et un consentement de
leur part doit être requis pour tout échange d'information. Ensuite, la
collecte des données doit se limiter au strict nécessaire, avec une
attention aux données sensibles comme les informations biométriques.

En termes de gouvernance, la résolution suggère d'éviter la création des
bases de données centralisées et interdit le traçage des utilisateurs.
Les gouvernements sont appelés à  réaliser des évaluations d'impact sur
la vie privée dès la conception des systèmes et à  maintenir une
transparence sur les objectifs et l'utilisation des données. Enfin, un
cadre juridique solide doit être mis en place, comprenant des
interdictions, des sanctions et des mécanismes de recours accessibles
aux citoyens. Ces mesures visent à  créer un environnement numérique qui
inspire confiance tout en protégeant efficacement les droits des
utilisateurs.

### Comparaison de normes 

Le tableau comparatif présente les principales normes et protocoles
relatifs aux permis de conduire numériques, en mettant en lumière leurs
objectifs communs : sécurité, interopérabilité et protection des données
personnelles \[76\], \[77\]. La norme ISO/IEC 18013-5, publiée en 2021,
se concentre sur la gestion et la vérification des permis de conduire
numériques, en communication de proximité, tandis que la norme ISO/IEC
18013-7, encore en cours de développement, vise à  faciliter les
interactions en ligne. De son côté, la norme ISO/IEC 23220-2 adopte une
approche plus générale en traitant des identités électroniques au-delà 
des permis de conduire. Les directives de l’AAMVA assurent
l’interopérabilité entre les juridictions américaines, tandis que le
règlement eIDAS garantit la protection des données et
l’interopérabilité au sein de l’Union européenne. Par ailleurs, le W3C
se concentre sur l’élaboration de standards ouverts pour les identités
numériques, notamment avec les Verifiable Credentials, facilitant ainsi
l’utilisation sécurisée des permis de conduire numériques, à  l'échelle
mondiale. Bien que ces normes soient distinctes, elles partagent toutes
le même objectif : assurer la sécurité et la reconnaissance
internationale des permis de conduire numériques.

  ----------------------------------------------------------------------------------------------------------------------
  **Norme/standard**   **Date de       **Objectif           **Interopérabilité**   **Sécurité et       **Utilisation**
                       publication**   principal**                                 confidentialité**   
  -------------------- --------------- -------------------- ---------------------- ------------------- -----------------
  **ISO/IEC 18013-5**  Septembre 2021  Spécifications       Interopérabilité à      Mécanismes          Présentation de
                                       techniques pour les  l'échelle mondiale     cryptographiques    proximité
                                       permis de conduire                          pour protéger les   (physique)
                                       numérique                                   informations        
                                                                                   personnelles, accès 
                                                                                   limité aux parties  
                                                                                   autorisées          

  **ISO/IEC 18013-7**  En              Vérification des     Interopérabilité à      Cryptographie       Utilisation des
                       développement   permis de conduire   l'échelle mondiale     avancée pour les    permis dans des
                                       dans des scénarios   pour les systèmes de   transactions en     contextes en
                                       en ligne             vérification en ligne  ligne, mise à jour  ligne
                                                                                   et révocation des   
                                                                                   mDLs                

  **ISO/IEC 23220**    ISO/IEC         Cadre global pour    Interopérabilité avec  Sécurité des        Identité
                       23220-1 :2023   l'identité numérique divers systèmes        identités           numérique pour
                                                            d'identification       numériques à  grande divers cas
                                                            numérique              échelle             d'utilisations,
                                                                                                       au-delà  des
                                                                                                       permis numérique

  **Guide AAMVA**      Mise à  jour     Directives pour les  Interopérabilité entre Signature           Transactions
                       régulière       permis de conduire   juridictions           numérique,          assistées et non
                                       numérique aux États  américaines            cryptographie,      assistées des
                                       unis                                        protection contre   permis numériques
                                                                                   le suivi            

  **Règlement eIDAS**  Mise à  jour     Cadre juridique pour Interopérabilité entre Conformité avec     Permis de
                       régulière       l'interopérabilité   les états membres de   ISO/IEC et sécurité conduire
                                       des permis numérique l'union européenne     des données         numérique dans le
                                       dans l'union                                personnelles        cadre de
                                       européenne                                                      portefeuille
                                                                                                       d'identité
                                                                                                       européen
  ----------------------------------------------------------------------------------------------------------------------

  : Tableau 1: Tableau comparatif des normes

1.  
2.  
3.  
4.  
5.  
6.  

## Analyse PESTEL

Les permis de conduire numériques sont des documents d'identité
numériques stockés sur les appareils mobiles. Ils permettent aux
individus de prouver leur identité et leur droit de conduire de manière
sécurisée et flexible. Cependant, la mise en œuvre de cette technologie
implique divers enjeux politiques, économiques, sociaux, technologiques,
et légaux, qu'il est essentiel de comprendre pour leur adoption.

<figure>
<img src="media/image6.png" style="width:6.92445in;height:4.47879in" />
<figcaption><p><span id="_Toc183860748" class="anchor"></span>Figure 6:
Analyse PESTEL des permis de conduire numériques</p></figcaption>
</figure>

### Dimension politique

Les caractéristiques uniques du contexte politique canadien influencent
directement la mise en œuvre des permis de conduire numériques. Le
contexte canadien crée une dynamique complexe, similaire aux États-Unis,
quant donnée de la structure fédérale du pays. Dans ce contexte,
l'absence d'une politique fédérale unifiée peut entraver
l'interopérabilité entre les provinces.

-   **Coordination interprovinciale :** Au Canada, les permis de
    conduire sont délivrés par les provinces, qui détiennent le contrôle
    législatif. De ce fait, il est essentiel d'établir une coordination
    interprovinciale pour les permis de conduire numériques afin
    d'assurer l'interopérabilité de ces pièces à  l'échelle nationale.
    Dans ce contexte, la résolution commune des commissaires a la
    protection de la vie privée (2022) marque une étape importante en
    établissant des lignes directrices pour le développement des
    identités numériques au Canada. Cette résolution souligne la
    nécessité d'un cadre législatif harmonisé, incluant des exigences
    strictes en matière de protection des données et de transparence.

-   **Harmonisation internationale :** La dimension internationale de
    l'implémentation des permis de conduire numériques représente un
    enjeu stratégique majeur pour le Canada. Au-delà  de la coordination
    interprovinciale, le pays doit s'inscrire dans une dynamique
    d'harmonisation internationale, particulièrement cruciale dans le
    contexte nord-américain. Cette harmonisation s'articule autour de
    deux axes principaux : l'adoption des standards internationaux et
    l'interopérabilité transfrontalière.

    -   **L'harmonisation internationale** des permis de conduire
        canadiens restent théorique et soulève plusieurs questions. Si
        la conformité à  des normes comme ISO/IEC 18013-5 établit une
        base technique commune, elle n'apporte aucune garantit quant à 
        la reconnaissance internationale effective des permis de
        conduire numérique canadiens. Cette standardisation technique,
        bien que nécessaire, ne résout pas les enjeux fondamentaux de
        reconnaissance mutuelle entre pays. La situation aux états unis,
        similaire dans sa politique au Canada, illustre cette
        complexité. Malgré l'existence des directives établies par
        AAMVA, la reconnaissance des permis numériques entre états
        américains reste fragmentée.

    -   **Valeur juridique à  l'étranger :** La valeur juridique des
        permis de conduire numériques, comme pièce d'identité,
        représente un autre défi majeur. Les contextes d'utilisation et
        les exigences règlementaires varient considérablement selon les
        pays. Un permis de conduire techniquement conforme pourrait se
        voir refuser toute valeur légale dans certaines juridictions,
        limitant significativement son utilité pour les Canadiens à 
        l'étranger. Cette dimension juridique dépasse largement le cadre
        technique et la standardisation ISO et nécessite des accords
        spécifiques pour assurer une reconnaissance effective.

### Dimension socio-économique

**L'aspect économique** des permis de conduire numériques représente un
investissement conséquent mais stratégique à  long terme. La canada doit
être prête à  dépenser des coà»ts élevés qui concernent non seulement
l'infrastructure technologique, mais également d'autres couts connexes
comme la formation du personnel et la mise à  niveau des systèmes
existants qui peuvent être désuet pour accueillir cette nouvelle
technologie. A titre d'exemple, en Australie, 62,5 millions de dollars
ont été investi par la nouvelle Galles de sud pour la gestion de
l'identité numérique.

Malgré l'ampleur des investissements nécessaires, le lancement des
permis de conduire numérique présente de nouvelles opportunités
économiques importantes, cela inclut des partenariats avec le secteur
privé, similaire à  celle établie entre les états américains et le géant
Apple. Ce type de partenariat pourrait stimuler l'innovation et
favoriser un écosystème numérique dynamique. De plus, la numérisation
des permis de conduire promet une réduction, sur le long terme, des
coà»ts liés à  la production des permis de conduire physiques et
l'optimisation des processus administratifs.

**Sur le plan social,** l'expérience des états comme en Australie et aux
états unis, avec des nombres de téléchargement élevés des permis de
conduire numérique, suggère un potentiel d'adoption rapide et favorable
de cette technologie pour une société comme la canada. Cependant, il est
primordial de veiller l'inclusion numérique. Le premier point a
considéré est l'attention aux populations marginalisés ou éloignées,
exemple les communautés autochtones, les personnes âgés, etc. Il est
nécessaire de maintenir par exemple l'option des permis physiques en
parallèle avec les solutions numériques afin de ne pas exclure les
populations marginalisées [^16]. De plus, des services d'accompagnement
adaptées doivent être mise en place pour accompagner, aider et soutenir
les citoyens à  l'utilisation et l'adoption de cette solution numérique.
Finalement, les Canadiens, tout comme les Américains et les populations
des autres pays, sont sensible aux questions de protection de la vie
privée. Ainsi, il est impératif d'avoir une approche transparente par
rapport à  la gestion des données personnelles.

**La fracture numérique** désigne les inégalités dans l'accès, l'usage
et la compréhension des technologies de l'information au sein d'une
société. Ce phénomènes se manifeste à  plusieurs niveaux : **(1) accès
aux technologies :** variation géographique dans l'accès à  la
technologie, disparité dans la connexion internet, et inégalités dans
l'accès au matériel informatique; **(2) compétences numériques :**
capacité à  utiliser les outils numériques, et compréhension des
processus numériques; **(3) usage et appropriation :** niveau
d'autonomie dans l'utilisation, et confiance dans les outils
technologiques;\[78\], \[79\], \[80\], \[81\].

Au Québec, la transformation numérique des services gouvernementaux,
notamment la mise en place des permis de conduire numérique, met en
lumière une fracture numérique significative. D'après les données de
l'Académie de Transformation numérique, seuls 44% des utilisateurs
d'internet au Québec ont une compréhension du concept d'identité
numérique, et 45% celui de portefeuille numérique gouvernemental. Cette
méconnaissance souligne un premier niveau de fracture : celle de l'usage
et l'appropriation. De plus, 80% des québécois expriment des craintes
concernant l'identité numérique, permis de conduire compris. Ces
craintes se concentrent sur: le vol des données personnelles,
impossibilité de prouver son identité, difficulté de démarches en cas de
vol d'identité, etc. \[79\], \[80\].

Étant donné ces informations, la transition vers le permis de conduire
numérique au Québec met une lumière l'importance d'une approche
polyvalente qui reconnait l'existence de la fracture numérique et qui
maintient des alternatives accessibles du permis, de prévoir un
accompagnement adapté aux citoyens et aussi de planifier minutieusement
les transitions technologiques. Finalement, cette transformation ne peut
réussir qu'en s'assurant qu'aucun citoyen ne soit laissé pour compte,
conformément aux recommandations du protecteur de citoyen qui souligne
que les avancées technologiques ne doivent pas créer d'exclusion sociale
\[81\].

### Dimension technologique

L'émergence des permis de conduire numériques s'inscrit dans le contexte
technologique en mutation rapide, ou les défis de sécurité et
d'infrastructure s'intensifient à  mesure que les technologies évoluent.
Cette transformation soulève plusieurs questions :

La sécurité des infrastructures numériques gouvernementales constitue un
enjeu critique, comme le met en évidence de manière dramatique
l'expérience récente du canada \[82\]. La compromission de vingt réseaux
gouvernementaux sur une période de cinq ans par des acteurs étatiques
chinois met en lumière la vulnérabilité des systèmes gouvernementaux.
Ces attaques qui ont pour but l'espionnage et le vol de propriété
intellectuelle, prennent de l'ampleur avec l'apparition de nouveaux
acteurs tels que l'Inde, ce qui élargit la gamme des menaces. Cette
situation souligne la nécessité pressante de mettre en place des
dispositifs de protection solides pour les identités numériques.

Ensuite, la sophistication croissante des technologies d'usurpation
d'identité, particulièrement les Deepfakes, constitue un défi majeur
pour l'authentification numérique \[83\]. Ces technologies permettent la
manipulation en temps réels des visages et des voix, créant des risques
à  chaque point du processus d'authentification  \[83\], \[84\], \[85\].
L'industrie répond à  ces menaces par le développement de standards de
sécurité plus rigoureux. Le programme CLR Cert, par exemple, établit de
nouvelles normes pour la détection des attaques par injection (IAD-CEN
TS18099) \[86\] et la détection des attaques par présentation (PAD-
ISO/IEC 30107) \[87\], démontrant l'évolution nécessaire de mécanisme de
protection.

De plus, l'avènement de l'informatique quantique amplifie les défis
sécuritaires \[88\], \[89\]. D'ici quelques années, la puissance de
calcul des ordinateurs quantiques pourra compromettre les systèmes de
chiffrement actuels, menaçant ainsi l'intégrité des identités
numériques. Pour ce, les systèmes d'identités numérique doivent
anticiper les menaces quantiques futures tout en répondant aux exigences
actuelles. La transition vers des technologies post-quantiques nécessite
une approche proactive. Par exemple, la solution IDnomic PKI démontrent
qu'il est possible d'assurer une migration fluide en mettant des
certificats hybrides, permettant aux systèmes existants de continuer de
fonctionner tout en intégrant les nouvelles protections quantiques
\[89\]. Cette approche double garanti la continuité des services tout en
se préparant pout des éventuels changements ou attaques.

D'autre part, l'accessibilité numérique au Québec présente actuellement
des disparités significatives entre les zones urbaines et rurales [^17]
[^18][^19], créant un défi pour le déploiement des permis de conduire
numériques. Alors que les centres urbains bénéficient d'une excellente
couverture réseau et d'un accès fiable a l'internet haute vitesse, les
régions rurales font face à  des connexions instables et des débits
limités, voire à  des zones blanches (comme les réserves).

Pour répondre à  ces enjeux, l'infrastructure technique des permis
numériques doit être conçue avec une architecture hybride robuste. Elle
doit supporter à  la fois les modes on et hors ligne, et assurer une
synchronisation fiable des données. L'équité d'accès doit être garantie
par des solutions adaptée aux différents contextes territoriales.

De plus, la transition vers cette nouvelle technologie nécessite une
approche méthodique [^20], débutant par une évaluation approfondie des
infrastructures existantes et l'identification des zones à  améliorer. Le
déploiement progressif, accompagné de tests pilotes et d'un support
technique robuste, permettra d'assurer une migration fluide sans
interruption de service. Des mécanismes de reprit doit être prévue pour
garantir la continuité des opérations en cas d'incident.

Finalement, les expériences internationales peuvent offrir aussi des
enseignements importants. Aux états unis, Login.gov illustre les
bénéfices potentiels d'un système national unifié. Avec plus de 80
millions d'utilisateurs, cette plateforme a montré des avantages
significatifs : seize agences fédérales rapportent une amélioration de
leurs opérations grâce à  la réduction de la charge de travail, au
renforcement de la sécurité \[90\]. Mais, certains défis persistent,
notamment des problèmes techniques de visibilité d'authentification et
des lacunes dans les contrôles antifraudes. L'expérience australienne de
passage de myGOVID a myID, touchant 13 millions d'utilisateurs, met en
lumière d'autres aspects critiques de la gestion des identités
numériques \[91\]. Bien que cette transition vise à  clarifier la
distinction entre l'application d'identité numérique et la plateforme de
services gouvernementaux myGOV, elle a créé des opportunités pour les
fraudeurs. Les tentatives d'hameçonnage exploitent ce changement
soulignent l'importance d'une communication claire et d'une stratégue de
sécurité lors des transitions majeures. Au-delà  des attaques techniques,
les systèmes d'identité numérique doivent faire face à  des méthodes
d'ingénierie sociale de plus en plus élaborées. L'expérience québécoise
avec les fraudes bancaires illustre cette réalité : les fraudeurs
utilisent des applications permettant de falsifier l'information sur les
téléphones et combinent plusieurs techniques ( appels téléphoniques,
manipulation psychologique, et même la présence physique) pour paraître
légitimes \[92\], ce qui souligne l'importance d'une approche de
sécurité robuste au Québec qui va au-delà  des protections techniques.

### Dimension environnementale

La transformation numérique, notamment le lancement de permis de
conduire, fait partie de la démarche plus large du développement
durable. L'émission des permis de conduire numériques réduit
considérablement l'utilisation de plastique et du papier qui sont
actuellement indispensable pour la production des permis de conduire
physiques. Cette transformation numérique s'aligne parfaitement avec les
objectifs environnementaux du Canada et du Québec en matière de
réduction des déchets [^21].

Au Québec, Poste Canada assure la délivrance des permis de conduire aux
titulaires de permis en leurs permettant de le recevoir directement à 
domicile. La transition vers les permis numérique permet un gain
environnemental considérable en réduisant les besoins de production et
d'expédition des permis physiques. Ainsi, la réduction du processus de
transport et de distribution permet de diminuer les émissions de gaz
associés à  ce processus.

Toutefois, il est important de souligner l'impact environnemental des
infrastructures nécessaires non négligeable nécessaire au stockage et à 
la gestion des permis de conduire numériques. Afin de minimiser cet
impact, il sera important de privilégier par exemple l'utilisation des
sources d'énergie renouvelables, de manière à  réduire l'empreinte
carbone associé aux opérations numériques.

Finalement, l'adoption des permis de conduire numériques requiert
l'utilisation des téléphones intelligents, ce qui amène les utilisateurs
à  renouveler leurs appareils pour suivre les tendances et les exigences
technologiques. Cette tendance contribue à  l'augmentation des déchets
électroniques qui sont composés de matériaux toxiques et non recyclable.
Selon l'article de Basta[^22], le remplacement fréquent des téléphones
intelligents engendrent une importante empreinte écologique. Cette
dynamique d'obsolescence des appareils mobiles va à  l'encontre des
objectifs environnementaux en termes de gestion durable des ressources.

### Dimension légale 

La mise en place d'un cadre juridique entourant l'utilisation des permis
de conduire numériques est indispensable pour soutenir cette initiative
technologique. Plusieurs pays ont apporté des modifications ou des
nouveaux cadres juridiques afin de soutenir les initiatives et
l'adoption des permis de conduire numériques, notamment la France, le
Portugal, etc. Au Canada, le cadre légal devrait prendre en compte la
structure fédéral complexe, ou les différentes juridictions provinciales
et fédérales ont chacune des responsabilités spécifiques. Ainsi, une
harmonisation et alignement des lois concernant les permis de conduire
numériques devient primordial afin d'assurer une reconnaissance uniforme
des permis numériques à  l'échelle nationale.

L'environnement légal des permis de conduire numérique à  Québec connait
une évolution significative avec le projet de loi 82 concernant
l'identité numérique [^23]. Une fois adopté et en vigueur, ce projet
établira le cadre juridique définitif confiant au ministère de
cybersécurité et numérique la gouvernance de l'identité numérique. Bien
que le projet ne soit pas encore adopté, il propose des mesures qui
pourraient avoir un impact majeur sur la gestion des permis de conduire
numérique : (1) création d'un registre d'identité numérique nationale
centralisé sous la responsabilité du ministère, (2) établissement d'un
cadre pour garantir la cohérence, la qualité et la sécurité des données
utilisées, et (3) interdiction de profilage des citoyens à  partir des
données numériques. Ces propositions offrent une infrastructure
potentiellement robuste pour soutenir le déploiement des permis de
conduire numériques. Cependant, l'implémentation de ce cadre peut
soulever des enjeux liés à  la coexistence avec les législations
existantes.

A titre d'exemple, la loi 25 et le projet de loi 82 visent à  moderniser
la gestion des renseignements personnels et l'identité numérique au
Québec, mais présentent des divergences potentielles. La loi 25 [^24]
[^25] impose une gestion décentralisée ou chaque organisme est
responsable de ses données, tandis que le projet de loi 82 propose une
centralisation via un registre national sous la gouvernance du ministère
de la cybersécurité et numérique. Cette centralisation pourrait entrer
en conflit avec les exigences de la loi 25, notamment en matière de
responsabilité individuelle et de protection des renseignements
personnels. De plus, le projet de loi 82 doit s'assurer de respecter les
normes strictes de la loi 25 concernant la sécurité et la transparence
des données, tout en minimisant les risques liés à  un registre
centralisé. Une harmonisation législative est essentielle pour éviter
des incohérences entre ces deux cadres.

L'acceptation et la reconnaissance des permis de conduire numériques par
les différentes autorités soulève un enjeu crucial. En fait, l'adoption
d'une solution technologique ne garantit pas son acceptation par
l'ensemble des parties prenantes, en particulier les forces de l'ordre.
Au niveau canadien, cet enjeu pourrait être amplifié par la structure
fédérale du pays, avec des cadres légales propres à  chaque province.
Cette situation pourrait créer des disparités dans la reconnaissance et
l'adoption des permis numérique à  travers le pays. Au états unis,
l'exemple de la Géorgie illustre cette problématique. Alors que l'état a
déployé la solution des permis numériques, disponible dans plusieurs
portefeuille numériques (Samsung, Apple, Google) et acceptés par
certaines autorités officielles par exemple les contrôles TSA, les
forces de l'ordre refusent d'accepter les permis de numérique comme une
pièce d'identité et exigent les permis physiques lors des contrôles
routiers [^26]. Cet exemple met en évidence le décalage entre
l'innovation technologique et son application pratique sur le terrain.
Ainsi, cette réalité soulève des questions quant au déploiement des
permis numériques au Canada :

-   Comment garantir une transition qui prend en compte les besoins et
    les craintes des parties prenantes, notamment les forces de l'ordre?

-   Comment le Canada pourrait gérer la période de coexistence des
    permis numériques et physiques?

-   Comment assurer l'accompagnement et la formation nécessaire aux
    différentes parties prenantes afin de garantir une adoption
    effective sur le plan pratique?

Finalement, la protection des données personnelles reste une
préoccupation par rapport à  l'utilisation de l'identité numérique de
façon générale, et les permis de conduire de façon spécifique. La
protection des données personnelles au canada est régie par la loi sur
la protection des renseignements personnels et les documents
électroniques (LPRPDE). Toutefois, cette loi devrait être revue et mise
à  jour afin de supporter et répondre aux risques spécifiques de
l'identité numériques. Pour ce, les initiatives en Europe comme le
règlement eIDAS ou au états unis pourrait être utilisé au Canada pour
alimenter et mettre à  jour la cadre légale de protection des données.
Finalement, la transparence par rapport aux responsabilités des
différents acteurs est essentielle, ainsi de prévision des mécanismes de
recours en cas des incidents de sécurité ou de protection des données.

# Constats et réflexions

A mon avis, l'évolution des permis de conduire numériques de la théorie
à  la pratique soulève des enjeux importants. Si la vérification et
l'implémentation des permis numériques progressent, leur adoption reste
entravée par des défis pratiques liés à  l'interopérabilité et la
sécurité [^27]. L'accessibilité pour les personnes en situation
d'handicap demeure également sous-évaluée, bien que des initiatives
comme celle de la Géorgie montrent qu'il est possible d'améliorer
l'inclusion numérique [^28]. Avec le projet de loi 82, le Québec vise à 
établir un registre centralisé de l'identité numérique sous la
gouvernance de ministère de cybersécurité et numériques. Bien que ce
cadre promette une infrastructure robuste pour le déploiement des permis
numérique, il soulève des questions de cohérence avec la loi 25, qui
favorise une gestion décentralisée des données et une responsabilité
individuelle des organismes publics. Cette dualité législative pourrait
créer des tensions dans la mise en œuvre. Par ailleurs,
l'interopérabilité mondiale des permis numériques, bien que soutenue par
des normes comme ISO/IEC 18013-5, reste largement théorique sans accords
garantissant leur reconnaissance effective à  l'étranger. Enfin, les
défis techniques liés à  la cybersécurité, a l'adaptation des
infrastructure existantes et à  l'émergence de technologies comme
l'informatique quantique nécessitent une stratégie proactive pour
anticiper les menaces. Pour maximiser leur potentiel, les permis de
conduire numériques doivent s'accompagner d'une approche inclusive,
d'une collaboration mondiale et d'une vision claire pour harmoniser les
initiatives locales et nationales.

# Table des figures

[Figure 1: Évolution de taux d’adoption des appareils mobiles par
groupe d’âge au Québec (extrait du rapport de l'académie de la
transformation numérique) [9](#_Ref181953203)](#_Ref181953203)

[Figure 2: Cycle de vie permis de conduire numérique (inspiré du
document AAMVA) [10](#_Ref181265638)](#_Ref181265638)

[Figure 3: Portrait des initiatives au états unis
[13](#_Ref183183856)](#_Ref183183856)

[Figure 4: Portrait des initiatives au Canada
[15](#_Ref183793129)](#_Ref183793129)

[Figure 5: CAT 2 [21](#_Toc183860747)](#_Toc183860747)

[Figure 6: Analyse PESTEL des permis de conduire numériques
[28](#_Toc183860748)](#_Toc183860748)

# Références

[^1]:
« Mobile-Drivers-Licenses-and-the-Costs-to-Privacy-Safety-Security-2023.pdf ».
Consulté le: 9 septembre 2024. \[En ligne\]. Disponible sur:
https://www.nilc.org/wp-content/uploads/2024/01/Mobile-Drivers-Licenses-and-the-Costs-to-Privacy-Safety-Security-2023.pdf

\[2\] B. Norton, « Navigating The Legal Framework: Implementing A
Government-Backed Digital Identity In The United States », 2024.

\[3\] « Mobile Driver License - American Association of Motor Vehicle
Administrators - AAMVA ». Consulté le: 9 septembre 2024. \[En ligne\].
Disponible sur:
https://www.aamva.org/topics/mobile-driver-license#?wst=d5a5f5751f7474b62a5bb2b374692b61

\[4\] « Mobile Driver's Licenses, Other Digital Credentials Poised to
Grow », GovTech. Consulté le: 9 septembre 2024. \[En ligne\]. Disponible
sur:
https://www.govtech.com/magazines/mobile-drivers-licenses-other-digital-credentials-poised-to-grow

\[5\] « Next Generation Identity: Mobile Driver's License ».

\[6\] « Mobile driver's licenses continue to pick up speed \| Biometric
Update ». Consulté le: 13 septembre 2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202406/mobile-drivers-licenses-continue-to-pick-up-speed

\[7\] B. Johnson, « How Does MDL Technology Ensure Data Security &
Privacy in Your Services? », MDL Technology. Consulté le: 13 septembre
2024. \[En ligne\]. Disponible sur:
https://www.mdltechnology.com/how-does-mdl-technology-ensure-data-security-privacy-in-your-services-kansas-city/

\[8\] « Debunking Myths about the Mobile Driver's License », SpruceID.
Consulté le: 13 septembre 2024. \[En ligne\]. Disponible sur:
https://blog.spruceid.com/debunking-myths-about-the-mobile-drivers-license-2/

\[9\] « TSA Now Accepts Digital IDs From These Nine States ». Consulté
le: 13 septembre 2024. \[En ligne\]. Disponible sur:
https://www.forbes.com/sites/suzannerowankelleher/2024/06/12/tsa-digital-ids-nine-states/

\[10\] « Mobile drivers licenses: A more secure digital identity \|
Biometric Update ». Consulté le: 13 septembre 2024. \[En ligne\].
Disponible sur:
https://www.biometricupdate.com/202407/mobile-drivers-licenses-a-more-secure-digital-identity

\[11\] A. E. Staff, « The Pros and Cons of Adopting Digital Driver's
Licenses », Edge. Consulté le: 13 septembre 2024. \[En ligne\].
Disponible sur:
https://apuedge.com/the-pros-and-cons-of-adopting-digital-drivers-licenses/

\[12\] « Overview of ISO/IEC 18013-5: Innovations and Vulnerabilities in
the mDL Standard -- Pomcor ». Consulté le: 13 septembre 2024. \[En
ligne\]. Disponible sur:
https://pomcor.com/2023/10/27/overview-of-iso-iec-18013-5-innovations-and-vulnerabilities-in-the-mdl-standard/

\[13\] « mDLs receive final approval in Illinois, not for voting in Ohio
\| Biometric Update ». Consulté le: 13 septembre 2024. \[En ligne\].
Disponible sur:
https://www.biometricupdate.com/202408/mdls-receive-final-approval-in-illinois-not-for-voting-in-ohio

\[14\] « Feature Article: Implementing Mobile Driver's Licenses: Not as
Easy as You Think \| Homeland Security ». Consulté le: 13 septembre
2024. \[En ligne\]. Disponible sur:
https://www.dhs.gov/science-and-technology/news/2022/03/29/feature-article-implementing-mobile-drivers-licenses-not-easy-you-think

\[15\] « Widespread adoption of mDLs in US remains a slow slog \|
Biometric Update ». Consulté le: 13 septembre 2024. \[En ligne\].
Disponible sur:
https://www.biometricupdate.com/202408/widespread-adoption-of-mdls-in-us-remains-a-slow-slog

\[16\] « Identiverse panel cracks open international mDL standards \|
Biometric Update ». Consulté le: 13 septembre 2024. \[En ligne\].
Disponible sur:
https://www.biometricupdate.com/202406/identiverse-panel-cracks-open-international-mdl-standards

\[17\] « mDL rollout for TSA checks continue, but privacy still a common
concern \| Biometric Update ». Consulté le: 13 septembre 2024. \[En
ligne\]. Disponible sur:
https://www.biometricupdate.com/202406/mdl-rollout-for-tsa-checks-continue-but-privacy-still-a-common-concern

\[18\] A. Hancock, « Decoding the California DMV's Mobile Driver's
License », Electronic Frontier Foundation. Consulté le: 13 septembre
2024. \[En ligne\]. Disponible sur:
https://www.eff.org/fr/deeplinks/2024/03/decoding-california-dmvs-mobile-drivers-license

\[19\] « Florida tosses mDL program into the Gulf \| Biometric Update ».
Consulté le: 13 septembre 2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202407/florida-tosses-mdl-program-into-the-gulf

\[20\] A. Hancock, « Privacy Advocates to TSA: Slow Down Plans for
mDLs », Electronic Frontier Foundation. Consulté le: 13 septembre 2024.
\[En ligne\]. Disponible sur:
https://www.eff.org/fr/deeplinks/2023/10/privacy-advocates-tsa-slow-down-plans-mdls

\[21\] « White House poised to throw federal support behind mDLs \|
Biometric Update ». Consulté le: 18 septembre 2024. \[En ligne\].
Disponible sur:
https://www.biometricupdate.com/202408/white-house-poised-to-throw-federal-support-behind-mdls

\[22\] « Mobile driver's licenses could soon be coming to N.J. - WHYY ».
Consulté le: 18 septembre 2024. \[En ligne\]. Disponible sur:
https://whyy.org/articles/mobile-drivers-licenses-new-jersey/

\[23\] « Virginia Joins National Trust Service for mDLs ». Consulté le:
18 septembre 2024. \[En ligne\]. Disponible sur:
https://mobileidworld.com/virginia-joins-national-trust-service-for-mdls/

\[24\] « New York speeds to 100K mDL users in under 2 months \|
Biometric Update ». Consulté le: 18 septembre 2024. \[En ligne\].
Disponible sur:
https://www.biometricupdate.com/202408/new-york-speeds-to-100k-mdl-users-in-under-2-months

\[25\] « Wyoming plots mobile driver's license launch for 2025 \|
Biometric Update ». Consulté le: 18 septembre 2024. \[En ligne\].
Disponible sur:
https://www.biometricupdate.com/202407/wyoming-plots-mobile-drivers-license-launch-for-2025

\[26\] « Signs say mobile driver's licenses in Apple Wallet coming to
California next \| Biometric Update ». Consulté le: 18 septembre 2024.
\[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202408/signs-say-mobile-drivers-licenses-in-apple-wallet-coming-to-california-next

\[27\] « Apple's TSA-approved digital ID is now available in 5 states -
The Points Guy ». Consulté le: 18 septembre 2024. \[En ligne\].
Disponible sur:
https://thepointsguy.com/news/apple-digital-drivers-license-now-available/

\[28\] « DHS guides cops on investigating crime committed using mDLs \|
Biometric Update ». Consulté le: 18 septembre 2024. \[En ligne\].
Disponible sur:
https://www.biometricupdate.com/202408/dhs-guides-cops-on-investigating-crime-committed-using-mdls

\[29\] « South Korea launches mobile driver's license trial, plans
mid-year general availability \| Biometric Update ». Consulté le: 18
septembre 2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202201/south-korea-launches-mobile-drivers-license-trial-plans-mid-year-general-availability

\[30\] « Mobile driver's license among digital IDs Singapore government
adding to platform \| Biometric Update ». Consulté le: 18 septembre
2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202203/mobile-drivers-license-among-digital-ids-singapore-government-adding-to-platform

\[31\] « GUIDE: Everything You Need to Know About LTO's Electronic
Driver's Licenses », SPOT.PH. Consulté le: 18 septembre 2024. \[En
ligne\]. Disponible sur:
https://www.spot.ph/newsfeatures/adulting/105625/guide-everything-to-know-about-lto-digital-drivers-licenses-edl-a5229-20230723

\[32\] « Philippines shows quick mDL deployment is possible, while
States creep forward \| Biometric Update ». Consulté le: 18 septembre
2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202405/philippines-shows-quick-mdl-deployment-is-possible-while-states-creep-forward

\[33\] « Philippines digital ID app integrates HID platform for
ISO-compliant interoperability \| Biometric Update ». Consulté le: 19
septembre 2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202409/philippines-digital-id-app-integrates-hid-platform-for-iso-compliant-interoperability

\[34\] « Dubai announces digital driver's licence -- here's how it
works - Edge Middle East ». Consulté le: 19 septembre 2024. \[En
ligne\]. Disponible sur:
https://www.edgemiddleeast.com/software/dubai-announces-digital-drivers-licence-heres-how-it-works

\[35\] « Digital driving license service launched in Saudi Arabia »,
Arab News. Consulté le: 19 septembre 2024. \[En ligne\]. Disponible sur:
https://arab.news/jfzh3

\[36\] « Drive with Confidence: How To Get Online Driving License in KSA
2023 ». Consulté le: 19 septembre 2024. \[En ligne\]. Disponible sur:
https://www.pitstoparabia.com/en/news/how-to-get-saudi-driving-license-online-2023

\[37\] « Australia's cyber security spending to grow 11.5% this year \|
Computer Weekly », ComputerWeekly.com. Consulté le: 7 juin 2024. \[En
ligne\]. Disponible sur:
https://www.computerweekly.com/news/366574452/Australias-cyber-security-spending-to-grow-115-this-year

\[38\] « Mobile driver's license pilot to launch soon in Victoria,
Australia \| Biometric Update ». Consulté le: 18 septembre 2024. \[En
ligne\]. Disponible sur:
https://www.biometricupdate.com/202305/mobile-drivers-license-pilot-to-launch-soon-in-victoria-australia

\[39\] « Austroads contracts MATTR to enable mobile driver's licences ».
Consulté le: 18 septembre 2024. \[En ligne\]. Disponible sur:
https://www.govtechreview.com.au/content/gov-digital/news/austroads-contracts-mattr-to-enable-mobile-driver-s-licences-1513502840

\[40\] « Launch of government app brings New Zealand one step closer to
mDLs \| Biometric Update ». Consulté le: 18 septembre 2024. \[En
ligne\]. Disponible sur:
https://www.biometricupdate.com/202405/launch-of-government-app-brings-new-zealand-one-step-closer-to-mdls

\[41\] « Austrian digital wallet can now house national ID, proof of age
alongside mDLs \| Biometric Update ». Consulté le: 18 septembre 2024.
\[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202406/austrian-digital-wallet-can-now-house-national-id-proof-of-age-alongside-mdls

\[42\] « Digital Driving Licence ». Consulté le: 19 septembre 2024. \[En
ligne\]. Disponible sur:
https://www.digitalaustria.gv.at/eng/services/eServices/e-driving-licence.html

\[43\] « Portugal and France make mobile driver's licenses available
almost immediately \| Biometric Update ». Consulté le: 18 septembre
2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202402/portugal-and-france-make-mobile-drivers-licenses-available-almost-immediately

\[44\] « In the future, documents such as an ID-card and driver's
license can be used using a mobile phone in Estonia - Baltic News ».
Consulté le: 19 septembre 2024. \[En ligne\]. Disponible sur:
https://balticnews.com/in-the-future-documents-such-as-an-id-card-and-drivers-license-can-be-used-using-a-mobile-phone-in-estonia/

\[45\] « Driving licence \| Eesti.ee ». Consulté le: 19 septembre 2024.
\[En ligne\]. Disponible sur:
https://www.eesti.ee/eraisik/en/artikkel/traffic/vehicles-and-right-to-drive/driving-licence

\[46\] « What can Estonia offer to the European digital identity? »,
e-Estonia. Consulté le: 19 septembre 2024. \[En ligne\]. Disponible sur:
https://e-estonia.com/what-estonia-offer-to-the-european-digital-identity/

\[47\] T. Phillips, « Czech Republic to roll out mobile driving licences
and digital IDs », NFCW. Consulté le: 19 septembre 2024. \[En ligne\].
Disponible sur:
https://www.nfcw.com/2022/01/25/375734/czech-republic-to-roll-out-mobile-driving-licences-and-digital-ids/

\[48\] « Czech Republic Plans to Introduce Digital Driver's Licenses by
2023 ». Consulté le: 19 septembre 2024. \[En ligne\]. Disponible sur:
https://mobileidworld.com/czech-republic-plans-introduce-digital-drivers-licenses-by-2023-0125021/

\[49\] « Digital driving licences will arrive before 2024 \| RAC
Drive ». Consulté le: 19 septembre 2024. \[En ligne\]. Disponible sur:
https://www.rac.co.uk/drive/news/driving-law/digital-driving-licences-will-arrive-before-2024/

\[50\] « DVLA to launch digital driving licence on phone by next year »,
UK Construction Online. Consulté le: 19 septembre 2024. \[En ligne\].
Disponible sur:
https://www.ukconstructionmedia.co.uk/press-releases/dvla-launch-digital-driving-licence-phone-next-year-lease4less/

\[51\] « UK to introduce digital driving licences », PublicTechnology.
Consulté le: 19 septembre 2024. \[En ligne\]. Disponible sur:
https://www.publictechnology.net/2021/09/21/transport/uk-introduce-digital-driving-licences/

\[52\] « Test of digital ID tech at Surrey nightclub proclaimed success
\| Computer Weekly », ComputerWeekly.com. Consulté le: 19 septembre
2024. \[En ligne\]. Disponible sur:
https://www.computerweekly.com/news/252528785/Test-of-digital-ID-tech-at-Surrey-nightclub-proclaimed-success

\[53\] « New mobile driving license initiatives unveiled in Europe and
the U.S. \| Biometric Update ». Consulté le: 18 septembre 2024. \[En
ligne\]. Disponible sur:
https://www.biometricupdate.com/202110/new-mobile-driving-license-initiatives-unveiled-in-europe-and-the-u-s

\[54\] « EU Council proposes launch of mobile driver's licenses for
digital wallets \| Biometric Update ». Consulté le: 19 septembre 2024.
\[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202312/eu-council-proposes-launch-of-mobile-drivers-licenses-for-digital-wallets

\[55\] « Update of EU driving licence rules to improve road safety \|
News \| European Parliament ». Consulté le: 19 septembre 2024. \[En
ligne\]. Disponible sur:
https://www.europarl.europa.eu/news/en/press-room/20231204IPR15644/update-of-eu-driving-licence-rules-to-improve-road-safety

\[56\] « South Africa Creates Timeline for Digital Driver's Licenses ».
Consulté le: 19 septembre 2024. \[En ligne\]. Disponible sur:
https://mobileidworld.com/south-africa-creates-timeline-digital-drivers-licenses-040508/

\[57\] « South Africa to add biometrics to new driving license cards,
maintains plan for mDLs \| Biometric Update ». Consulté le: 19 septembre
2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202307/south-africa-to-add-biometrics-to-new-driving-license-cards-maintains-plan-for-mdls

\[58\] « New electronic driver's licence to be introduced in South
Africa: Mbalula ». Consulté le: 19 septembre 2024. \[En ligne\].
Disponible sur:
https://businesstech.co.za/news/motoring/569334/new-electronic-drivers-licence-to-be-introduced-in-south-africa-mbalula/

\[59\] « Nigeria Driver's Licence ». Consulté le: 19 septembre 2024.
\[En ligne\]. Disponible sur:
https://www.nigeriadriverslicence.org/digitalLicense

\[60\] « mDL Reader », California DMV. Consulté le: 9 septembre 2024.
\[En ligne\]. Disponible sur:
https://www.dmv.ca.gov/portal/ca-dmv-wallet/mdl-reader/

\[61\] « Data Capture for Mobile Driver's Licenses », Socket Mobile,
Inc. Consulté le: 23 septembre 2024. \[En ligne\]. Disponible sur:
https://www.socketmobile.com/solutions/digital-id/mdl

\[62\] « TSA using state-of-the art identity verification technology,
accepting mobile driver licenses at SLC security checkpoint \|
Transportation Security Administration ». Consulté le: 23 septembre
2024. \[En ligne\]. Disponible sur:
https://www.tsa.gov/news/press/releases/2023/03/09/tsa-using-state-art-identity-verification-technology-accepting

\[63\] « IDScan.net, Credence ID accelerate verification of mobile
driver's licenses \| Biometric Update ». Consulté le: 23 septembre 2024.
\[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202408/idscan-net-credence-id-accelerate-verification-of-mobile-drivers-licenses

\[64\] « HID® Signo^TM^ Readers \| HID Global ». Consulté le: 23
septembre 2024. \[En ligne\]. Disponible sur:
https://www.hidglobal.com/product-mix/signo-readers

\[65\] « BS ISO/IEC 18013-5:2021 \| 31 Oct 2021 \| BSI Knowledge ».
Consulté le: 10 octobre 2024. \[En ligne\]. Disponible sur:
https://knowledge.bsigroup.com/products/personal-identification-iso-compliant-driving-licence-mobile-driving-licence-mdl-application?version=standard

\[66\] « Standards and technology », MATTR Learn. Consulté le: 10
octobre 2024. \[En ligne\]. Disponible sur:
https://learn.mattr.global/docs/profiles/mobile/standards

\[67\] « The Role of Mobile IDs in Payments ».

\[68\] « ISO mDL and related standards », Sezoo. Consulté le: 10 octobre
2024. \[En ligne\]. Disponible sur:
https://www.sezoo.digital/resources/iso-mdl-and-related-standards/

\[69\] « MobileDLImplementationGuidelines-Version1-3.pdf ». Consulté le:
10 octobre 2024. \[En ligne\]. Disponible sur:
https://www.aamva.org/getmedia/261ed16b-3f5c-4678-a2db-cc3016934234/MobileDLImplementationGuidelines-Version1-3.pdf

\[70\] « pdf.pdf ». Consulté le: 11 octobre 2024. \[En ligne\].
Disponible sur:
https://data.consilium.europa.eu/doc/document/ST-15808-2023-INIT/en/pdf

\[71\] « Verifiable Credentials Data Model v1.1 ». Consulté le: 11
octobre 2024. \[En ligne\]. Disponible sur:
https://www.w3.org/TR/vc-data-model/

\[72\] « Web Authentication: An API for accessing Public Key
Credentials - Level 2 ». Consulté le: 11 octobre 2024. \[En ligne\].
Disponible sur: https://www.w3.org/TR/webauthn/

\[73\] « Decentralized Identifiers (DIDs) v1.0 ». Consulté le: 11
octobre 2024. \[En ligne\]. Disponible sur:
https://www.w3.org/TR/did-core/

\[74\] « Identité numérique au Canadaâ€¯: les organismes de
surveillance... », Commission d'accès à  l'information du Québec.
Consulté le: 15 novembre 2024. \[En ligne\]. Disponible sur:
https://www.cai.gouv.qc.ca/actualites/identite-numerique-canada-organismes-surveillance-demandent-gouvernements-assurer-droit-vie-privee-et-transparence-dans-projets-et-systemes

\[75\] C. à  la protection de la vie privée du Canada, « Assurer le droit
à  la vie privée et la transparence dans l'écosystème d'identité
numérique au Canada ». Consulté le: 15 novembre 2024. \[En ligne\].
Disponible sur:
https://www.priv.gc.ca/fr/a-propos-du-commissariat/ce-que-nous-faisons/collaboration-avec-les-provinces-et-les-territoires/resolutions-conjointes-avec-les-provinces-et-territoires/res_220921_02/

\[76\] H. Flanagan, « Verifiable Credentials and mdocs - a tale of two
protocols », Spherical Cow Consulting. Consulté le: 11 octobre 2024.
\[En ligne\]. Disponible sur:
https://sphericalcowconsulting.com/2024/01/03/verifiable-credentials-and-mdocs-a-tale-of-two-protocols/

\[77\] I. W. in Business, « Where the W3C Verifiable Credentials meets
the ISO 18013--5 Mobile Driving License », Medium. Consulté le: 11
octobre 2024. \[En ligne\]. Disponible sur:
https://medium.com/@identitywoman-in-business/where-the-w3c-verifiable-credentials-meets-the-iso-18013-5-mobile-driving-license-2b0a6c992920

\[78\] OECD, *Perspectives de l'économie numérique de l'OCDE 2024
(Volume 1): Cap sur la frontière technologique*. Paris: Organisation for
Economic Co-operation and Development, 2024. Consulté le: 14 novembre
2024. \[En ligne\]. Disponible sur:
https://www.oecd-ilibrary.org/science-and-technology/perspectives-de-l-economie-numerique-de-l-ocde-2024-volume-1_e34abd55-fr

\[79\] « Identité numérique des Québécois: la reconnaissance faciale ne
sera pas obligatoire \| JDQ ». Consulté le: 14 novembre 2024. \[En
ligne\]. Disponible sur:
https://www.journaldequebec.com/2022/02/25/identite-numerique-des-quebecois-la-reconnaissance-faciale-ne-sera-pas-obligatoire

\[80\] « Les services gouvernementaux en ligne et l'identité numérique
(2021) », Académie de la transformation numérique -. Consulté le: 14
novembre 2024. \[En ligne\]. Disponible sur:
https://transformation-numerique.ulaval.ca/enquetes-et-mesure/netendances/les-services-gouvernementaux-en-ligne-et-lidentite-numerique-2021/

\[81\] « Rapport annuel d'activités 2022-2023 du Protecteur du
citoyen ».

\[82\] « China rated Canada's most aggressive cyber threat â€¢ The
Register ». Consulté le: 15 novembre 2024. \[En ligne\]. Disponible sur:
https://www.theregister.com/2024/10/31/canada_cybersec_threats/

\[83\] « Deepfake detectives lay out types of deepfakes and common
attack points \| Biometric Update ». Consulté le: 15 novembre 2024. \[En
ligne\]. Disponible sur:
https://www.biometricupdate.com/202411/deepfake-detectives-lay-out-types-of-deepfakes-and-common-attack-points

\[84\] « New CLR Cert Evaluation Program Tackles Biometrics, Deepfake
Detection ». Consulté le: 15 novembre 2024. \[En ligne\]. Disponible
sur:
https://idtechwire.com/new-clr-cert-evaluation-program-tackles-biometrics-deepfake-detection/

\[85\] « CLR launches comprehensive biometrics, digital ID testing
program \| Biometric Update ». Consulté le: 15 novembre 2024. \[En
ligne\]. Disponible sur:
https://www.biometricupdate.com/202410/clr-launches-comprehensive-biometrics-digital-id-testing-program

\[86\] « CEN/TS 18099:2024 - Biometric data injection attack
detection », iTeh Standards. Consulté le: 15 novembre 2024. \[En
ligne\]. Disponible sur:
https://standards.iteh.ai/catalog/standards/cen/43336798-87a4-49d1-9a0b-4e74c73345a7/cen-ts-18099-2024

\[87\] « ISO/IEC 30107-1:2023 », ISO. Consulté le: 15 novembre 2024.
\[En ligne\]. Disponible sur: https://www.iso.org/standard/83828.html

\[88\] « TrustCloud teams up with iProov to fortify digital identity in
quantum-protected systems \| Biometric Update ». Consulté le: 15
novembre 2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202410/trustcloud-teams-up-with-iproov-to-fortify-digital-identity-in-quantum-protected-systems

\[89\] M. Krim, « Cryptographie post-quantique, Eviden lance ses
premières solutions d'identité numérique résistantes aux attaques
quantiques », IT SOCIAL. Consulté le: 15 novembre 2024. \[En ligne\].
Disponible sur:
https://itsocial.fr/contenus/actualites/cryptographie-post-quantique-eviden-lance-ses-premieres-solutions-didentite-numerique-resistante-aux-attaques-quantiques/

\[90\] « Report: Billions in unclaimed federal benefits could be
accessed using digital IDs \| Biometric Update ». Consulté le: 15
novembre 2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202411/report-billions-in-unclaimed-federal-benefits-could-be-accessed-using-digital-ids

\[91\] « Scammers capitalize on Australia's myID rebrand \| Biometric
Update ». Consulté le: 15 novembre 2024. \[En ligne\]. Disponible sur:
https://www.biometricupdate.com/202411/scammers-capitalize-on-australias-myid-rebrand

\[92\] Z. S.- ICI.Radio-Canada.ca, « Des fraudeurs sans scrupules
s'attaquent aux aînés », Radio-Canada. Consulté le: 15 novembre 2024.
\[En ligne\]. Disponible sur:
https://ici.radio-canada.ca/nouvelle/2052243/fraudeurs-reprensentants-aine-domicile-nip

[^1]: [Cadre de Gouvernance \| Candy
    Governance](https://iccs-isac.github.io/Gouvernance-CICAN-ICDTC-Governance/fr/CANdy%20Network/CANdy-Network-Governance-Framework/)

[^2]: [Les priorités en matière de confiance numérique et de
    cybersécurité ont fait l'objet de discussions au Colloque annuel des
    ministres fédéral, provinciaux et territoriaux --
    CICS](https://scics.ca/fr/product-produit/les-priorites-en-matiere-de-confiance-numerique-et-de-cybersecurite-ont-fait-lobjet-de-discussions-au-colloque-annuel-des-ministres-federal-provinciaux-et-territoriaux/)

[^3]: [Les priorités en matière de confiance numérique et de
    cybersécurité ont fait l'objet de discussions au Colloque annuel des
    ministres fédéral, provinciaux et territoriaux --
    CICS](https://scics.ca/fr/product-produit/les-priorites-en-matiere-de-confiance-numerique-et-de-cybersecurite-ont-fait-lobjet-de-discussions-au-colloque-annuel-des-ministres-federal-provinciaux-et-territoriaux/)

[^4]: <https://www.tvanouvelles.ca/2023/01/19/vous-pourrez-bientot-remplacer-votre-permis-de-conduire-en-ligne>

[^5]: <https://www.journaldequebec.com/2023/01/19/la-saaq-lance-de-nouveaux-services-en-ligne>

[^6]: <https://www.ontario.ca/fr/page/identite-numerique-ontarienne>

[^7]:

[^8]: <https://www.forbes.com/sites/angelicamarideoliveira/2020/05/15/brazil-makes-inroads-towards-digital-id/>

[^9]: <https://www.biometricupdate.com/202404/paraguay-issuing-digital-ids-and-mdls-without-adequate-regulation-ngo-argues>

[^10]: [Japan incentivizes use of My Number ID card as driver's license,
    moves towards mDL \| Biometric
    Update](https://www.biometricupdate.com/202410/japan-incentivizes-use-of-my-number-id-card-as-drivers-license-moves-towards-mdl)

[^11]: [Mobile driver's licenses continue to pick up speed \| Biometric
    Update](https://www.biometricupdate.com/202406/mobile-drivers-licenses-continue-to-pick-up-speed)

[^12]: [https://www.biometricupdate.com/202310/ukraines-digital-identity-app-growing-and-becoming-an-inspiration-for-other-countries](https://can01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.biometricupdate.com%2F202310%2Fukraines-digital-identity-app-growing-and-becoming-an-inspiration-for-other-countries&data=05%7C02%7CInes.Aouadi%40mcn.gouv.qc.ca%7C7a0a2bc6e5f341070ee108dcdc992e96%7C0331467c063c49d0bdba898ee71533e6%7C0%7C0%7C638627797722535607%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=oK1J0TIAFGkD8XhspquVVH7AxbstF0HiKrjOs4DIWTQ%3D&reserved=0)

[^13]: [https://ukraine.ua/invest-trade/digitalization/#:\~:text=Just%20recently%2C%20Ukraine%20has%20become,their%20plastic%20or%20paper%20counterparts.](https://can01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fukraine.ua%2Finvest-trade%2Fdigitalization%2F%23%3A~%3Atext%3DJust%2520recently%252C%2520Ukraine%2520has%2520become%2Ctheir%2520plastic%2520or%2520paper%2520counterparts.&data=05%7C02%7CInes.Aouadi%40mcn.gouv.qc.ca%7C7a0a2bc6e5f341070ee108dcdc992e96%7C0331467c063c49d0bdba898ee71533e6%7C0%7C0%7C638627797722516223%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=WJCpeZiq8y1JHrQD6BY6TNcZivK1x66lyX5os2hSoy4%3D&reserved=0)

[^14]: <https://pay.nigeriadriverslicence.org/digitalLicense>

[^15]: [content](https://dl.gi.de/server/api/core/bitstreams/033c575e-480b-4d61-be5a-dd8dd80514d1/content)

[^16]: <https://spruceid.com/learn/existing-critiques-of-the-mobile-drivers-license>

[^17]: <https://www.quebec.ca/habitation-territoire/amenagement-developpement-territoires/acces-reseaux-cellulaire-internet/operation-couverture-cellulaire>

[^18]: <https://www.quebec.ca/habitation-territoire/amenagement-developpement-territoires/internet-haute-vitesse-etat-situation?type=adresse&value=&code=>

[^19]: <https://www.oag-bvg.gc.ca/internet/Francais/att__f_44225.html>

[^20]: <https://protecteurducitoyen.qc.ca/sites/default/files/2023-09/rapport_annuel-2022-2023-protecteur-citoyen.pdf>

[^21]: <https://www.journaldemontreal.com/2022/01/25/le-quebec-incapable-datteindre-ses-objectifs-de-reduction-de-dechets>

[^22]: <https://basta.media/l-obsolescence-des-smartphones-et-la-collecte-massive-de-donnees-impact-ecologique-du-numerique>

[^23]: <https://www.assnat.qc.ca/fr/travaux-parlementaires/projets-loi/projet-loi-82-43-1.html>

[^24]: <https://digitad.ca/loi-25/>

[^25]: <https://www.quebec.ca/nouvelles/actualites/details/loi-25-sur-la-protection-des-renseignements-personnels-des-citoyens-du-quebec-entree-en-vigueur-de-nouvelles-dispositions-qui-font-du-quebec-un-chef-de-file-mondial-50726>

[^26]: [Georgia mDL can now be added to Samsung Wallet \| Biometric
    Update](https://www.biometricupdate.com/202410/georgia-mdl-can-now-be-added-to-samsung-wallet)

[^27]: [[mDL verification moving from theoretical to practical questions
    \| Biometric
    Update]{.underline}](https://www.biometricupdate.com/202410/mdl-verification-moving-from-theoretical-to-practical-questions)

[^28]: [Digital IDs in Georgia improve accessibility for disabled state
    residents \| Biometric
    Update](https://www.biometricupdate.com/202307/digital-ids-in-georgia-improve-accessibility-for-disabled-state-residents)


