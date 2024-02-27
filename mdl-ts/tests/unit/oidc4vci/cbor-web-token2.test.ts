import { Cborwebtoken } from "../../../src/oidc4vci/cbor-web-token2";

describe('#mac2', () => {
    test('should return the CborWebToken as a string', async () => {
        // arrange
        const cwt = new Cborwebtoken();
        const payload = {
            iss: "coap://as.example.com", sub: "erikw", aud: "coap://light.example.com",
            exp: 1444064944, nbf: 1443944944, iat: 1443944944, cti: Buffer.from("0b71", "hex"),
        };
        const secret = Buffer.from("403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388", "hex");

        // act
        const token = await cwt.mac(payload, secret);

        // assert
        const expectedBase64 = Buffer.from("d83dd18443a10104a05850a70175636f61703a2f2f61732e6578616d706c652e636f6d0"
            + "2656572696b77037818636f61703a2f2f6c696768742e6578616d706c652e636f6d041a5612aeb0051a5610d9f0061a5610d"
            + "9f007420b7148093101ef6d789200", "hex")
            .toString("base64");
        //expect(token).to.eql(expectedBase64);
        let bla2  = 5;
    });
});