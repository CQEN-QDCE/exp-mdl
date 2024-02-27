import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders, AxiosInstance } from 'axios';
import { TransportLayer } from "./transport-layer";

export class HttpTransportLayer implements TransportLayer {
    
    private readonly TAG = "HttpTransportLayer";

    private readonly client: AxiosInstance;

    constructor(private readonly baseUrl: string, private readonly transportLayer: TransportLayer) {
        this.client = axios.create();
    }

    async doGet(url: string): Promise<string> {
        const searchResponse: AxiosResponse = await this.client.get(`${url}`);
        return 'response';
    }

    async doPost(url: string, requestBody: any): Promise<string> {
        const searchResponse: AxiosResponse = await this.client.post(`${url}`);
        return 'response';
    }

}