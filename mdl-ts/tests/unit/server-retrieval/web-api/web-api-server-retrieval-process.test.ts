import { DrivingLicense } from "../../../../src/server-retrieval/credential-type/known-types/driving-license";
import { MockTransportLayer } from "../../../../src/server-retrieval/transport/mock-transport-layer";
import { WebApiClient } from "../../../../src/server-retrieval/web-api/web-api-client";
import { WebApiServerRetrievalProcess } from "../../../../src/server-retrieval/web-api/web-api-server-retrieval-process";

describe('testing WebApiServerRetrievalProcess', () => {

    const drivingLicenseInfo = new DrivingLicense().getCredentialType().mdocCredentialType;

    test('Client', async () => {
        // note: here the client communicates directly with the server implementation, without the http layer.
        let map1 = new Map<string, Map<string, boolean>>();
        for (const [namespace, dataElements] of drivingLicenseInfo.namespaces) {
            let map2 = new Map<string, boolean>();
            for (const [identifier, dataElement] of dataElements.dataElements) {
                map2.set(identifier, false);
            }
            map1.set(namespace, map2);
        }
        let transportLayer = new MockTransportLayer();
        await transportLayer.init();
        const response = await new WebApiServerRetrievalProcess(new WebApiClient("https://utopiadot.gov", transportLayer)).process(
                "Test server retrieval token",
                drivingLicenseInfo.docType,
                map1
        );

        let bla = 1;
    });
});