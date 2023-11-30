const crypto = require("crypto")
const fs = require("fs")

if (process.argv.length <= 2){
    console.log("Error: parameter"); 
    console.log("Usage: node parse.js <certificate>.crt"); 
    return;
}

//function parseCertificate(){
    const cert = new crypto.X509Certificate(
        fs.readFileSync(process.argv[2])
    ); 
    
    console.log("Serial Number: ", cert.serialNumber)
    console.log("Issuer: ", cert.issuer)
    console.log("==========================================")
    console.log("Subjet: ", cert.subject)
    console.log("Subject altName: ", cert.subjectAltName)
    console.log("==========================================")
    console.log("Key usage: ", cert.keyUsage)
    console.log("Valid From: ", cert.validFrom)
    console.log("Valid To: ", cert.validTo)
    console.log("Fingerprint: ", cert.fingerprint)
    console.log("Fingerprint256: ", cert.fingerprint256)
    console.log("Info access", cert.infoAccess)
    console.log("", cert.publicKey)
    console.log("", cert.raw)

//}

// parseCertificate