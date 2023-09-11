# Concise Binary Object Representation (CBOR)

Le format de données "Représentation Binaire Concise des Objets", ou Concise Binary Object Representation (CBOR), encode les informations dans une représentation binaire compacte. Il est utilisé dans le standar mDL pour encoder les données d'un document.

* CBOR peut encoder les types de données courants tels que les entiers, les nombres à virgule flottante, les chaînes de caractères, les tableaux, etc. Il prend en charge à la fois les types de données standard et les types d'extension;
* CBOR est conçu pour fournir un encodage de très petite taille. Il convient donc aux cas d'utilisation où la bande passante ou l'espace de stockage sont limités;
* CBOR peut encoder des structures de données complexes telles que des objets et des tableaux dans un format binaire compact. Cela permet aux données sérialisées de CBOR d'être analysées dans les structures de données natives;
* CBOR est extensible et se décrit lui-même. Des informations facultatives sur le type et la longueur peuvent être incluses pour faciliter le traitement. Des types d'extension personnalisés peuvent également être définis;
* CBOR est utilisé dans les protocoles et les systèmes qui nécessitent une représentation efficace des données binaires. Il s'agit par exemple de protocoles IOT tels que COAP, de formats de messagerie tels que JSON-LD et de technologies blockchain;
Les informations d'identification vérifiables normalisées par le W3C encodent le contenu des informations d'identification au format CBOR. Cela permet aux informations d'identification d'être signées cryptographiquement et vérifiables.

```python
import cbor2

# Data to encode 
data = {
  'name': 'John Doe',
  'id': 12345,
  'grades': [90, 80, 95],
  'active': True
}

# Encode data to CBOR bytes
encoded = cbor2.dumps(data) 

# Encoded output (in hex for readability)
print(encoded.hex())

# a5636e616d65654a6f686e20446f656269640f3039ca010a005994010f
```
* Nous commençons par un dict Python avec des types de données mixtes comme des chaînes, des entiers, des listes et des booléens.
* cbor2.dumps() encode le dict Python en un objet CBOR bytes.
* Lorsqu'il est imprimé en hexadécimal, nous pouvons voir l'encodage CBOR compact :
a5 - carte de 5 paires
63 6e616d65 - chaîne de texte "nom"
65 4a6f686e20446f65 - chaîne de texte "John Doe"
69 64 - chaîne de texte "id"
0f 3039 - nombre entier 12345
ca - balise indiquant que l'élément suivant est un tableau
01 - tableau de 3 éléments
0a - nombre entier 90
00 - nombre entier 80
59 - nombre entier 95
94 - balise indiquant que l'élément suivant est un booléen
01 - valueur booléenne 'vrai'
