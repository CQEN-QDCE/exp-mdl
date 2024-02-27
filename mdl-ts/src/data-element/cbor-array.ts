import { CborDataItem2 } from "./cbor-data-item2";

export class CborArray extends CborDataItem2 implements Iterable<CborDataItem2> {

    readonly length: number = 0;

    constructor(private value: CborDataItem2[] = []) {
        super(new CborDataItem2.Attribute(CborDataItem2.Type.list));
    }

    [index: number]: CborDataItem2 

    *[Symbol.iterator](): Iterator<CborDataItem2, any, undefined> {
        for(let i of this.values()) {
            yield i;
        }
    }

    get<T extends CborDataItem2>(index: number): T {
        return this[index] as T;
    }

    add(value: CborDataItem2): void {
        this[this.length] = value;
        this.changeLength(this.length + 1);
    }

    public getValue(): CborDataItem2[] {
        return this.values();
    }

    private changeLength(length: number) {
        const mutableThis = this as Mutable<CborArray>;
        mutableThis.length = length;
    }

    private values(): CborDataItem2[] {
        const values:CborDataItem2[] = [];
        for (const i of Object.keys(this).map(Number)) if (!isNaN(i)) values.push(this[i]);
        return values;
    }
    
}

type Mutable<T> = {
    -readonly [k in keyof T]: T[k];
 };
