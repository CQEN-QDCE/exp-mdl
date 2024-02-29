import { Base64 } from "../utils/base64";
import * as x509 from "@peculiar/x509";
import { Crypto } from "@peculiar/webcrypto";
import { JsonStringifier } from "../utils/json.stringifier";

export class Jwt {
    
    private readonly SIGNATURE_ALGORITHM = "SHA256withECDSA"

    constructor(private readonly header: any, public readonly payload: any, private readonly signature: ArrayBuffer) {
    }

    public static async verify(encodedJwt: string, publicKey: CryptoKey = null): Promise<boolean> {
        const pk = publicKey;
        const jwt = this.decode(encodedJwt)
        //val signatureAlgorithm = Signature.getInstance(SIGNATURE_ALGORITHM)
        if (pk == null) { // TODO: check if this is correct
//            val rawCertificateChain = (jwt.header["x5c"] as JsonArray).map {
//                it.jsonPrimitive.content
//            }
//            val certificateChain = parseCertificateChain(rawCertificateChain)
//            pk = certificateChain.first().publicKey as ECPublicKey
        }

        const decoded = encodedJwt.split(".");
        if (decoded.length != 3) throw "Invalid JWT";
        const signature = Base64.urlDecode(decoded[2]);

        const crypto = new Crypto();
        x509.cryptoProvider.set(crypto);
        const algo =   {
            name: "ECDSA",
            hash: { name: "SHA-256" },
        };
        var enc = new TextEncoder()
        return await crypto.subtle.verify(algo, publicKey, signature, enc.encode(decoded[0] + '.' + decoded[1]));
    }

    public static decode(encodedJwt: string): Jwt {
        const decoded = encodedJwt.split(".");
        if (decoded.length != 3) throw "Invalid JWT";
        const val0 = Base64.urlDecode(decoded[0]);
        const val1 = Base64.urlDecode(decoded[1]);
        const val2 = Base64.urlDecode(decoded[2]);
        const textDecoder = new TextDecoder("utf-8");
        const header = JSON.parse(textDecoder.decode(Base64.urlDecode(decoded[0])));
        const payload = JSON.parse(textDecoder.decode(Base64.urlDecode(decoded[1])));
        const signature = Base64.urlDecode(decoded[2]);
        return new Jwt(header, payload, signature);
    }

    public static async encode(payload: any, privateKey: CryptoKey, certificateChain: x509.X509Certificate[] = []): Promise<string> {
        const headerJson = {};
        headerJson["alg"] = "ES256";
        headerJson["typ"] = "JWT";
        if (certificateChain.length > 0) { // TODO: check if this is correct
//            putJsonArray("x5c") {
//                certificateChain.map {
//                    String(Base64.getEncoder().encode(it.encoded))
//                }.forEach {
//                    add(it)
//                }
        }
        let oldStringify = JSON.stringify;
        JSON.stringify = (obj, replacer, space) => oldStringify(obj, replacer || ((key, value) => {if(key && value === obj) return "[recursive]"; return value;}), space)
        const enc = new TextEncoder(); 
        const headerBase64 = Base64.urlEncode(enc.encode(JSON.stringify(headerJson)));
        let v = JsonStringifier.stringify(payload);
        const payloadBase64 = Base64.urlEncode(enc.encode(JSON.stringify(payload)));

        const crypto = new Crypto();
        x509.cryptoProvider.set(crypto);
        const algo =   {
            name: "ECDSA",
            hash: { name: "SHA-256" },
          };
        const signature = await crypto.subtle.sign(algo, privateKey, enc.encode(headerBase64 + '.' + payloadBase64));
        const signatureBase64 = Base64.urlEncode(signature);
        return headerBase64 + '.' + payloadBase64 + '.' + signatureBase64;
    }

    private static parseCertificateChain(certificateChain: string[]): x509.X509Certificate[] {
    //    return certificateChain.map {
    //        val bytes = Base64.getDecoder().decode(it)
    //        CertificateFactory.getInstance("X509")
    //            .generateCertificate(ByteArrayInputStream(bytes)) as X509Certificate
    //    }
        throw "not implemented";
    }
}