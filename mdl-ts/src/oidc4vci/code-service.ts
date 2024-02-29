import { v4 as uuidv4 } from 'uuid';

export class CodeService {
    private localStorage: any;
    constructor(private readonly validCodes: Set<string> = new Set<string>()) {
        if (typeof localStorage === "undefined" || localStorage === null) {
            let LocalStorage = require('node-localstorage').LocalStorage;
            this.localStorage = new LocalStorage('./codes');
        }
    }

    public provideCode(): string {
        const code = uuidv4();
        //this.validCodes.add(code);
        this.localStorage.setItem(code, code);
        return code;
    }

    public verifyCode(code: string): boolean {
        if (!code) return false;
        if (this.localStorage.getItem(code)) {
            this.localStorage.removeItem(code);
            return true;
        }
//        if (this.validCodes.has(code)) {
//            this.validCodes.delete(code);
//            return true;
//        }
        return false;
    }
}