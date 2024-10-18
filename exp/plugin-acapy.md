# Plugin aca-py pour support à ECDSA et x.509 

## Algorithmes 

La liste des algorithmes de crypto qui sont utilisés dans aca-py et credo-ts.

Ensuite vérifie auprès du NIST/FIPS s'ils sont homologés. 

Les algorithmes utilisés dans aca-py sont: 

EdDSA: Edwards-curve Digital Signature Algorithm: c'est un algorithme de signature numérique qui utilise une variante de la Schnorr signature, basée sur les twisted Edwards curves.

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


## Références

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

