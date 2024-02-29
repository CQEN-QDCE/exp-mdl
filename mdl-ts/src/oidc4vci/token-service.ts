import { v4 as uuidv4 } from 'uuid';

export class TokenService {
    private localStorage: any;
    constructor(private readonly validTokens: Set<string> = new Set<string>()) {
        if (typeof localStorage === "undefined" || localStorage === null) {
            let LocalStorage = require('node-localstorage').LocalStorage;
            this.localStorage = new LocalStorage('./tokens');
        }
    }

    public provideToken(): string {
        const token = uuidv4();
        //this.validTokens.add(token);
        this.localStorage.setItem(token, token);
        return token;
    }

    public verifyToken(token: string): boolean {
        if (!token) return false;
        return this.localStorage.getItem(token);
        //return this.validTokens.has(token);
    }

    public verifyAndRemoveToken(token: string): boolean {
        if (!token) return false;
        if (this.localStorage.getItem(token)) {
            this.localStorage.removeItem(token);
            return true;
        }
//        if (this.validTokens.has(token)) {
//            this.validTokens.delete(token);
//            return true;
//        }
        return false;
    }
}