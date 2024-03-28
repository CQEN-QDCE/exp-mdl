import { Base64 } from "../utils/base64";
import { JsonStringifier } from "../utils/json.stringifier";
import rs from "jsrsasign";
import { Hex } from "../utils/hex";
import { Text } from "../utils/text";

export class Jwt {
    
    private readonly SIGNATURE_ALGORITHM = "SHA256withECDSA"

    constructor(private readonly header: any, public readonly payload: any, private readonly signature: ArrayBuffer) {
    }

    public static async verify(encodedJwt: string, publicKey: rs.KJUR.crypto.ECDSA = null): Promise<boolean> {
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


        //const enc = new TextEncoder();

        const verifier = new rs.KJUR.crypto.Signature({"alg": "SHA256withECDSA"});
        verifier.init(<rs.KJUR.crypto.ECDSA>publicKey);
        verifier.updateHex(Hex.encode(Text.encode(decoded[0] + '.' + decoded[1])));
        const response = verifier.verify(Hex.encode(signature));

        return response;
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

    public static async encode(payload: any, privateKey: rs.KJUR.crypto.ECDSA, certificateChain: rs.KJUR.asn1.x509.Certificate[] = []): Promise<string> {
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
        //const enc = new TextEncoder(); 
        const headerBase64 = Base64.urlEncode(Text.encode(JSON.stringify(headerJson)));
        let v = JsonStringifier.stringify(payload);
        const payloadBase64 = Base64.urlEncode(Text.encode(JSON.stringify(payload)));

        const signature = new rs.KJUR.crypto.Signature({"alg": "SHA256withECDSA"});
        signature.init(<rs.KJUR.crypto.ECDSA>privateKey);
        signature.updateHex(Hex.encode(Text.encode(headerBase64 + '.' + payloadBase64)));
        const signatureBase64 = Base64.urlEncode(Hex.decode(signature.sign()));

        return headerBase64 + '.' + payloadBase64 + '.' + signatureBase64;
    }

    private static parseCertificateChain(certificateChain: string[]): rs.KJUR.asn1.x509.Certificate[] {
    //    return certificateChain.map {
    //        val bytes = Base64.getDecoder().decode(it)
    //        CertificateFactory.getInstance("X509")
    //            .generateCertificate(ByteArrayInputStream(bytes)) as X509Certificate
    //    }
        throw "not implemented";
    }
}