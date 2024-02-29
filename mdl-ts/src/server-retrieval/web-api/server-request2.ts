import { DocumentRequest } from "./document-request2";

export class ServerRequest2 {
    
    public readonly version: string;
    public readonly token: string;
    public readonly docRequests: DocumentRequest[] = [];
    
    constructor(initializer?: Partial<ServerRequest2>) {
        Object.assign(this, initializer);
    }

}