const forge = require('node-forge');
const fs = require('fs');

// Carregue a chave privada PEM do disco
//const privateKeyPem = fs.readFileSync('caminho/para/sua/chave-privada.pem', 'utf8');

if(process.argv.length >= 2){
    console.log("Error: parametres insufisants."); 
    console.log("Usage: node forgeSign <private>.key");
    return;
}

const privateKeyPem = fs.readFileSync(process.argv[2], 'utf8');

const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

// Dados para assinar (por exemplo, uma mensagem)
const dataToSign = 'Hello, World!';

// Crie um objeto de assinatura
const md = forge.md.sha256.create();
md.update(dataToSign, 'utf8');
const signature = privateKey.sign(md);

// Converta a assinatura para base64 (opcional)
const base64Signature = forge.util.encode64(signature);

console.log('Assinatura:', base64Signature);
