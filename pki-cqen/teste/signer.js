const crypto = require("crypto")
const fs = require("fs")

/*const cert = new crypto.X509Certificate(
    fs.readFileSync(process.argv[2])
); */

const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {namedCurve: 'sect233k1'});

const sign = crypto.createSign('SHA256'); 
sign.update('some data to sign'); 
sign.end(); 

const signature = sign.sign(privateKey); 

const verify = crypto.createVerify('SHA256'); 
verify.update('some data to sign'); 
verify.end(); 

console.log(verify.verify(publicKey)); 