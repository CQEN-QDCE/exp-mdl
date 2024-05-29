import { CborConvertible } from "./cbor-convertible";

export interface CborDataItem {
    readonly majorType: number;
    get type(): CborDataItem.Type;
    getValue(): any;
}

export abstract class CborDataItem {

    public static from(object: CborConvertible): CborDataItem {
        return (<CborConvertible>object).toCborDataItem();
    }

    public static to<T extends CborConvertible>(type: Constructable<T>, dataItem: CborDataItem): T {
        const unInitializedIntance = new type();
        const instance = <T>unInitializedIntance.fromCborDataItem(dataItem);
        if (instance === unInitializedIntance) throw new Error("Invalid data item");
        return instance;
    }

}

export module CborDataItem {

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
        string,  // #6.1004
        integer   // #6.100
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
        constructor(mode: FullDateMode = FullDateMode.string) {
            super(Type.fullDate);
            this.mode = mode;
        }
    }
}

interface Constructable<T> {
    new (...args: any[]): T;
}