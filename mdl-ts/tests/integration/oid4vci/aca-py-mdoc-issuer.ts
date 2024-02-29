import axios, { AxiosResponse, AxiosInstance } from 'axios';

export class AcaPyMdocIssuer {

    private client: AxiosInstance;

    constructor(private host: string = 'http://localhost:3001') {
        this.client = axios.create();
    }

    public async process(): Promise<void> {
        await this.configureCredentialIssuerMetadata();
    }

    private async configureCredentialIssuerMetadata(): Promise<void> {
        await this.ensureSupportedCredentialRecordExists();
    }

    private async ensureSupportedCredentialRecordExists(): Promise<void> {
        const supportedCredentialId = await this.getSupportedCredentialId();
        if (!supportedCredentialId) {
            await this.createCredentialSupportedRecord();
        }
    }

    private async getSupportedCredentialId(): Promise<string> {
        const credentialSupportedResponse: AxiosResponse = await this.client.get(`${this.host}/oid4vci/credential-supported/records?format=mso_mdoc`);
        return '';
    }

    private async createCredentialSupportedRecord(): Promise<void> {
    }

}