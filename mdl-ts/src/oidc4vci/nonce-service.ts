import { v4 as uuidv4 } from 'uuid';

export class NonceService {
    private localStorage: any;
    constructor(private readonly validNonces: Set<string> = new Set<string>()) {
        if (typeof localStorage === "undefined" || localStorage === null) {
            let LocalStorage = require('node-localstorage').LocalStorage;
            this.localStorage = new LocalStorage('./nonces');
        }
    }

    public provideNonce(): string {
        const nonce = uuidv4();
        //this.validNonces.add(nonce);
        this.localStorage.setItem(nonce, nonce);
        return nonce;
    }

    public verifyNonce(nonce: string): boolean {
        if (!nonce) return false;
        if (this.localStorage.getItem(nonce)) {
            this.localStorage.removeItem(nonce);
            return true;
        }
//        if (this.validNonces.has(nonce)) {
//            this.validNonces.delete(nonce);
//            return true;
//        }
        return false;
    }
}