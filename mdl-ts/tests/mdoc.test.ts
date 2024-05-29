import { CborDecoder } from "../src/cbor/cbor-decoder";
import { CborEncodedDataItem } from "../src/cbor/types/cbor-encoded-data-item";
import { CborMap } from "../src/cbor/types/cbor-map";
import { DeviceResponse } from "../src/data-retrieval/device-response";
import { MDocRequestBuilder } from "../src/doc-request/mdoc-request-builder";
import { DeviceAuthentication } from "../src/mdoc-auth/device-authentication";
import { TestCertificates } from "./test-certificates";
import { TestCertificatesBuilder } from "./test-certificates-builder";
import { ValidityInfo } from "../src/mso/validity-info";
import { CborFullDate } from "../src/cbor/types/cbor-full-date";
import { CborNumber } from "../src/cbor/types/cbor-number";
import { IssuerSigned } from "../src/issuer-signed/issuer-signed";
import { DeviceSigned } from "../src/mdoc/device-signed";
import { DeviceRequest } from "../src/data-retrieval/device-request";
import { Hex } from "../src/utils/hex";
import { MDocRequestVerificationParams } from "../src/doc-request/mdoc-request-verification-params";
import { VerificationType } from "../src/mdoc/verification-type.enum";
import { MDocVerificationParams } from "../src/mdoc/mdoc-verification-params";
import { CborEncoder } from "../src/cbor/cbor-encoder";
import { DeviceKeyInfo } from "../src/mso/device-key-info";
import { CborDataItem } from "../src/cbor/cbor-data-item";
import { CborByteString } from "../src/cbor/types/cbor-byte-string";
import { CborNil } from "../src/cbor/types/cbor-nil";
import { CoseKey } from "../src/cose/cose-key";
import { ItemsRequest } from "../src/doc-request/items-request";
import { CoseAlgorithm } from "../src/cose/cose-algorithm.enum";
import { COSECryptoProvider } from "../src/cose/cose-crypto-provider";
import { DigestAlgorithm } from "../src/mdoc/digest-algorithm.enum";
import { Cbor } from "../src/cbor/cbor";
import { CborArray } from "../src/cbor/types/cbor-array";
import { CborTextString } from "../src/cbor/types/cbor-text-string";
import { MobileDocument } from "../src/mdoc/mobile-document";
import { MobileDocumentBuilder } from "../src/mdoc/mobile-document-builder";
import { MDL } from "../src/mdoc/mdl";
import { SimpleCOSECryptoProviderKeyInfo } from "../src/cose/simple-cose-crypto-provider-key-info";
import { SimpleCOSECryptoProvider } from "../src/cose/simple-cose-crypto-provider";
import { ReaderAuthentication } from "../src/mdoc-auth/reader-authentication";
import rs from "jsrsasign";

