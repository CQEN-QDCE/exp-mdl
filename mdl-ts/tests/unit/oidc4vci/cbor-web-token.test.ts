import { CborWebToken } from "../../../src/oidc4vci/cbor-web-token";
import { Text } from "../../../src/utils/text";

describe('#mac', () => {
    test('should return the CborWebToken as a string', async () => {
        const cwt = new CborWebToken();
        cwt.issuer = 'coap://as.example.com';
        cwt.subject = 'erikw';
        cwt.audience = 'coap://light.example.com';
        cwt.expiration = 1444064944;
        cwt.notBefore = 1443944944;
        cwt.issuedAt = 1443944944;
        cwt.cwtId = new Uint8Array(Buffer.from("0b71", "hex")).buffer;
        

        const secret = Buffer.from("403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388", "hex");

        let token = await cwt.mac(secret);

        const expectedBase64 = Buffer.from("d83dd18443a10104a05850a70175636f61703a2f2f61732e6578616d706c652e636f6d0"
        + "2656572696b77037818636f61703a2f2f6c696768742e6578616d706c652e636f6d041a5612aeb0051a5610d9f0061a5610d"
        + "9f007420b7148093101ef6d789200", "hex")
        .toString("base64");

        let bla2  = 5;
    });

    test('should return the payload if the signature is valid', async () => {
        
        const cwt = new CborWebToken();
        cwt.issuer = 'coap://as.example.com';
        cwt.subject = 'erikw';
        cwt.audience = 'coap://light.example.com';
        cwt.expiration = 1444064944;
        cwt.notBefore = 1443944944;
        cwt.issuedAt = 1443944944;
        cwt.cwtId = new Uint8Array(Buffer.from("0b71", "hex")).buffer;
        
        //const textEncoder = new TextEncoder(); // always utf-8
        const secret = Text.encode("my-secret");

        await cwt.mac(secret);
        let token = cwt.serialize();
        let cwt2 = CborWebToken.parse(token);
        let bla = await cwt.verify(secret);

        const expectedBase64 = Buffer.from("d83dd18443a10104a05850a70175636f61703a2f2f61732e6578616d706c652e636f6d0"
        + "2656572696b77037818636f61703a2f2f6c696768742e6578616d706c652e636f6d041a5612aeb0051a5610d9f0061a5610d"
        + "9f007420b7148093101ef6d789200", "hex")
        .toString("base64");

        let bla2  = 5;
    });
});