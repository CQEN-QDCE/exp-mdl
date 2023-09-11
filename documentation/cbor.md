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
