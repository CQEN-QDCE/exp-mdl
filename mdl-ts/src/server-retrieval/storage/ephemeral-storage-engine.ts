import { StorageEngine } from "./storage-engine";

export class EphemeralStorageEngine implements StorageEngine {
    
    private readonly storage: Map<string, ArrayBuffer> = new Map<string, ArrayBuffer>();

    public get(key: string): ArrayBuffer | null {
        return this.storage.get(key) || null;
    }

    public put(key: string, value: ArrayBuffer): void {
        this.storage.set(key, value);
    }

    public delete(key: string): void {
        this.storage.delete(key);
    }

    public deleteAll(): void {
        this.storage.clear();
    }

    public enumerate(): string[] {
        return Array.from(this.storage.keys());
    }
}