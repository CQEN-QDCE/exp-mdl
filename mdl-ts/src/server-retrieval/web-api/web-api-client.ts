import { TransportLayer } from "../transport/transport-layer";
import { ServerRequest2 } from "./server-request2";

export class WebApiClient {
    
    constructor(private readonly baseUrl: string, private readonly transportLayer: TransportLayer) {
    }

    public async serverRetrieval(serverRequest: ServerRequest2): Promise<string> {
        return await this.transportLayer.doPost(`${this.baseUrl}/identity`, serverRequest);
    }
    
}