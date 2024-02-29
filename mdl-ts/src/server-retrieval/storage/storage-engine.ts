export interface StorageEngine {

    get(key: string): ArrayBuffer | null;

    put(key: string, value: ArrayBuffer): void;

    delete(key: string): void;

    deleteAll(): void;

    enumerate(): string[];

}