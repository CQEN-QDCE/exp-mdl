/**
 * Signature et vérification avec elliptic curves
 */
let curve = 'secp256k1'; 
let typeCurve = 'elliptic'; 

let EC = require(typeCurve).ec;

// Créér et initialise le context d'EC 
// (better do it once and reuse it)
var ec = new EC(curve);

// Générer le pair de clé
var key = ec.genKeyPair(); 

// Signe le hash du message (input doit être un array ou une hex-string)
var msg = 'Hello fresh'; 
var msgHash = Buffer.from(msg, 'utf8');
var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var signature = key.sign(msgHash);

var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

// Exporte la signature DER-encoded dans un Array
var derSign = signature.toDER();

// Vérifier la signature 
console.log(key.verify(msgHash, derSign));
