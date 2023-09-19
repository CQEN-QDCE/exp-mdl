# Démystifier les mythes à propos des attestations vérifiables

Parmi les nombreux mythes, il y en a quatre importants à démystifier.

Tout d'abord, les attestations vérifiables ne sont pas équivalentes aux affirmations auto-déclarés. Les protocoles utilisés pour mettre en place les attestations vérifiables peuvent certainement permettre aux utilisateurs de présenter aux vérificateurs des affirmations auto-déclarés. Mais ils peuvent également inclure des attestations vérifiables émises par des entités tierces qui offrent des services de confiance en ligne, ou des entités gouvernementales qui délivrent des attestations physiques. En bref, les attestations vérifiables sont un super-ensemble de ces deux types d'attestations.

Les attestations vérifiables ne sont pas équivalentes à l'autosouveraineté, lorsqu'elles impliquent l'autonomie de l'utilisateur et sa liberté par rapport aux émetteurs et aux vérificateurs, ce qui est difficile à réaliser dans des cas d'utilisation réels, en particulier dans les cas d'utilisation réglementés. Même lorsque le vérificateur a obtenu les affirmations
directement de l'utilisateur, c'est toujours au vérificateur qu'il revient de décider s'il les accepte et de fournir le service à l'utilisateur (ou non). Quel que soit l'endroit où l'utilisateur
prévoit d'utiliser une attestation vérifiable, c'est toujours à l'émetteur de décider s'il doit délivrer une attestation à l'utilisateur. Même après l'émission, dans la plupart des cas, l'émetteur conserve le droit de révoquer et de l'invalider.

Deuxièmement, les attestations vérifiables ne sont pas analogues à l'utilisation de la technologie des registres distribués (DLT) ou des chaînes de bloc. Pour que les utilisateurs puissent recevoir directement les attestations vérifiables des émetteurs et les présenter directement aux vérificateurs, il est essentiel de mettre en place un mécanisme permettant aux vérificateurs d'obtenir les clés publiques contrôlées par les émetteurs. Les identifiants décentralisés (DID), qui s'appuient sur un DLT ou une chaîne de bloc, constituent un mécanisme utile pour ce faire. Cependant, tous les DID ne reposent pas sur un DLT ou une blockchain. Il existe d'autres mécanismes, tels que l'obtention de clés publiques via une infrastructure à clés publiques (PKI) ou des pages web accessibles sous un nom de domaine contrôlé l'entité émettrice. D'autres techniques de mise en oeuvre décentralisées ont leur rôle à jouer, mais elles ne sont ni nécessaires, ni suffisantes
pour parvenir à un écosystème d'émission d'attestations vérifiables.

Troisièmement, les attestations vérifiables ne sont pas analogues à l'utilisation du modèle de données "Verifiable Credentials" du W3C. D'autres modèles de données peuvent être utilisés, par exemple le modèle mDL conforme à la norme ISO.

Quatrièmement, les attestations vérifiables peuvent avoir différents degrés d'ouverture en termes de participation.
Certains écosystèmes, comme ceux gérés par un gouvernement, peuvent exiger certaines permissions
ou des certifications pour les fournisseurs d'applications de portefeuilles, les émetteurs et les vérificateurs afin de rejoindre leur écosystème, tandis que d'autres peuvent être totalement ouverts à quiconque. C'est exactement comme les systèmes de gestion d'identité fédérés, qui offrent différents modèles de gouvernance et de participation.
