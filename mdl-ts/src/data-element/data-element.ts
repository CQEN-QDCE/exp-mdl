export abstract class DataElement<T = any> {
    protected _value: T;
    protected attribute: DataElement.Attribute;
    constructor(value: T, attribute: DataElement.Attribute) {
        this._value = value;
        this.attribute = attribute;
    }

    get type(): DataElement.Type {
        return this.attribute.type;
    }

    get value(): T {
        return this._value;
    }

    equals(other: any): boolean {
        if (!other) return false;
        if (other instanceof DataElement)
        return true;
    }

    toCBOR(): Buffer {
        throw 'Not implemented.';
        //return Cbor.encodeToByteArray(DataElementSerializer, this);
    }

    toCBORHex(): string {
        throw 'Not implemented.';
        //return Cbor.encodeToHexString(DataElementSerializer, this);
    }

    static fromCBOR(cbor: Buffer): DataElement {
        throw 'Not implemented.';
    }

    static fromCBORHex(cbor: string): DataElement {
        throw 'Not implemented.';
    }
}

export module DataElement {

    export enum Type {
        number,     // #0, #1, #7.25, #7.26, #7.27
        boolean,    // #7.20, #7.21
        textString, // #3
        byteString, // #2
        nil,        // #7.22
        dateTime,   // #6.0, #6.1
        fullDate,   // #6.1004, #6.100
        list,       // #4
        map,        // #5,
        encodedCbor // #6.24
    }

    export enum FullDateMode {
        full_date_str,  // #6.1004
        full_date_int   // #6.100
    }

    export enum DateTimeMode {
        tdate,          // #6.0
        time_int,       // #6.1
        time_float,     // #6.1
        time_double,    // #6.1
    }

    export class Attribute {
        type: Type;
        constructor(type: Type) {
            this.type = type;
        }
    }

    export class DatetimeAttribute extends Attribute {
        protected mode: DateTimeMode;
        constructor(mode: DateTimeMode = DateTimeMode.tdate) {
            super(Type.dateTime);
            this.mode = mode;
        }
    }

    export class FullDateAttribute extends Attribute {
        protected mode: FullDateMode;
        constructor(mode: FullDateMode = FullDateMode.full_date_str) {
            super(Type.fullDate);
            this.mode = mode;
        }
    }
}