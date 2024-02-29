import { ServerRequest2 } from "./server-request2";
import { WebApiClient } from "./web-api-client";

export class WebApiServerRetrievalProcess {
    
    constructor(private readonly webApiClient: WebApiClient) {
    }

    public async process(serverRetrievalToken: string, docType: string, documentRequest: Map<string, Map<string, boolean>>): Promise<any> {
        const serverRequest = new ServerRequest2(
            {
                version: "1.0",
                token: serverRetrievalToken,
                docRequests: [
                    {
                        docType: docType,
                        nameSpaces: documentRequest
                    }
                ]
            }
        );
        return await this.webApiClient.serverRetrieval(serverRequest);
    }
    
}