import { ReaderAuthentication } from "../mdoc-auth/reader-authentication";

export class MDocRequestVerificationParams {

    requiresReaderAuth: boolean = false;
    readerKeyId: string = null;
    allowedToRetain: Map<string, Set<string>> = null;
    readerAuthentication: ReaderAuthentication = null;

    constructor(requiresReaderAuth: boolean, 
                readerKeyId: string, 
                allowedToRetain: Map<string, Set<string>>, 
                readerAuthentication: ReaderAuthentication | null = null) {
        this.requiresReaderAuth = requiresReaderAuth;
        this.readerKeyId = readerKeyId;
        this.allowedToRetain = allowedToRetain;
        this.readerAuthentication = readerAuthentication;
    }
}