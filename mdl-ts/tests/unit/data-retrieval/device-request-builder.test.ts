import { DeviceRequestBuilder } from "../../../src/data-retrieval/device-request-builder";

describe('testing OIDC4VCI process', () => {
    test('Process with ISO mobile driving licence', async () => {
        const deviceRequest = new DeviceRequestBuilder().addMobileDocumentRequest('ISO18013')
                                                            .addItemRequest('namespace', 'elementIdentifier', true)
                                                            .end()
                                                        .build();
        expect(deviceRequest).not.toBeNull();

        let b = 0;
    });
});