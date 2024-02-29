export interface CborDataItem2 {
    readonly majoyType: number;
    //getValue(): any;
}

export class CborNumber2 extends Number implements CborDataItem2 {
    majoyType: number;
    readonly value: number;
    constructor(value: number) {
        super(value);
        this.majoyType = 0;
        this.value = value;
    }
}

export class CborBoolean2 extends Boolean implements CborDataItem2 {
    majoyType: number;
    readonly value: boolean;
    constructor(value: boolean) {
        super(value);
        this.majoyType = 0;
        this.value = value;
    }
}

export class CborArray2 extends Array<CborNumber2 | CborBoolean2> implements CborDataItem2 {
    majoyType: number;
    readonly value: Array<CborNumber2 | CborBoolean2>;
    constructor(...value: (CborNumber2 | CborBoolean2)[]) {
        super();
        this.push(...value);
        this.majoyType = 0;
        this.value = value;
    }
}