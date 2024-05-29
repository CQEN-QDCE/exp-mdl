import { JsonStringifier } from "../../utils/json.stringifier";
import { ServerRetrievalUtil } from "../server-retrieval-utils";
import { TransportLayer } from "../transport/transport-layer";

export class OidcClient {

    private openIdConfiguration: any = null;

    constructor(private readonly baseUrl: string,
                private readonly transportLayer: TransportLayer) {

    }

    public async configuration(): Promise<string> {
        const response = await this.transportLayer.doGet(`${this.baseUrl}/.well-known/openid-configuration`);
        this.openIdConfiguration = JsonStringifier.parse(response);
        return JsonStringifier.stringify(this.openIdConfiguration);
    }

    public async clientRegistration(registrationRequest: string): Promise<string> {
        return await this.transportLayer.doPost(this.getUrl('registration_endpoint'), registrationRequest);
    }

    public async authorization(authorizationRequest: Map<string, string>): Promise<string> {
        let url = this.getUrl("authorization_endpoint");
        return await this.transportLayer.doGet(url + "?" + ServerRetrievalUtil.mapToUrlQuery(authorizationRequest));
    }

    public async getIdToken(tokenRequest: Map<string, string>): Promise<string> {
        return await this.transportLayer.doPost(
            this.getUrl("token_endpoint"),
            ServerRetrievalUtil.mapToUrlQuery(tokenRequest)
        )
    }

    public async validateIdToken(): Promise<string> {
        return await this.transportLayer.doGet(this.getUrl("jwks_uri"))
    }

    private getUrl(configKey: string): string {
        if (this.openIdConfiguration == null) {
            throw "OIDC Server Retrieval Method 'configuration' should be called first";
        }
        return this.openIdConfiguration[configKey].toString();
    }
}