describe('testing mdoc', () => {
    
    let testCertificates: TestCertificates;

    let coseCryptoProvider: COSECryptoProvider;

    const ISSUER_KEY_ID = 'issuer-key-id';

    const DEVICE_KEY_ID = 'device-key-id';

    const READER_KEY_ID = 'READER_KEY';

    beforeAll(async () => {
        testCertificates = await TestCertificatesBuilder.build();

        const issuerKeyInfo = new SimpleCOSECryptoProviderKeyInfo(ISSUER_KEY_ID, 
            'ECDSA_256',
            testCertificates.issuerKeyPair.pubKeyObj, 
            testCertificates.issuerKeyPair.prvKeyObj, 
            [testCertificates.issuerCertificate],
            [testCertificates.caCertificate]);

        const deviceKeyInfo = new SimpleCOSECryptoProviderKeyInfo(DEVICE_KEY_ID, 
            'ECDSA_256',
            testCertificates.deviceKeyPair.pubKeyObj, 
            testCertificates.deviceKeyPair.prvKeyObj);

        coseCryptoProvider = new SimpleCOSECryptoProvider([issuerKeyInfo, deviceKeyInfo]);
    });

    test('Sign mDL', async () => {

        const coseKey = await CoseKey.new(testCertificates.issuerKeyPair.pubKeyObj);

        const deviceKeyInfo = new DeviceKeyInfo(coseKey)

        const days = 15;
        const validityInfo = new ValidityInfo(new Date(), new Date(), new Date( Date.now() + days * 24 * 60 * 60 * 1000));

        const mdoc = await new MobileDocumentBuilder(MDL.DocType).addItemToSign(MDL.Namespace, "family_name", new CborTextString("Doe"))
                                                                 .addItemToSign(MDL.Namespace, "given_name", new CborTextString("John"))
                                                                 .addItemToSign(MDL.Namespace, "birth_date", new CborFullDate(new Date(1990, 0, 15, 0, 0, 0, 0)))
                                                                 .sign(validityInfo, 
                                                                       deviceKeyInfo, 
                                                                       coseCryptoProvider, 
                                                                       ISSUER_KEY_ID);

        const issuerSignedItems = mdoc.getIssuerSignedItems(MDL.Namespace);

        expect(mdoc.mso).not.toBeNull();
        expect(mdoc.mso.digestAlgorithm).toBe(DigestAlgorithm.SHA256);
        expect(issuerSignedItems.length).toBe(3);
        expect(issuerSignedItems[0].digestID).toBe(0);
        expect(mdoc.mso.valueDigests.get(MDL.Namespace)).not.toBeNull();

        const params = new MDocVerificationParams();
        params.verificationTypes = [VerificationType.VALIDITY,
                                    VerificationType.DOC_TYPE, 
                                    VerificationType.CERTIFICATE_CHAIN,
                                    VerificationType.ITEMS_TAMPER_CHECK, 
                                    VerificationType.ISSUER_SIGNATURE];
        params.issuerKeyID = ISSUER_KEY_ID;

        expect(await mdoc.verify(params, coseCryptoProvider)).toBeTruthy();

        const tamperedMdoc = new MobileDocumentBuilder(MDL.DocType).addItemToSign(MDL.Namespace, "family_name", new CborTextString("Foe"))
                                                                     .build(mdoc.issuerSigned.issuerAuth);
        // MSO is valid, signature check should succeed.
        const signature = await coseCryptoProvider.verify1(tamperedMdoc.issuerSigned.issuerAuth, ISSUER_KEY_ID);
        expect(signature).toBeTruthy();

        // signed item was tampered, overall verification should fail.
        const tamperedMdocVerified = await tamperedMdoc.verify(params, coseCryptoProvider);
        expect(tamperedMdocVerified).toBeFalsy();

        const ephemeralReaderKeyPair = await TestCertificatesBuilder.generateKey();

        const ephemeralReaderCoseKey = await CoseKey.new(ephemeralReaderKeyPair.publicKey, ephemeralReaderKeyPair.privateKey);

        const deviceAuthentication = new DeviceAuthentication(new CborArray(new CborNil(), 
                                                                            CborEncodedDataItem.encode(CborDataItem.from(ephemeralReaderCoseKey)), 
                                                                            new CborNil()), 
                                                              mdoc.docType, 
                                                              CborEncodedDataItem.encode(new CborMap()));
        
        const mdocRequest = new MDocRequestBuilder(mdoc.docType).addItemRequest(MDL.Namespace, "family_name", true).build();

        const presentedDoc = await mdoc.presentWithDeviceSignature(mdocRequest, deviceAuthentication, coseCryptoProvider, DEVICE_KEY_ID);

        const params2 = new MDocVerificationParams();
        params2.verificationTypes = [//VerificationType.VALIDITY, // TODO: Implement validity verification
                                    VerificationType.DOC_TYPE, 
                                    //VerificationType.CERTIFICATE_CHAIN, // TODO: Implement certificate chain verification
                                    VerificationType.ITEMS_TAMPER_CHECK, 
                                    VerificationType.ISSUER_SIGNATURE];
        params2.issuerKeyID = ISSUER_KEY_ID;
        params2.deviceKeyID = DEVICE_KEY_ID;
        params2.deviceAuthentication = deviceAuthentication;
        params2.mDocRequest = mdocRequest;

        const verif = await presentedDoc.verify(params2, coseCryptoProvider);
        expect(verif).toBeTruthy();
    });

    test('Verify Mdoc example by certificate in COSE header', async () => {
        // example from ISO/IEC FDIS 18013-5: D.4.1.2 mdoc response
        const mdocExampleBytes = Hex.decode('a36776657273696f6e63312e3069646f63756d656e747381a367646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c6973737565725369676e6564a26a6e616d65537061636573a1716f72672e69736f2e31383031332e352e3186d8185863a4686469676573744944006672616e646f6d58208798645b20ea200e19ffabac92624bee6aec63aceedecfb1b80077d22bfc20e971656c656d656e744964656e7469666965726b66616d696c795f6e616d656c656c656d656e7456616c756563446f65d818586ca4686469676573744944036672616e646f6d5820b23f627e8999c706df0c0a4ed98ad74af988af619b4bb078b89058553f44615d71656c656d656e744964656e7469666965726a69737375655f646174656c656c656d656e7456616c7565d903ec6a323031392d31302d3230d818586da4686469676573744944046672616e646f6d5820c7ffa307e5de921e67ba5878094787e8807ac8e7b5b3932d2ce80f00f3e9abaf71656c656d656e744964656e7469666965726b6578706972795f646174656c656c656d656e7456616c7565d903ec6a323032342d31302d3230d818586da4686469676573744944076672616e646f6d582026052a42e5880557a806c1459af3fb7eb505d3781566329d0b604b845b5f9e6871656c656d656e744964656e7469666965726f646f63756d656e745f6e756d6265726c656c656d656e7456616c756569313233343536373839d818590471a4686469676573744944086672616e646f6d5820d094dad764a2eb9deb5210e9d899643efbd1d069cc311d3295516ca0b024412d71656c656d656e744964656e74696669657268706f7274726169746c656c656d656e7456616c7565590412ffd8ffe000104a46494600010101009000900000ffdb004300130d0e110e0c13110f11151413171d301f1d1a1a1d3a2a2c2330453d4947443d43414c566d5d4c51685241435f82606871757b7c7b4a5c869085778f6d787b76ffdb0043011415151d191d381f1f38764f434f7676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676ffc00011080018006403012200021101031101ffc4001b00000301000301000000000000000000000005060401020307ffc400321000010303030205020309000000000000010203040005110612211331141551617122410781a1163542527391b2c1f1ffc4001501010100000000000000000000000000000001ffc4001a110101010003010000000000000000000000014111213161ffda000c03010002110311003f00a5bbde22da2329c7d692bc7d0d03f52cfb0ff75e7a7ef3e7709723a1d0dae146ddfbb3c039ce07ad2bd47a7e32dbb8dd1d52d6ef4b284f64a480067dfb51f87ffb95ff00eb9ff14d215de66af089ce44b7dbde9cb6890a2838eddf18078f7add62d411ef4db9b10a65d6b95a147381ea0d495b933275fe6bba75c114104a8ba410413e983dff004f5af5d34b4b4cde632d0bf1fd1592bdd91c6411f3934c2fa6af6b54975d106dcf4a65ae56e856001ebc03c7ce29dd9eef1ef10fc447dc9da76ad2aee93537a1ba7e4f70dd8eff0057c6dffb5e1a19854a83758e54528750946ec6704850cd037bceb08b6d7d2cc76d3317fc7b5cc04fb6707269c5c6e0c5b60ae549242123b0e493f602a075559e359970d98db89525456b51c951c8afa13ea8e98e3c596836783d5c63f5a61a99fdb7290875db4be88ab384bbbbbfc7183fdeaa633e8951db7da396dc48524fb1a8bd611a5aa2a2432f30ab420a7a6d3240c718cf031fa9ef4c9ad550205aa02951df4a1d6c8421b015b769db8c9229837ea2be8b1b0d39d0eba9c51484efdb8c0efd8d258daf3c449699f2edbd4584e7af9c64e3f96b9beb28d4ac40931e6478c8e76a24a825449501d867d2b1dcdebae99b9c752ae4ecd6dde4a179c1c1e460938f9149ef655e515c03919a289cb3dca278fb7bf177f4faa829dd8ce3f2ac9a7ecde490971fafd7dce15eed9b71c018c64fa514514b24e8e4f8c5c9b75c1e82579dc1233dfec08238f6add62d391acc1c5256a79e706d52d431c7a0145140b9fd149eb3a60dc5e88cbbc2da092411e9dc71f39a7766b447b344e847dcac9dcb5abba8d145061d43a6fcf1e65cf15d0e90231d3dd9cfe62995c6dcc5ca12a2c904a15f71dd27d451453e09d1a21450961cbb3ea8a956433b781f1ce33dfed54f0e2b50a2b71d84ed6db18028a28175f74fc6bda105c529a791c25c4f3c7a11f71586268f4a66b726e33de9ea6f1b52b181c760724e47b514520a5a28a283ffd9d81858ffa4686469676573744944096672616e646f6d58204599f81beaa2b20bd0ffcc9aa03a6f985befab3f6beaffa41e6354cdb2ab2ce471656c656d656e744964656e7469666965727264726976696e675f70726976696c656765736c656c656d656e7456616c756582a37576656869636c655f63617465676f72795f636f646561416a69737375655f64617465d903ec6a323031382d30382d30396b6578706972795f64617465d903ec6a323032342d31302d3230a37576656869636c655f63617465676f72795f636f646561426a69737375655f64617465d903ec6a323031372d30322d32336b6578706972795f64617465d903ec6a323032342d31302d32306a697373756572417574688443a10126a118215901f3308201ef30820195a00302010202143c4416eed784f3b413e48f56f075abfa6d87eb84300a06082a8648ce3d04030230233114301206035504030c0b75746f7069612069616361310b3009060355040613025553301e170d3230313030313030303030305a170d3231313030313030303030305a30213112301006035504030c0975746f706961206473310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d03010703420004ace7ab7340e5d9648c5a72a9a6f56745c7aad436a03a43efea77b5fa7b88f0197d57d8983e1b37d3a539f4d588365e38cbbf5b94d68c547b5bc8731dcd2f146ba381a83081a5301e0603551d120417301581136578616d706c65406578616d706c652e636f6d301c0603551d1f041530133011a00fa00d820b6578616d706c652e636f6d301d0603551d0e0416041414e29017a6c35621ffc7a686b7b72db06cd12351301f0603551d2304183016801454fa2383a04c28e0d930792261c80c4881d2c00b300e0603551d0f0101ff04040302078030150603551d250101ff040b3009060728818c5d050102300a06082a8648ce3d040302034800304502210097717ab9016740c8d7bcdaa494a62c053bbdecce1383c1aca72ad08dbc04cbb202203bad859c13a63c6d1ad67d814d43e2425caf90d422422c04a8ee0304c0d3a68d5903a2d81859039da66776657273696f6e63312e306f646967657374416c676f726974686d675348412d3235366c76616c756544696765737473a2716f72672e69736f2e31383031332e352e31ad00582075167333b47b6c2bfb86eccc1f438cf57af055371ac55e1e359e20f254adcebf01582067e539d6139ebd131aef441b445645dd831b2b375b390ca5ef6279b205ed45710258203394372ddb78053f36d5d869780e61eda313d44a392092ad8e0527a2fbfe55ae0358202e35ad3c4e514bb67b1a9db51ce74e4cb9b7146e41ac52dac9ce86b8613db555045820ea5c3304bb7c4a8dcb51c4c13b65264f845541341342093cca786e058fac2d59055820fae487f68b7a0e87a749774e56e9e1dc3a8ec7b77e490d21f0e1d3475661aa1d0658207d83e507ae77db815de4d803b88555d0511d894c897439f5774056416a1c7533075820f0549a145f1cf75cbeeffa881d4857dd438d627cf32174b1731c4c38e12ca936085820b68c8afcb2aaf7c581411d2877def155be2eb121a42bc9ba5b7312377e068f660958200b3587d1dd0c2a07a35bfb120d99a0abfb5df56865bb7fa15cc8b56a66df6e0c0a5820c98a170cf36e11abb724e98a75a5343dfa2b6ed3df2ecfbb8ef2ee55dd41c8810b5820b57dd036782f7b14c6a30faaaae6ccd5054ce88bdfa51a016ba75eda1edea9480c5820651f8736b18480fe252a03224ea087b5d10ca5485146c67c74ac4ec3112d4c3a746f72672e69736f2e31383031332e352e312e5553a4005820d80b83d25173c484c5640610ff1a31c949c1d934bf4cf7f18d5223b15dd4f21c0158204d80e1e2e4fb246d97895427ce7000bb59bb24c8cd003ecf94bf35bbd2917e340258208b331f3b685bca372e85351a25c9484ab7afcdf0d2233105511f778d98c2f544035820c343af1bd1690715439161aba73702c474abf992b20c9fb55c36a336ebe01a876d6465766963654b6579496e666fa1696465766963654b6579a40102200121582096313d6c63e24e3372742bfdb1a33ba2c897dcd68ab8c753e4fbd48dca6b7f9a2258201fb3269edd418857de1b39a4e4a44b92fa484caa722c228288f01d0c03a2c3d667646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c76616c6964697479496e666fa3667369676e6564c074323032302d31302d30315431333a33303a30325a6976616c696446726f6dc074323032302d31302d30315431333a33303a30325a6a76616c6964556e74696cc074323032312d31302d30315431333a33303a30325a584059e64205df1e2f708dd6db0847aed79fc7c0201d80fa55badcaf2e1bcf5902e1e5a62e4832044b890ad85aa53f129134775d733754d7cb7a413766aeff13cb2e6c6465766963655369676e6564a26a6e616d65537061636573d81841a06a64657669636541757468a1696465766963654d61638443a10105a0f65820e99521a85ad7891b806a07f8b5388a332d92c189a7bf293ee1f543405ae6824d6673746174757300');
        const mdocExampleDataElement = CborDecoder.decode(mdocExampleBytes);
        const mdocExampleMapElement = <CborMap>mdocExampleDataElement;
        const versionElement = <CborTextString>mdocExampleMapElement.get('version');
        const documentsElement = <CborArray>mdocExampleMapElement.get('documents');
        const statusElement = <CborNumber>mdocExampleMapElement.get('status');

        const mdocs: MobileDocument[] = [];

        for (const documentElement of documentsElement) {
            const mdocMapElement = <CborMap>documentElement;
            const issuerSigned = CborDataItem.to(IssuerSigned, <CborMap>mdocMapElement.get('issuerSigned'));
            const deviceSigned = CborDataItem.to(DeviceSigned, <CborMap>mdocMapElement.get('deviceSigned'));
            const mdoc2 = new MobileDocument(mdocMapElement.get('docType')?.getValue() as string, issuerSigned, deviceSigned);
            mdocs.push(mdoc2);
        }

        const deviceResponse = new DeviceResponse(mdocs, versionElement.getValue(), statusElement.getValue());
        const x5Chain = deviceResponse.documents[0].issuerSigned.issuerAuth.x5Chain;
        const certificateDER = Buffer.from(x5Chain ? x5Chain : new ArrayBuffer(0));
        const cert = new rs.X509();
        const pem = rs.KJUR.asn1.ASN1Util.getPEMStringFromHex(certificateDER.toString('hex'), 'CERTIFICATE');
        cert.readCertPEM(pem);
        const certKeyInfo = new SimpleCOSECryptoProviderKeyInfo(ISSUER_KEY_ID, 
            'ECDSA_256',
            cert.getPublicKey() as rs.KJUR.crypto.ECDSA, 
            null, 
            [cert]);
        const coseCryptoProvider = new SimpleCOSECryptoProvider([certKeyInfo]);

        const verificationParams = new MDocVerificationParams();
        verificationParams.verificationTypes = [VerificationType.ISSUER_SIGNATURE];
        verificationParams.issuerKeyID = ISSUER_KEY_ID;

        expect(await deviceResponse.documents[0].verify(verificationParams, coseCryptoProvider)).toBeTruthy();
    });

    test('Create, parse, verify mDL request', async () => {
        const readerKeyInfo = new SimpleCOSECryptoProviderKeyInfo(READER_KEY_ID, 
                                                                  'ECDSA_256',
                                                                  testCertificates.readerKeyPair.pubKeyObj, 
                                                                  testCertificates.readerKeyPair.prvKeyObj);
        const coseCryptoProvider = new SimpleCOSECryptoProvider([readerKeyInfo]);
        const sessionTranscript = new CborArray();
        const mdocRequest = await new MDocRequestBuilder(MDL.DocType).addItemRequest(MDL.Namespace, 'family_name', true)
                                                                                 .addItemRequest(MDL.Namespace, 'birth_date', false)
                                                                                 .sign(sessionTranscript, coseCryptoProvider, READER_KEY_ID);
        let deviceRequest = new DeviceRequest([mdocRequest])
        const encodedDeviceRequest = Cbor.encode(deviceRequest);
        deviceRequest = Cbor.decode(DeviceRequest, encodedDeviceRequest);
        const firstMdocRequest = deviceRequest.mobileDocumentRequests[0];
        const allowedToRetain = new Map<string, Set<string>>();
        allowedToRetain.set(MDL.Namespace, new Set<string>(['family_name']));
        const verified = await firstMdocRequest.verify(new MDocRequestVerificationParams(true, 
                                                                                         READER_KEY_ID, 
                                                                                         allowedToRetain, 
                                                                                         new ReaderAuthentication(sessionTranscript,
                                                                                                                  firstMdocRequest.itemsRequest)), 
                                                                                         coseCryptoProvider);
        expect(verified).toBeTruthy();
    });

    test('Verify reader authentication', async () => {
        // try deserializing example from ISO/IEC FDIS 18013-5: D.4.1.1 mdoc request
        const exampleDeviceRequest = 'a26776657273696f6e63312e306b646f63526571756573747381a26c6974656d7352657175657374d8185893a267646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6a6e616d65537061636573a1716f72672e69736f2e31383031332e352e31a66b66616d696c795f6e616d65f56f646f63756d656e745f6e756d626572f57264726976696e675f70726976696c65676573f56a69737375655f64617465f56b6578706972795f64617465f568706f727472616974f46a726561646572417574688443a10126a118215901b7308201b330820158a00302010202147552715f6add323d4934a1ba175dc945755d8b50300a06082a8648ce3d04030230163114301206035504030c0b72656164657220726f6f74301e170d3230313030313030303030305a170d3233313233313030303030305a3011310f300d06035504030c067265616465723059301306072a8648ce3d020106082a8648ce3d03010703420004f8912ee0f912b6be683ba2fa0121b2630e601b2b628dff3b44f6394eaa9abdbcc2149d29d6ff1a3e091135177e5c3d9c57f3bf839761eed02c64dd82ae1d3bbfa38188308185301c0603551d1f041530133011a00fa00d820b6578616d706c652e636f6d301d0603551d0e04160414f2dfc4acafc5f30b464fada20bfcd533af5e07f5301f0603551d23041830168014cfb7a881baea5f32b6fb91cc29590c50dfac416e300e0603551d0f0101ff04040302078030150603551d250101ff040b3009060728818c5d050106300a06082a8648ce3d0403020349003046022100fb9ea3b686fd7ea2f0234858ff8328b4efef6a1ef71ec4aae4e307206f9214930221009b94f0d739dfa84cca29efed529dd4838acfd8b6bee212dc6320c46feb839a35f658401f3400069063c189138bdcd2f631427c589424113fc9ec26cebcacacfcdb9695d28e99953becabc4e30ab4efacc839a81f9159933d192527ee91b449bb7f80bf';
        const deviceRequest = Cbor.decode(DeviceRequest, Hex.decode(exampleDeviceRequest));
        const readerAuthenticationBytes = Hex.decode("d8185902ee837452656164657241757468656e7469636174696f6e83d8185858a20063312e30018201d818584ba4010220012158205a88d182bce5f42efa59943f33359d2e8a968ff289d93e5fa444b624343167fe225820b16e8cf858ddc7690407ba61d4c338237a8cfcf3de6aa672fc60a557aa32fc67d818584ba40102200121582060e3392385041f51403051f2415531cb56dd3f999c71687013aac6768bc8187e225820e58deb8fdbe907f7dd5368245551a34796f7d2215c440c339bb0f7b67beccdfa8258c391020f487315d10209616301013001046d646f631a200c016170706c69636174696f6e2f766e642e626c7565746f6f74682e6c652e6f6f6230081b28128b37282801021c015c1e580469736f2e6f72673a31383031333a646576696365656e676167656d656e746d646f63a20063312e30018201d818584ba4010220012158205a88d182bce5f42efa59943f33359d2e8a968ff289d93e5fa444b624343167fe225820b16e8cf858ddc7690407ba61d4c338237a8cfcf3de6aa672fc60a557aa32fc6758cd91022548721591020263720102110204616301013000110206616301036e6663005102046163010157001a201e016170706c69636174696f6e2f766e642e626c7565746f6f74682e6c652e6f6f6230081b28078080bf2801021c021107c832fff6d26fa0beb34dfcd555d4823a1c11010369736f2e6f72673a31383031333a6e66636e6663015a172b016170706c69636174696f6e2f766e642e7766612e6e616e57030101032302001324fec9a70b97ac9684a4e326176ef5b981c5e8533e5f00298cfccbc35e700a6b020414d8185893a267646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6a6e616d65537061636573a1716f72672e69736f2e31383031332e352e31a66b66616d696c795f6e616d65f56f646f63756d656e745f6e756d626572f57264726976696e675f70726976696c65676573f56a69737375655f64617465f56b6578706972795f64617465f568706f727472616974f4");
        const test = new CborEncodedDataItem(readerAuthenticationBytes);
        const encodedCBORElement = CborDecoder.decode(test.getValue());
        const de = CborDecoder.decode(encodedCBORElement.getValue() as ArrayBuffer);
        const test1 = CborDecoder.decode(de[2].getValue() as ArrayBuffer);
        const readerAuthentication = new ReaderAuthentication(de[1], CborDataItem.to(ItemsRequest, test1 as CborMap));
        expect((<CborTextString>readerAuthentication.dataItems[0]).getValue()).toBe('ReaderAuthentication');
        const mdr = deviceRequest.mobileDocumentRequests[0].readerAuthentication;
        const certificateDER = mdr ? mdr.x5Chain : new ArrayBuffer(0);
        const cert = new rs.X509();
        const pem = rs.KJUR.asn1.ASN1Util.getPEMStringFromHex(Hex.encode(certificateDER ? certificateDER : new ArrayBuffer(0)), 'CERTIFICATE');
        cert.readCertPEM(pem);

 //       const cert = new rs.KJUR.asn1.x509.Certificate(Hex.encode(certificateDER ? certificateDER : new ArrayBuffer(0)));
        const certKeyInfo = new SimpleCOSECryptoProviderKeyInfo(READER_KEY_ID, 
                                                                'ECDSA_256',
                                                                cert.getPublicKey() as rs.KJUR.crypto.ECDSA, 
                                                                null, 
                                                                [cert]);
        const coseCryptoProvider = new SimpleCOSECryptoProvider([certKeyInfo]);
        const allowedToRetain = new Map<string, Set<string>>();
        allowedToRetain.set(MDL.Namespace, new Set<string>(['family_name', 'document_number', 'driving_privileges', 'issue_date', 'expiry_date']));
        let params = new MDocRequestVerificationParams(true, READER_KEY_ID, allowedToRetain, readerAuthentication);
        expect(await deviceRequest.mobileDocumentRequests[0].verify(params, coseCryptoProvider)).toBeTruthy();

        allowedToRetain.set(MDL.Namespace, new Set<string>(['family_name']));
        params = new MDocRequestVerificationParams(true, READER_KEY_ID, allowedToRetain, readerAuthentication);
        let bla = await deviceRequest.mobileDocumentRequests[0].verify(params, coseCryptoProvider);
        expect(await deviceRequest.mobileDocumentRequests[0].verify(params, coseCryptoProvider)).toBeFalsy();
    });

    test('Selective disclosure', async () => {
        const serializedDeviceResponse = 'a36776657273696f6e63312e3069646f63756d656e747381a367646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c6973737565725369676e6564a26a6e616d65537061636573a1716f72672e69736f2e31383031332e352e3186d8185863a4686469676573744944006672616e646f6d58208798645b20ea200e19ffabac92624bee6aec63aceedecfb1b80077d22bfc20e971656c656d656e744964656e7469666965726b66616d696c795f6e616d656c656c656d656e7456616c756563446f65d818586ca4686469676573744944036672616e646f6d5820b23f627e8999c706df0c0a4ed98ad74af988af619b4bb078b89058553f44615d71656c656d656e744964656e7469666965726a69737375655f646174656c656c656d656e7456616c7565d903ec6a323031392d31302d3230d818586da4686469676573744944046672616e646f6d5820c7ffa307e5de921e67ba5878094787e8807ac8e7b5b3932d2ce80f00f3e9abaf71656c656d656e744964656e7469666965726b6578706972795f646174656c656c656d656e7456616c7565d903ec6a323032342d31302d3230d818586da4686469676573744944076672616e646f6d582026052a42e5880557a806c1459af3fb7eb505d3781566329d0b604b845b5f9e6871656c656d656e744964656e7469666965726f646f63756d656e745f6e756d6265726c656c656d656e7456616c756569313233343536373839d818590471a4686469676573744944086672616e646f6d5820d094dad764a2eb9deb5210e9d899643efbd1d069cc311d3295516ca0b024412d71656c656d656e744964656e74696669657268706f7274726169746c656c656d656e7456616c7565590412ffd8ffe000104a46494600010101009000900000ffdb004300130d0e110e0c13110f11151413171d301f1d1a1a1d3a2a2c2330453d4947443d43414c566d5d4c51685241435f82606871757b7c7b4a5c869085778f6d787b76ffdb0043011415151d191d381f1f38764f434f7676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676ffc00011080018006403012200021101031101ffc4001b00000301000301000000000000000000000005060401020307ffc400321000010303030205020309000000000000010203040005110612211331141551617122410781a1163542527391b2c1f1ffc4001501010100000000000000000000000000000001ffc4001a110101010003010000000000000000000000014111213161ffda000c03010002110311003f00a5bbde22da2329c7d692bc7d0d03f52cfb0ff75e7a7ef3e7709723a1d0dae146ddfbb3c039ce07ad2bd47a7e32dbb8dd1d52d6ef4b284f64a480067dfb51f87ffb95ff00eb9ff14d215de66af089ce44b7dbde9cb6890a2838eddf18078f7add62d411ef4db9b10a65d6b95a147381ea0d495b933275fe6bba75c114104a8ba410413e983dff004f5af5d34b4b4cde632d0bf1fd1592bdd91c6411f3934c2fa6af6b54975d106dcf4a65ae56e856001ebc03c7ce29dd9eef1ef10fc447dc9da76ad2aee93537a1ba7e4f70dd8eff0057c6dffb5e1a19854a83758e54528750946ec6704850cd037bceb08b6d7d2cc76d3317fc7b5cc04fb6707269c5c6e0c5b60ae549242123b0e493f602a075559e359970d98db89525456b51c951c8afa13ea8e98e3c596836783d5c63f5a61a99fdb7290875db4be88ab384bbbbbfc7183fdeaa633e8951db7da396dc48524fb1a8bd611a5aa2a2432f30ab420a7a6d3240c718cf031fa9ef4c9ad550205aa02951df4a1d6c8421b015b769db8c9229837ea2be8b1b0d39d0eba9c51484efdb8c0efd8d258daf3c449699f2edbd4584e7af9c64e3f96b9beb28d4ac40931e6478c8e76a24a825449501d867d2b1dcdebae99b9c752ae4ecd6dde4a179c1c1e460938f9149ef655e515c03919a289cb3dca278fb7bf177f4faa829dd8ce3f2ac9a7ecde490971fafd7dce15eed9b71c018c64fa514514b24e8e4f8c5c9b75c1e82579dc1233dfec08238f6add62d391acc1c5256a79e706d52d431c7a0145140b9fd149eb3a60dc5e88cbbc2da092411e9dc71f39a7766b447b344e847dcac9dcb5abba8d145061d43a6fcf1e65cf15d0e90231d3dd9cfe62995c6dcc5ca12a2c904a15f71dd27d451453e09d1a21450961cbb3ea8a956433b781f1ce33dfed54f0e2b50a2b71d84ed6db18028a28175f74fc6bda105c529a791c25c4f3c7a11f71586268f4a66b726e33de9ea6f1b52b181c760724e47b514520a5a28a283ffd9d81858ffa4686469676573744944096672616e646f6d58204599f81beaa2b20bd0ffcc9aa03a6f985befab3f6beaffa41e6354cdb2ab2ce471656c656d656e744964656e7469666965727264726976696e675f70726976696c656765736c656c656d656e7456616c756582a37576656869636c655f63617465676f72795f636f646561416a69737375655f64617465d903ec6a323031382d30382d30396b6578706972795f64617465d903ec6a323032342d31302d3230a37576656869636c655f63617465676f72795f636f646561426a69737375655f64617465d903ec6a323031372d30322d32336b6578706972795f64617465d903ec6a323032342d31302d32306a697373756572417574688443a10126a118215901f3308201ef30820195a00302010202143c4416eed784f3b413e48f56f075abfa6d87eb84300a06082a8648ce3d04030230233114301206035504030c0b75746f7069612069616361310b3009060355040613025553301e170d3230313030313030303030305a170d3231313030313030303030305a30213112301006035504030c0975746f706961206473310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d03010703420004ace7ab7340e5d9648c5a72a9a6f56745c7aad436a03a43efea77b5fa7b88f0197d57d8983e1b37d3a539f4d588365e38cbbf5b94d68c547b5bc8731dcd2f146ba381a83081a5301e0603551d120417301581136578616d706c65406578616d706c652e636f6d301c0603551d1f041530133011a00fa00d820b6578616d706c652e636f6d301d0603551d0e0416041414e29017a6c35621ffc7a686b7b72db06cd12351301f0603551d2304183016801454fa2383a04c28e0d930792261c80c4881d2c00b300e0603551d0f0101ff04040302078030150603551d250101ff040b3009060728818c5d050102300a06082a8648ce3d040302034800304502210097717ab9016740c8d7bcdaa494a62c053bbdecce1383c1aca72ad08dbc04cbb202203bad859c13a63c6d1ad67d814d43e2425caf90d422422c04a8ee0304c0d3a68d5903a2d81859039da66776657273696f6e63312e306f646967657374416c676f726974686d675348412d3235366c76616c756544696765737473a2716f72672e69736f2e31383031332e352e31ad00582075167333b47b6c2bfb86eccc1f438cf57af055371ac55e1e359e20f254adcebf01582067e539d6139ebd131aef441b445645dd831b2b375b390ca5ef6279b205ed45710258203394372ddb78053f36d5d869780e61eda313d44a392092ad8e0527a2fbfe55ae0358202e35ad3c4e514bb67b1a9db51ce74e4cb9b7146e41ac52dac9ce86b8613db555045820ea5c3304bb7c4a8dcb51c4c13b65264f845541341342093cca786e058fac2d59055820fae487f68b7a0e87a749774e56e9e1dc3a8ec7b77e490d21f0e1d3475661aa1d0658207d83e507ae77db815de4d803b88555d0511d894c897439f5774056416a1c7533075820f0549a145f1cf75cbeeffa881d4857dd438d627cf32174b1731c4c38e12ca936085820b68c8afcb2aaf7c581411d2877def155be2eb121a42bc9ba5b7312377e068f660958200b3587d1dd0c2a07a35bfb120d99a0abfb5df56865bb7fa15cc8b56a66df6e0c0a5820c98a170cf36e11abb724e98a75a5343dfa2b6ed3df2ecfbb8ef2ee55dd41c8810b5820b57dd036782f7b14c6a30faaaae6ccd5054ce88bdfa51a016ba75eda1edea9480c5820651f8736b18480fe252a03224ea087b5d10ca5485146c67c74ac4ec3112d4c3a746f72672e69736f2e31383031332e352e312e5553a4005820d80b83d25173c484c5640610ff1a31c949c1d934bf4cf7f18d5223b15dd4f21c0158204d80e1e2e4fb246d97895427ce7000bb59bb24c8cd003ecf94bf35bbd2917e340258208b331f3b685bca372e85351a25c9484ab7afcdf0d2233105511f778d98c2f544035820c343af1bd1690715439161aba73702c474abf992b20c9fb55c36a336ebe01a876d6465766963654b6579496e666fa1696465766963654b6579a40102200121582096313d6c63e24e3372742bfdb1a33ba2c897dcd68ab8c753e4fbd48dca6b7f9a2258201fb3269edd418857de1b39a4e4a44b92fa484caa722c228288f01d0c03a2c3d667646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c76616c6964697479496e666fa3667369676e6564c074323032302d31302d30315431333a33303a30325a6976616c696446726f6dc074323032302d31302d30315431333a33303a30325a6a76616c6964556e74696cc074323032312d31302d30315431333a33303a30325a584059e64205df1e2f708dd6db0847aed79fc7c0201d80fa55badcaf2e1bcf5902e1e5a62e4832044b890ad85aa53f129134775d733754d7cb7a413766aeff13cb2e6c6465766963655369676e6564a26a6e616d65537061636573d81841a06a64657669636541757468a1696465766963654d61638443a10105a0f65820e99521a85ad7891b806a07f8b5388a332d92c189a7bf293ee1f543405ae6824d6673746174757300';
        
        const deviceResponse = Cbor.decode(DeviceResponse, Hex.decode(serializedDeviceResponse));
       
        const mdoc = deviceResponse.documents[0];
        const deviceAuthenticationBytes = Hex.decode('d818590271847444657669636541757468656e7469636174696f6e83d8185858a20063312e30018201d818584ba4010220012158205a88d182bce5f42efa59943f33359d2e8a968ff289d93e5fa444b624343167fe225820b16e8cf858ddc7690407ba61d4c338237a8cfcf3de6aa672fc60a557aa32fc67d818584ba40102200121582060e3392385041f51403051f2415531cb56dd3f999c71687013aac6768bc8187e225820e58deb8fdbe907f7dd5368245551a34796f7d2215c440c339bb0f7b67beccdfa8258c391020f487315d10209616301013001046d646f631a200c016170706c69636174696f6e2f766e642e626c7565746f6f74682e6c652e6f6f6230081b28128b37282801021c015c1e580469736f2e6f72673a31383031333a646576696365656e676167656d656e746d646f63a20063312e30018201d818584ba4010220012158205a88d182bce5f42efa59943f33359d2e8a968ff289d93e5fa444b624343167fe225820b16e8cf858ddc7690407ba61d4c338237a8cfcf3de6aa672fc60a557aa32fc6758cd91022548721591020263720102110204616301013000110206616301036e6663005102046163010157001a201e016170706c69636174696f6e2f766e642e626c7565746f6f74682e6c652e6f6f6230081b28078080bf2801021c021107c832fff6d26fa0beb34dfcd555d4823a1c11010369736f2e6f72673a31383031333a6e66636e6663015a172b016170706c69636174696f6e2f766e642e7766612e6e616e57030101032302001324fec9a70b97ac9684a4e326176ef5b981c5e8533e5f00298cfccbc35e700a6b020414756f72672e69736f2e31383031332e352e312e6d444cd81841a0');
        const listElement = <CborArray>CborDecoder.decode(CborDecoder.decode(new CborEncodedDataItem(deviceAuthenticationBytes).getValue()).getValue() as ArrayBuffer);
        const deviceAuthentication = CborDataItem.to(DeviceAuthentication, listElement);
        const ephemeralMacKey = Hex.decode('dc2b9566fdaaae3c06baa40993cd0451aeba15e7677ef5305f6531f3533c35dd');
        const mdocRequest = new MDocRequestBuilder(mdoc.docType).addItemRequest(MDL.Namespace, 'family_name', true)
                                                                      .addItemRequest(MDL.Namespace, 'document_number', true)
                                                                      .build();
        const presentedMdoc = await mdoc.presentWithDeviceMAC(mdocRequest, deviceAuthentication, ephemeralMacKey);
        const nameSpaces = presentedMdoc.issuerNamespaces;
        expect(Array.from(nameSpaces)).toEqual([MDL.Namespace]);
        const issuerSignedItems = presentedMdoc.getIssuerSignedItems(MDL.Namespace);
        expect(issuerSignedItems.map((item) => item.elementIdentifier)).toEqual(['family_name', 'document_number']);
        const x5Chain = mdoc.issuerSigned.issuerAuth.x5Chain;
        const certificateDER = x5Chain ? x5Chain : new ArrayBuffer(0);
        const cert = new rs.X509();
        const pem = rs.KJUR.asn1.ASN1Util.getPEMStringFromHex(Hex.encode(certificateDER), 'CERTIFICATE');
        cert.readCertPEM(pem);
        var pubKey = rs.KEYUTIL.getKey(pem);
       // const cert = new rs.KJUR.asn1.x509.Certificate(certificateDER.toString('hex'));
        const certKeyInfo = new SimpleCOSECryptoProviderKeyInfo(ISSUER_KEY_ID, 
                                                                'ECDSA_256',
                                                                pubKey as rs.KJUR.crypto.ECDSA, 
                                                                null, 
                                                                [cert]);
        const coseCryptoProvider = new SimpleCOSECryptoProvider([certKeyInfo]);
        const verificationTypes: VerificationType[] = [VerificationType.DOC_TYPE, 
                                                     VerificationType.ISSUER_SIGNATURE, 
                                                     VerificationType.DEVICE_SIGNATURE, 
                                                     VerificationType.ITEMS_TAMPER_CHECK];
        const params = new MDocVerificationParams();
        params.verificationTypes = verificationTypes;
        params.ephemeralMacKey = ephemeralMacKey;
        params.deviceAuthentication = deviceAuthentication;
        params.mDocRequest = mdocRequest;
        params.issuerKeyID = ISSUER_KEY_ID;
        const mdocVerified = await presentedMdoc.verify(params, coseCryptoProvider);
        
        expect(mdocVerified).toBeTruthy();
    });

    test('Signing mobile EID document', async () => {
        // ISO-IEC_23220-2
        // Cards and security devices for personal identification
        // Building blocks for identity management via mobile devices
        // Part 2: Data objects and encoding rules for generic eID-System
        const issuerKeyInfo = new SimpleCOSECryptoProviderKeyInfo(ISSUER_KEY_ID, 
            'ECDSA_256',
            testCertificates.issuerKeyPair.pubKeyObj, 
            testCertificates.issuerKeyPair.prvKeyObj, 
            [testCertificates.issuerCertificate],
            [testCertificates.caCertificate]);

        const deviceKeyInfo = new SimpleCOSECryptoProviderKeyInfo(DEVICE_KEY_ID, 
            'ECDSA_256',
            testCertificates.deviceKeyPair.pubKeyObj, 
            testCertificates.deviceKeyPair.prvKeyObj);

        const coseCryptoProvider = new SimpleCOSECryptoProvider([issuerKeyInfo, deviceKeyInfo]);

        const coseKey = await CoseKey.new(deviceKeyInfo.publicKey);

        const deviceKeyInfo2 = new DeviceKeyInfo(coseKey);

        const validityInfo = new ValidityInfo(new Date(), new Date(), new Date());

        const mdoc = await new MobileDocumentBuilder("org.iso.23220.mID.1").addItemToSign("org.iso.23220.1", "family_name", new CborTextString("Doe"))
                                                       .addItemToSign("org.iso.23220.1", "given_name", new CborTextString("John"))
                                                       .addItemToSign("org.iso.23220.1", "birth_date", new CborFullDate(new Date(1990, 0, 15, 0, 0, 0, 0)))
                                                       .sign(validityInfo, 
                                                             deviceKeyInfo2, 
                                                             coseCryptoProvider, 
                                                             ISSUER_KEY_ID);

        expect(mdoc.mso).not.toBeNull();
        expect(mdoc.mso.digestAlgorithm).toBe(DigestAlgorithm.SHA256);
        const signedItems = mdoc.getIssuerSignedItems("org.iso.23220.1");
        expect(signedItems.length).toBe(3);
        expect(signedItems[0].digestID).toBe(0);
        expect(mdoc.mso.valueDigests.get("org.iso.23220.1")).not.toBeNull();
        //mdoc.verify
    });
/*
    test('Present with device signature', async () => {
        const ephemeralReaderKeyPair = TestCertificatesBuilder.generateKey();
        const jsonWebPublicKey2 = await crypto.subtle.exportKey('jwk', (await ephemeralReaderKeyPair).publicKey);
        const jsonWebPrivateKey2 = await crypto.subtle.exportKey('jwk', (await ephemeralReaderKeyPair).privateKey);

        const x2 = new Int8Array(Buffer.from(jsonWebPublicKey2.x, 'base64')).buffer; // EC2_X -2
        const y2 = new Int8Array(Buffer.from(jsonWebPublicKey2.y, 'base64')).buffer; // EC2_Y -3
        const d2 = new Int8Array(Buffer.from(jsonWebPrivateKey2.d, 'base64')).buffer; // EC2_D -4
        let map2 = new Map<MapKey, DataElement>();
        map2.set(new MapKey(KeyKeys.KeyType), new NumberElement(2));
        map2.set(new MapKey(KeyKeys.EC2Curve), new NumberElement(1));
        map2.set(new MapKey(KeyKeys.EC2X), new ByteStringElement(x2));
        map2.set(new MapKey(KeyKeys.EC2Y), new ByteStringElement(y2));
        map2.set(new MapKey(KeyKeys.EC2D), new ByteStringElement(d2));

        let map3 = new Map<MapKey, DataElement>();

        const deviceAuthentication = new DeviceAuthentication(new ListElement([new NullElement(), 
                                                                               new EncodedCBORElement(Buffer.from(DataElementSerializer.toCBOR(new MapElement(map2)))), 
                                                                               new NullElement()]), 
                                                                               MDL.DocType, 
                                                              new EncodedCBORElement(Buffer.from(DataElementSerializer.toCBOR(new MapElement(map3)))));
        
        const mdocRequest = new MDocRequestBuilder(MDL.DocType).addDataElementRequest(MDL.NameSpace, "family_name", true).build();

        //const presentedDoc = await mdoc.presentWithDeviceSignature(mdocRequest, deviceAuthentication, coseCryptoProvider, DEVICE_KEY_ID);

       // const verif = presentedDoc.verify(params, coseCryptoProvider);
    });
*/


    test('Device Request builder and serialization', () => {

        const mdocRequest = new MDocRequestBuilder(MDL.DocType).addItemRequest(MDL.Namespace, "family_name", true)
                                                               .addItemRequest(MDL.Namespace, "birth_date", false)
                                                               .build();
        
        const deviceRequest = new DeviceRequest([mdocRequest]);

        const deviceRequestCborHex = Hex.encode(Cbor.encode(deviceRequest));

        const parsedDeviceRequest = Cbor.decode(DeviceRequest, Hex.decode(deviceRequestCborHex));

        expect(parsedDeviceRequest.version).toBe(deviceRequest.version);
        expect(parsedDeviceRequest.mobileDocumentRequests.length).toBe(1);
        const parsedMDocRequest = parsedDeviceRequest.mobileDocumentRequests[0];
        expect(parsedMDocRequest.docType).toBe(mdocRequest.docType);
        // TODO: Manque du code de test ici.
        // const itemsRequest = parsedMDocRequest.decodedItemsRequest;
        expect(parsedMDocRequest.itemsRequest.docType).toBe(mdocRequest.itemsRequest.docType);
        // expect(parsedMDocRequest.decodedItemsRequest.nameSpaces.value).toBe(mdocRequest.decodedItemsRequest.nameSpaces.value);
    });

    test('Array of any', () => {
        
        const cborArray = new CborArray(new CborNumber(1), 
                                        new CborMap(new Map<string | number, CborDataItem>([['a', new CborNumber(1)]])),
                                        new CborNil(),
                                        new CborByteString(Int8Array.from([1,-2]).buffer));
        const encodedCborArray = CborEncoder.encode(cborArray);
        const decodedCborArray = CborDecoder.decode(encodedCborArray) as CborArray;
        expect(decodedCborArray.length).toBe(4);
        expect(decodedCborArray[0] instanceof CborNumber).toBeTruthy();
        expect(decodedCborArray[0].getValue()).toBe(1);
        expect(decodedCborArray[1] instanceof CborMap).toBeTruthy();
        expect(decodedCborArray[2] instanceof CborNil).toBeTruthy();
        expect(decodedCborArray[3] instanceof CborByteString).toBeTruthy();
    });

    test('Device request deserialization', () => {
        // try deserializing example from ISO/IEC FDIS 18013-5: D.4.1.1 mdoc request
        const deviceRequestCborHex = "a26776657273696f6e63312e306b646f63526571756573747381a26c6974656d7352657175657374d8185893a267646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6a6e616d65537061636573a1716f72672e69736f2e31383031332e352e31a66b66616d696c795f6e616d65f56f646f63756d656e745f6e756d626572f57264726976696e675f70726976696c65676573f56a69737375655f64617465f56b6578706972795f64617465f568706f727472616974f46a726561646572417574688443a10126a118215901b7308201b330820158a00302010202147552715f6add323d4934a1ba175dc945755d8b50300a06082a8648ce3d04030230163114301206035504030c0b72656164657220726f6f74301e170d3230313030313030303030305a170d3233313233313030303030305a3011310f300d06035504030c067265616465723059301306072a8648ce3d020106082a8648ce3d03010703420004f8912ee0f912b6be683ba2fa0121b2630e601b2b628dff3b44f6394eaa9abdbcc2149d29d6ff1a3e091135177e5c3d9c57f3bf839761eed02c64dd82ae1d3bbfa38188308185301c0603551d1f041530133011a00fa00d820b6578616d706c652e636f6d301d0603551d0e04160414f2dfc4acafc5f30b464fada20bfcd533af5e07f5301f0603551d23041830168014cfb7a881baea5f32b6fb91cc29590c50dfac416e300e0603551d0f0101ff04040302078030150603551d250101ff040b3009060728818c5d050106300a06082a8648ce3d0403020349003046022100fb9ea3b686fd7ea2f0234858ff8328b4efef6a1ef71ec4aae4e307206f9214930221009b94f0d739dfa84cca29efed529dd4838acfd8b6bee212dc6320c46feb839a35f658401f3400069063c189138bdcd2f631427c589424113fc9ec26cebcacacfcdb9695d28e99953becabc4e30ab4efacc839a81f9159933d192527ee91b449bb7f80bf"
        const deviceRequest = Cbor.decode(DeviceRequest, Hex.decode(deviceRequestCborHex));
        expect(deviceRequest.version).toBe('1.0');
        expect(deviceRequest.mobileDocumentRequests.length).toBe(1);
        expect(deviceRequest.mobileDocumentRequests[0].docType).toBe(MDL.DocType);

//        devRequest.docRequests[0].nameSpaces shouldContain "org.iso.18013.5.1"
//        devRequest.docRequests[0].getRequestedItemsFor("org.iso.18013.5.1") shouldBe mapOf(
//            "family_name" to true,
//            "document_number" to true,
//            "driving_privileges" to true,
//            "issue_date" to true,
//            "expiry_date" to true,
//            "portrait" to false
//        )
    });

    test('Verify device mac', async () => {
        const serializedDeviceResponse = "a36776657273696f6e63312e3069646f63756d656e747381a367646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c6973737565725369676e6564a26a6e616d65537061636573a1716f72672e69736f2e31383031332e352e3186d8185863a4686469676573744944006672616e646f6d58208798645b20ea200e19ffabac92624bee6aec63aceedecfb1b80077d22bfc20e971656c656d656e744964656e7469666965726b66616d696c795f6e616d656c656c656d656e7456616c756563446f65d818586ca4686469676573744944036672616e646f6d5820b23f627e8999c706df0c0a4ed98ad74af988af619b4bb078b89058553f44615d71656c656d656e744964656e7469666965726a69737375655f646174656c656c656d656e7456616c7565d903ec6a323031392d31302d3230d818586da4686469676573744944046672616e646f6d5820c7ffa307e5de921e67ba5878094787e8807ac8e7b5b3932d2ce80f00f3e9abaf71656c656d656e744964656e7469666965726b6578706972795f646174656c656c656d656e7456616c7565d903ec6a323032342d31302d3230d818586da4686469676573744944076672616e646f6d582026052a42e5880557a806c1459af3fb7eb505d3781566329d0b604b845b5f9e6871656c656d656e744964656e7469666965726f646f63756d656e745f6e756d6265726c656c656d656e7456616c756569313233343536373839d818590471a4686469676573744944086672616e646f6d5820d094dad764a2eb9deb5210e9d899643efbd1d069cc311d3295516ca0b024412d71656c656d656e744964656e74696669657268706f7274726169746c656c656d656e7456616c7565590412ffd8ffe000104a46494600010101009000900000ffdb004300130d0e110e0c13110f11151413171d301f1d1a1a1d3a2a2c2330453d4947443d43414c566d5d4c51685241435f82606871757b7c7b4a5c869085778f6d787b76ffdb0043011415151d191d381f1f38764f434f7676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676ffc00011080018006403012200021101031101ffc4001b00000301000301000000000000000000000005060401020307ffc400321000010303030205020309000000000000010203040005110612211331141551617122410781a1163542527391b2c1f1ffc4001501010100000000000000000000000000000001ffc4001a110101010003010000000000000000000000014111213161ffda000c03010002110311003f00a5bbde22da2329c7d692bc7d0d03f52cfb0ff75e7a7ef3e7709723a1d0dae146ddfbb3c039ce07ad2bd47a7e32dbb8dd1d52d6ef4b284f64a480067dfb51f87ffb95ff00eb9ff14d215de66af089ce44b7dbde9cb6890a2838eddf18078f7add62d411ef4db9b10a65d6b95a147381ea0d495b933275fe6bba75c114104a8ba410413e983dff004f5af5d34b4b4cde632d0bf1fd1592bdd91c6411f3934c2fa6af6b54975d106dcf4a65ae56e856001ebc03c7ce29dd9eef1ef10fc447dc9da76ad2aee93537a1ba7e4f70dd8eff0057c6dffb5e1a19854a83758e54528750946ec6704850cd037bceb08b6d7d2cc76d3317fc7b5cc04fb6707269c5c6e0c5b60ae549242123b0e493f602a075559e359970d98db89525456b51c951c8afa13ea8e98e3c596836783d5c63f5a61a99fdb7290875db4be88ab384bbbbbfc7183fdeaa633e8951db7da396dc48524fb1a8bd611a5aa2a2432f30ab420a7a6d3240c718cf031fa9ef4c9ad550205aa02951df4a1d6c8421b015b769db8c9229837ea2be8b1b0d39d0eba9c51484efdb8c0efd8d258daf3c449699f2edbd4584e7af9c64e3f96b9beb28d4ac40931e6478c8e76a24a825449501d867d2b1dcdebae99b9c752ae4ecd6dde4a179c1c1e460938f9149ef655e515c03919a289cb3dca278fb7bf177f4faa829dd8ce3f2ac9a7ecde490971fafd7dce15eed9b71c018c64fa514514b24e8e4f8c5c9b75c1e82579dc1233dfec08238f6add62d391acc1c5256a79e706d52d431c7a0145140b9fd149eb3a60dc5e88cbbc2da092411e9dc71f39a7766b447b344e847dcac9dcb5abba8d145061d43a6fcf1e65cf15d0e90231d3dd9cfe62995c6dcc5ca12a2c904a15f71dd27d451453e09d1a21450961cbb3ea8a956433b781f1ce33dfed54f0e2b50a2b71d84ed6db18028a28175f74fc6bda105c529a791c25c4f3c7a11f71586268f4a66b726e33de9ea6f1b52b181c760724e47b514520a5a28a283ffd9d81858ffa4686469676573744944096672616e646f6d58204599f81beaa2b20bd0ffcc9aa03a6f985befab3f6beaffa41e6354cdb2ab2ce471656c656d656e744964656e7469666965727264726976696e675f70726976696c656765736c656c656d656e7456616c756582a37576656869636c655f63617465676f72795f636f646561416a69737375655f64617465d903ec6a323031382d30382d30396b6578706972795f64617465d903ec6a323032342d31302d3230a37576656869636c655f63617465676f72795f636f646561426a69737375655f64617465d903ec6a323031372d30322d32336b6578706972795f64617465d903ec6a323032342d31302d32306a697373756572417574688443a10126a118215901f3308201ef30820195a00302010202143c4416eed784f3b413e48f56f075abfa6d87eb84300a06082a8648ce3d04030230233114301206035504030c0b75746f7069612069616361310b3009060355040613025553301e170d3230313030313030303030305a170d3231313030313030303030305a30213112301006035504030c0975746f706961206473310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d03010703420004ace7ab7340e5d9648c5a72a9a6f56745c7aad436a03a43efea77b5fa7b88f0197d57d8983e1b37d3a539f4d588365e38cbbf5b94d68c547b5bc8731dcd2f146ba381a83081a5301e0603551d120417301581136578616d706c65406578616d706c652e636f6d301c0603551d1f041530133011a00fa00d820b6578616d706c652e636f6d301d0603551d0e0416041414e29017a6c35621ffc7a686b7b72db06cd12351301f0603551d2304183016801454fa2383a04c28e0d930792261c80c4881d2c00b300e0603551d0f0101ff04040302078030150603551d250101ff040b3009060728818c5d050102300a06082a8648ce3d040302034800304502210097717ab9016740c8d7bcdaa494a62c053bbdecce1383c1aca72ad08dbc04cbb202203bad859c13a63c6d1ad67d814d43e2425caf90d422422c04a8ee0304c0d3a68d5903a2d81859039da66776657273696f6e63312e306f646967657374416c676f726974686d675348412d3235366c76616c756544696765737473a2716f72672e69736f2e31383031332e352e31ad00582075167333b47b6c2bfb86eccc1f438cf57af055371ac55e1e359e20f254adcebf01582067e539d6139ebd131aef441b445645dd831b2b375b390ca5ef6279b205ed45710258203394372ddb78053f36d5d869780e61eda313d44a392092ad8e0527a2fbfe55ae0358202e35ad3c4e514bb67b1a9db51ce74e4cb9b7146e41ac52dac9ce86b8613db555045820ea5c3304bb7c4a8dcb51c4c13b65264f845541341342093cca786e058fac2d59055820fae487f68b7a0e87a749774e56e9e1dc3a8ec7b77e490d21f0e1d3475661aa1d0658207d83e507ae77db815de4d803b88555d0511d894c897439f5774056416a1c7533075820f0549a145f1cf75cbeeffa881d4857dd438d627cf32174b1731c4c38e12ca936085820b68c8afcb2aaf7c581411d2877def155be2eb121a42bc9ba5b7312377e068f660958200b3587d1dd0c2a07a35bfb120d99a0abfb5df56865bb7fa15cc8b56a66df6e0c0a5820c98a170cf36e11abb724e98a75a5343dfa2b6ed3df2ecfbb8ef2ee55dd41c8810b5820b57dd036782f7b14c6a30faaaae6ccd5054ce88bdfa51a016ba75eda1edea9480c5820651f8736b18480fe252a03224ea087b5d10ca5485146c67c74ac4ec3112d4c3a746f72672e69736f2e31383031332e352e312e5553a4005820d80b83d25173c484c5640610ff1a31c949c1d934bf4cf7f18d5223b15dd4f21c0158204d80e1e2e4fb246d97895427ce7000bb59bb24c8cd003ecf94bf35bbd2917e340258208b331f3b685bca372e85351a25c9484ab7afcdf0d2233105511f778d98c2f544035820c343af1bd1690715439161aba73702c474abf992b20c9fb55c36a336ebe01a876d6465766963654b6579496e666fa1696465766963654b6579a40102200121582096313d6c63e24e3372742bfdb1a33ba2c897dcd68ab8c753e4fbd48dca6b7f9a2258201fb3269edd418857de1b39a4e4a44b92fa484caa722c228288f01d0c03a2c3d667646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c76616c6964697479496e666fa3667369676e6564c074323032302d31302d30315431333a33303a30325a6976616c696446726f6dc074323032302d31302d30315431333a33303a30325a6a76616c6964556e74696cc074323032312d31302d30315431333a33303a30325a584059e64205df1e2f708dd6db0847aed79fc7c0201d80fa55badcaf2e1bcf5902e1e5a62e4832044b890ad85aa53f129134775d733754d7cb7a413766aeff13cb2e6c6465766963655369676e6564a26a6e616d65537061636573d81841a06a64657669636541757468a1696465766963654d61638443a10105a0f65820e99521a85ad7891b806a07f8b5388a332d92c189a7bf293ee1f543405ae6824d6673746174757300";

        const deviceResponse = Cbor.decode(DeviceResponse, Hex.decode(serializedDeviceResponse));
        
        const deviceMac = deviceResponse.documents[0].deviceSigned.deviceAuth.deviceMac;
        expect(deviceMac).not.toBeNull();
        expect(deviceMac.algorithm).toBe(CoseAlgorithm.HMAC256);
        expect(deviceMac.payload).toBeNull();
        expect(Buffer.from(deviceMac.signatureOrTag).equals(Buffer.from("E99521A85AD7891B806A07F8B5388A332D92C189A7BF293EE1F543405AE6824D", 'hex'))).toBe(true);

        // using key and device authentication from ISO/IEC FDIS 18013-5: D.5.3 mdoc authentication
        const deviceAuthenticationBytes = Buffer.from("d818590271847444657669636541757468656e7469636174696f6e83d8185858a20063312e30018201d818584ba4010220012158205a88d182bce5f42efa59943f33359d2e8a968ff289d93e5fa444b624343167fe225820b16e8cf858ddc7690407ba61d4c338237a8cfcf3de6aa672fc60a557aa32fc67d818584ba40102200121582060e3392385041f51403051f2415531cb56dd3f999c71687013aac6768bc8187e225820e58deb8fdbe907f7dd5368245551a34796f7d2215c440c339bb0f7b67beccdfa8258c391020f487315d10209616301013001046d646f631a200c016170706c69636174696f6e2f766e642e626c7565746f6f74682e6c652e6f6f6230081b28128b37282801021c015c1e580469736f2e6f72673a31383031333a646576696365656e676167656d656e746d646f63a20063312e30018201d818584ba4010220012158205a88d182bce5f42efa59943f33359d2e8a968ff289d93e5fa444b624343167fe225820b16e8cf858ddc7690407ba61d4c338237a8cfcf3de6aa672fc60a557aa32fc6758cd91022548721591020263720102110204616301013000110206616301036e6663005102046163010157001a201e016170706c69636174696f6e2f766e642e626c7565746f6f74682e6c652e6f6f6230081b28078080bf2801021c021107c832fff6d26fa0beb34dfcd555d4823a1c11010369736f2e6f72673a31383031333a6e66636e6663015a172b016170706c69636174696f6e2f766e642e7766612e6e616e57030101032302001324fec9a70b97ac9684a4e326176ef5b981c5e8533e5f00298cfccbc35e700a6b020414756f72672e69736f2e31383031332e352e312e6d444cd81841a0", 'hex');
        const deviceAuthenticationEncodedDataElement = CborDecoder.decode(deviceAuthenticationBytes);
        const deviceAuthenticationDataElement = CborDecoder.decode((<CborEncodedDataItem>deviceAuthenticationEncodedDataElement).getValue());
        const deviceAuthentication = CborDataItem.to(DeviceAuthentication, <CborArray>deviceAuthenticationDataElement);
        expect(deviceAuthentication.dataItems[0].getValue().toString()).toBe("DeviceAuthentication");
        const ephemeralMacKey = Buffer.from("dc2b9566fdaaae3c06baa40993cd0451aeba15e7677ef5305f6531f3533c35dd", 'hex');
        expect(await deviceMac.attachPayload(deviceAuthenticationBytes).verify(ephemeralMacKey)).toBe(true);

        const mdoc = deviceResponse.documents[0];
        const deviceSignedByUs = (await mdoc.presentWithDeviceMAC(new MDocRequestBuilder(mdoc.docType).build(), deviceAuthentication, ephemeralMacKey)).deviceSigned;
        expect(deviceSignedByUs).not.toBeNull();
        expect(deviceSignedByUs.deviceAuth.deviceMac).not.toBeNull();
        expect(Buffer.from(deviceSignedByUs.deviceAuth.deviceMac.tag).equals(Buffer.from(deviceMac.tag))).toBe(true);

    });
});