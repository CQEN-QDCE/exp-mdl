// Instantiation des librairies requises 
//
const fs = require('fs');
const crypto = require('crypto');
const EC = require('elliptic').ec;

// Variables d'utilisation de la démo
let assinatura = '';
let data = 'Hello World';   
let algorithm = 'SHA256';

// 
// Validation de la liste de paramètres. Il faut avoir les paramètres selon l'usage suivante: 
// node elSign.js <privateKey> <certificate>
//
if(process.argv.length <= 3){
    console.log("Erreur: manque de paramètres."); 
    console.log("Usage: node elSign.js <privateKey> <certificat>"); 
    return;
}

// Signer la string 
assina(); 

// Valider la signature
valida();     

/**
 * 
 */
function assina(){
    // Carregue a chave privada EC do disco
    const privateKeyPem = fs.readFileSync(process.argv[2], 'utf8');

    // Remova possíveis cabeçalhos adicionais no PEM
    const privateKeyStripped = privateKeyPem.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '');

    // Decodifique a chave privada PEM
    const privateKeyBuffer = Buffer.from(privateKeyStripped, 'base64');

    // Crie um objeto EC
    const ec = new EC('secp256k1'); // Substitua 'secp256k1' pelo nome da curva EC apropriada

    // Crie uma instância da chave privada EC
    const privateKey = ec.keyFromPrivate(privateKeyBuffer);

    // Dados para assinar (por exemplo, uma mensagem)
    const dataToSign = data;

    // Converta a mensagem para um buffer
    const dataBuffer = Buffer.from(dataToSign, 'utf8');

    // Crie um hash SHA-256 da mensagem
    const hash = crypto.createHash(algorithm).update(dataBuffer).digest();

    // Assine o hash usando a chave privada EC
    const signature = privateKey.sign(hash);
    // const signature = crypto.sign(algorithm, data, privateKey);
    console.log(signature); 

    // Converta a assinatura para base64 (opcional)
    const base64Signature = signature.toDER('hex');

    assinatura = base64Signature;
    console.log('Assinatura:', assinatura);
}

/**
 * 
 */
function valida(){
    // Carregue o certificado digital do disco
    console.log('Metodo validacao');

    // Analise o certificado PEM para obter a chave pública
    /*const cert = forge.pki.certificateFromPem(certPem);
    console.log('Certificado lido: ', cert);
    const publicKey = cert.publicKey;
    console.log('Pubic Key: ', publicKey);
    // Dados que foram assinados (por exemplo, uma mensagem)
    */

    const cert = new crypto.X509Certificate(
        fs.readFileSync(process.argv[3])
    );
    
    console.log('Certificado lido: ', cert);
    const publicKey = cert.publicKey;
    console.log('Pubic Key: ', publicKey);

    const dataToVerify = Buffer.from(data, 'utf8');

    // Converta a mensagem para um buffer
    const dataBuffer = Buffer.from(dataToVerify, 'utf8');

    // Crie um hash SHA-256 da mensagem
    const hash = crypto.createHash(algorithm).update(dataToVerify).digest();

    // Assinatura a ser verificada (você obteria isso do processo de assinatura)
    const signatureToVerify = Buffer.from(assinatura, 'utf8'); // Substitua isso pela assinatura gerada no passo anterior

    // Converta a assinatura de base64 (se necessário)
    const signatureBuffer = Buffer.from(signatureToVerify, 'hex');

    // Verifique a assinatura
    // const isSignatureValid = publicKey.verify(hash, signatureBuffer);
    const isSignatureValid = crypto.verify(algorithm, data, publicKey, Buffer.from(assinatura, 'utf8'));
    console.log('A assinatura é válida?', isSignatureValid);
}