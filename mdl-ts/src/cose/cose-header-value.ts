import { CodeHeaderBucket } from "./cose-header-bucket.enum";

export class CoseHeaderValue<T> {

    public value: T | null;

    private bucket: CodeHeaderBucket = CodeHeaderBucket.Protected;

    constructor(value: T = null) {
        this.value = value;
    }

    public get protected(): boolean {
        return this.bucket === CodeHeaderBucket.Protected;
    }

    public protect(): void {
        this.bucket = CodeHeaderBucket.Protected;
    }

    public unprotect(): void {
        this.bucket = CodeHeaderBucket.Unprotected;
    }
}

