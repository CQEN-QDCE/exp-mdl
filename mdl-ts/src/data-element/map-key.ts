import { MapKeyType } from "./map-key-type.enum";

export class MapKey {
    private key: string | number;
    type: MapKeyType = MapKeyType.string;
    constructor(key: string | number) {
        if (typeof key === 'string') this.type = MapKeyType.string;
        if (typeof key === 'number') this.type = MapKeyType.int;
        this.key = key;
    }
    get str(): string {
        return this.key + '';
    }
    get int(): number {
        return this.type === MapKeyType.string ? parseInt(<string>this.key) : <number>this.key;
    }
}