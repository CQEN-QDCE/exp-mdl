import { DrivingLicense } from "../../../../src/server-retrieval/credential-type/known-types/driving-license";
import { OidcClient } from "../../../../src/server-retrieval/oidc/oidc-client";
import { OidcServerRetrievalProcess } from "../../../../src/server-retrieval/oidc/oidc-server-retrieval-process";
import { MockTransportLayer } from "../../../../src/server-retrieval/transport/mock-transport-layer";
import { TestKeysAndCertificates } from "../../../../src/server-retrieval/transport/test-keys-and-certificates";

describe('testing TestOidcServerRetrievalProcess', () => {

    const drivingLicenseInfo = new DrivingLicense().getCredentialType().mdocCredentialType;

    test('Client', async () => {
        // note: here the client communicates directly with the server implementation, without the http layer.
        const baseUrl = "https://utopiadot.gov";
        let transportLayer = new MockTransportLayer();
        await transportLayer.init();
        let testKeysAndCertificates = new TestKeysAndCertificates();
        await testKeysAndCertificates.init();

        let map1 = new Map<string, Map<string, boolean>>();
        for (const [namespace, dataElements] of drivingLicenseInfo.namespaces) {
            let map2 = new Map<string, boolean>();
            for (const [identifier, dataElement] of dataElements.dataElements) {
                map2.set(identifier, false);
            }
            map1.set(namespace, map2);
        }

        const response = await new OidcServerRetrievalProcess(new OidcClient(baseUrl, 
                                                        transportLayer), 
                                                        testKeysAndCertificates.clientPrivateKey).process("Test server retrieval token", 
                                                                                                          drivingLicenseInfo.docType, 
                                                                                                          map1);
        let bla = 1;
    });
});