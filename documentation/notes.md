[mDL, eID and beyond](https://walt.id/blog/p/mdl-eid-and-beyond)
=======
[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENSE)

---

<div>
    <img src="https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png" />
</div>

# Notes sur références à mDL autour du monde

Transportation Security Administration seeks comments on proposed regulation regarding mobile driver’s licenses and REAL ID-compliant identification   
https://www.tsa.gov/news/press/releases/2023/08/30/transportation-security-administration-seeks-comments-proposed-0

THALES: The Mobile Driver’s License is here
https://www.thalesgroup.com/en/markets/digital-identity-and-security/government/mobile-driver-licence

mDl Connection: https://www.mdlconnection.com/

### Fournisseurs de solutions mDL

L'autre joueur majeur mDL est également Scytales:   
https://www.scytales.com/

Il y a IDEMIA aussi qui a travaillé sur des projets aux USA  
https://www.idemia.com/fr/

### Implémentations du "Mobile Driver License" (mDL)
1. Dépôt [Identity credential](https://github.com/google/identity-credential)
contient des bibliothèques et des applications liées à l'API "Android Identity Credential" qui est fournie avec l'Android Framework à partir d'Android 11. Cette API permet l'implémentationde l'ISO/IEC 18013-5:2021 incluant les normes connexes.
2. IDEMIA - [Guide de développement pour iOS](https://experience.idemia.com/mobile-id/develop/verify-sdks/ios/1_4/): Le SDK IDEMIA Verify - iOS v1.4.0 est destiné aux développeurs qui souhaitent vérifier les permis de conduire mobiles (mDL) dans leurs applications mobiles.
3. AAMVA - [Lignes directrices pour la mise en œuvre du permis de conduire mobile (mDL)](https://www.aamva.org/getmedia/b801da7b-5584-466c-8aeb-f230cef6dda5/mDL-Implementation-Guidelines-Version-1-2_final.pdf)
4. Dépôt [Credible](https://github.com/spruceid/credible): Portefeuille mobile natif qui prend en charge les identifiants vérifiables du W3C et les identifiants décentralisés, construit sur DIDKit et Flutter. Intégration de la bibliothèque DIDKit écrite en Rust dans une application Flutter fonctionnant à la fois sur Android et iOS, en utilisant des liaisons C et les capacités FFI de Dart.
   
mobile-document-request-api: https://github.com/WICG/mobile-document-request-api

Mobile Driver’s License US Adoption: 
https://idscan.net/mobile-drivers-licenses-mdl-state-adoption/

Verifiable Credentials and ISO/IEC 18013-5 Based Credentials
https://collateral-library-production.s3.amazonaws.com/uploads/asset_file/attachment/36416/CS676613_-_Digital_Credentials_promotion_campaign-White_Paper_R3.pdf

SpruceId - SpruceKit
https://blog.spruceid.com/introducing-sprucekit/

Sphereon (portefeuille qui supporte les attestations W3C)
https://github.com/Sphereon-Opensource/ssi-mobile-wallet

AAMVA - Mobile Driver License
https://www.aamva.org/topics/mobile-driver-license#?wst=4a3b89462cc2cff2cbe0c7accde57421

Dépôts de SprucId
https://github.com/orgs/spruceid/repositories?type=all

Support du standard ISO 18013-5 “Mobile driving licence (mDL) application” sur Android
https://android-developers.googleblog.com/2020/11/privacy-preserving-features-in-mobile.html


Anouncement: NorthernBlock Unifying mDLs & Verifiable Credentials for Canadians  
https://northernblock.io/announcement/unifying-mdls-and-verifiable-credentials/


###  Trust Over IP Trust Registry Task Force 

Présentation faite par Northern Block pour montrer leur vision sur le `trust registry framework`.    
https://zoom.us/rec/share/Hx-3oOZBL_vIPgf-2I6zP7QuBdQNKki4yULa2U71-VMvIrXUrS21HBAobYKBoUV5.gDEK5BKn5yJUq7nN


### Multicredential issuance and presentations

Le fichier powerpoint partagé par Northern Block sur les émissions et présentations qui utilisent plusieurs types d'attestation. 

Le fichier est déposé sur l'adresse suivante: `./resources/Multi Credential Presentations MB.pptm` 

<!-- [Slides multi credential presentations](./resources/Multi Credential Presentations MB.pptm) -->


## Sécurité de la cryptographie 

Les informations ci-dessous, retirées du document `Cryptographic Module Validation Program`, référé ci-dessous. Elles sont rélevantes pour le projet mDL, mais aussi pour tout autre projet qui puisse avoir un lien avec le fédéral, comme SQIN. 


    Le 17 juillet 1995, le NIST a établi le programme `Cryptographic Module Validation Program (CMVP)` que valide les modules cryptographiques utilisés par le `Federal Information Processing Standards (FIPS)140-1`, requis de sécurité pour modules cryptographiques et autres standards basés sur FIPS. 

    FIPS 140-2, a été déployé le 25 mai 2001 et remplace FIPS 140-1. Le CMVP est un effort conjoint entre le NIST et le `Centre canadien pour la cybersécurité (CCCS)`, une branche du `Centre de la sécurité des communications (CSE)`. 

    Les modules validés comme conformes à la norme FIPS 140-2 sont **acceptés par les agences fédérales des deux pays** pour la protection des informations sensibles.


**Liste de docs relevants:**

FIPS 140-2 : Security Requirements for Cryptographic Modules   
https://csrc.nist.rip/publications/detail/fips/140/2/final

Cryptographic Module Validation Program  
https://csrc.nist.rip/projects/cryptographic-module-validation-program

Ursa Library Motivation - Point #5   
https://wiki.hyperledger.org/display/ursa/Ursa+Library+Motivation  

Blockchain Compliance with Federal Cryptographic Information Processing Standards   
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3381692