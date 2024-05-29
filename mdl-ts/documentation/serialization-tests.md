export interface SerializableStatic {
  new (...args: any[]): any
  fromObject(data: Record<string, unknown>): InstanceType<this>
}

export interface Serializable {
  id: string
  toJSON(): string
}

//class Person implements Serializable {
  // ...
//}

class Database<S extends SerializableStatic, I extends Serializable = InstanceType<S>> {
  #dbPath: string
  #data: Map<string, I> = new Map()
  #entity: S

  constructor(entity: S) {
//    this.#dbPath = resolve(dirname(import.meta.url), `.data/${entity.name.toLowerCase()}.json`)
    this.#entity = entity
    this.#initialize()
  }

  #initialize() {
//    if (existsSync(this.#dbPath)) {
      const data: [string, Record<string, unknown>][] = [];// = JSON.parse(readFileSync(this.#dbPath, 'utf-8'))
      for (const [key, value] of data) {
        this.#data.set(key, this.#entity.fromObject(value))
      }
      return
//    }
   // this.#updateFile()
  }

  get(id: string): I | undefined {
    return this.#data.get(id)
  }
  
  getAll(): I[] {
    return [...this.#data.values()]
  }
  
  save(entity: I): this {
    this.#data.set(entity.id, entity)
   // return this.#updateFile()
   return null;
  }
}

//const db = new Database(Person)
//const all = db.getAll() // Person[]
//const oneOrNone = db.get(1) // Person | undefined
//db.save(new Person())

/*
interface IObject {
    id: number;
    test(): void;
  }
  interface IObjectClass<T> {
    new(): T;
    table_name: string;
    test(): void;
  }
  function createObject<T extends IObject>(cls: IObjectClass<T>, data:Partial<T>):T {
    let obj:T = (<any>Object).assign({},
      data,
      {
        id: 1,
        table_name: cls.table_name,
      }
    )
    return obj;
  }

  interface IConstructor<T> {
    new (...args: any[]): T;

    // Or enforce default constructor
    // new (): T;
}

interface IActivatable {
    id: number;
    name: string;
}

export class ClassA implements IActivatable {
  constructor(value: number) {
      this.id = value;
  }
    public id: number;
    public name: string;
    public address: string;
}

class ClassB implements IActivatable {
    public id: number;
    public name: string;
    public age: number;
}

export function activator<T extends IActivatable>(type: IConstructor<T>): T {
    return new type();
}

const classA = activator(ClassA);

let instance = 1;
  
  //------------------------
  // Implementation
  //------------------------
  export class User implements IObject {
    test(): void {
        throw new Error("Method not implemented.");
    }
    static table_name: string = 'user';
    id: number;
    name: string;
    //static test(): void {}
  }

  //------------------------
// Application
//------------------------
//let user = createObject(User, {name: 'Jimmy'});
//console.log(user.name);


export function getInstance<T extends Object>(type: (new (...args: any[]) => T), ...args: any[]): T {
    return new type(...args);
}

export class Foo {
    private constructor() {
    }
    bar() {
      console.log("Hello World")
    }
  }


  export interface SerializableStatic {
    new (...args: any[]): any
    fromObject(data: Record<string, unknown>): InstanceType<this>
  }
  
  export interface Serializable {
    id: string
    toJSON(): string
  }

  class Person implements Serializable {
      id: string;
      toJSON(): string {
          throw new Error("Method not implemented.");
      }
    // ...
  }

  class Dese {
//    createObject<T extends IObject>(cls: IObjectClass<T>, data:Partial<T>):T {
 //   }
    //createObject2<S extends SerializableStatic, I extends Serializable = InstanceType<S>>(cls: IObjectClass<T>, data:Partial<T>):T {
    //}
  }

  class Database<S extends SerializableStatic, I extends Serializable = InstanceType<S>> {
    #dbPath: string
    #data: Map<string, I> = new Map()
    #entity: S
  
    constructor(entity: S) {
      //this.#dbPath = resolve(dirname(import.meta.url), `.data/${entity.name.toLowerCase()}.json`)
      this.#entity = entity
      this.#initialize()
    }
  
    #initialize() {
      //if (existsSync(this.#dbPath)) {
        const data: [string, Record<string, unknown>][] = null
        for (const [key, value] of data) {
          this.#data.set(key, this.#entity.fromObject(value))
        }
        return
//}
      //this.#updateFile()
    }
  }

  //const db = new Database(Person)

interface CborSerializableInstance {
    toCbor();
}

interface CborSerializable {
    new():CborSerializableInstance;
    fromCbor();
}
*/
/* class decorator */
//function staticImplements<T extends CborSerializable>() {
//  return <U extends T>(constructor: U) => {constructor};
//}

//mport { CborDataItem } from "../data-element/cbor-data-item";

//@staticImplements<CborSerializable>()   /* this statement implements both normal interface & static interface */
//class MyTypeClass extends CborSerializable {
//  public static fromCbor() {}
//  toCbor() {}
//}
/*
class Db2<T extends CborSerializable> {
  constructor(private type: T) {}
  public create() {
      return new this.type();
  }

}

//let test = new Db2(MyTypeClass);

type Test = number;
type Test2 = Test & CborSerializableInstance;

//let f: Test2 = 1;
//f.
*/

import Opaque from "ts-opaque";

interface ConfigConstructor {
  CoreInterface: () => any;
  new (): Config;
}

interface Config {
  readonly NAME: string;
  readonly TITLE: string;
}

const Test: ConfigConstructor = class Test implements Config {
  readonly NAME: string;
  readonly TITLE: string;

  static CoreInterface = function (): any { return "something"; }
}

export class Test2 extends Test{
  constructor() {
    super();
  }
}

/*
let bla = new Test();

interface MyType {
  instanceMethod();
}

interface MyTypeStatic {
  new():MyType;
  staticMethod();
}

function staticImplements() {
  return <U extends MyTypeStatic>(constructor: U) => {constructor};
}

@staticImplements()
class MyTypeClass {
  public static staticMethod() {}
  instanceMethod() {}
}

export class Test23 {

  public tzx(g: MyType): any {}
}

let test = new Test23();
test.tzx(new MyTypeClass());
//test.tzx('');
*/


/*
interface CborDataItemConvertibleIntance {
  toDataItem(): CborDataItem;
}

interface CborDataItemConvertible {
  new():CborDataItemConvertibleIntance;
  fromDataItem(dataItem: CborDataItem): InstanceType<this>;
}

function CborDataItemConvertible() {
  return <U extends CborDataItemConvertible>(constructor: U) => { constructor };
}

@CborDataItemConvertible() 
class MyTypeClass { 
  public static fromDataItem(dataItem: CborDataItem): MyTypeClass { return null; }
  toDataItem(): CborDataItem { return null;}
}

export class Test23 {

  public static decode<T extends CborDataItemConvertible>(type: T, data: string): T 
  { 
    let instance = type.fromDataItem(null);
    return <T>instance; 
  }
}

let instance2 = Test23.decode(MyTypeClass, "test");


/*
interface ITypeOf<T> {
  new(...args: any[]): T
}

function decorate<TCtor extends ITypeOf<any> & { from(s: TCtor): InstanceType<TCtor> }>(cls: TCtor): TCtor {
  return cls
}

@decorate // error no static x
class Foo { }

@decorate // ok
class Boo { 
  private readonly x: number;
  static from(s: Boo): Boo  
  { 
    
    return; 
  }
}
*/

/*
type Tag<T> = { _tag: T }
type WeakOpaqueType<BaseType, T> = BaseType & Tag<T>
type StrongOpaqueType<BaseType, T> = (BaseType & Tag<T>) | Tag<T>
type SuperOpaqueType<BaseType, T> = Tag<T>
type Percentage = (number & Tag<'percentage'>) | Tag<'percentage'>

declare const cborSymbol: unique symbol;
declare const cborSymbol2: unique symbol;

declare const cborNil: unique symbol;

declare const cborBoolean: unique symbol;

interface CborDataItem4 {cborType: number}

//type CborNumber = number & { _CborNumber: void; cborType: 2} & CborDataItem;
type CborNumber = number & { readonly [cborSymbol]: 'CborNumber'; cborType: 2} & CborDataItem4;

type CborBoolean = boolean & { readonly [cborBoolean]: 'CborBoolean'; cborType: 2} & CborDataItem4;


type CborNil = { readonly [cborNil]: 'CborNil'; cborType: 2} & CborDataItem4;

type CborString = string & { readonly [cborSymbol2]: 'CborString'; cborType: 3} & CborDataItem4;
declare const CborString: unique symbol;

type CborArray = Array<CborNumber | CborString> & { CborArray: void; cborType: 4} & CborDataItem4;

let a: CborNumber = 1 as CborNumber; 

let ab: CborBoolean = true as CborBoolean; 


let xx = undefined as CborNil; xx.cborType = 2;

type CborNumber2 = Opaque<number, 'CborNumber'> & CborDataItem4;

let test:CborNumber2 = 2 as CborNumber2;

let dffff: number = test ;



type CborArray3 = {
  [key: number]: CborNumber | CborString,
}; 

let bdfdf: CborArray3 = [a, ''] as CborArray3;
bdfdf[1] = a;

let b: number = a;

let c = [5, a, ''] as CborArray;
//c.push(6);

let d = a as CborDataItem;

export class CborArray2 extends Array<CborNumber | CborString> implements CborDataItem {
  cborType: 4;
}
let tes2 = new CborArray2(a, a, true);

export class CborMap extends Map<number | string, CborDataItem> implements CborDataItem {
  cborType: 5;
}
let cborMap = new CborMap([['', a]]);
cborMap.set(undefined, a);
let recup = cborMap.get('') as CborNumber;

test.push(true);


*/


/*
declare const cborNumber: unique symbol;

declare const cborBoolean: unique symbol;

declare const cborTextString: unique symbol;

declare const cborByteString: unique symbol;

declare const cborEncodedDataItem: unique symbol;

declare const cborNil: unique symbol;

interface CborDataItem { readonly majorType: number | undefined; }

export type CborNumber = number & { readonly [cborNumber]: 'CborNumber'; majorType: undefined } & CborDataItem;

export type CborBoolean = boolean & { readonly [cborBoolean]: 'CborBoolean'; majorType: 7 } & CborDataItem;

export type CborNil = { readonly [cborNil]: 'CborNil'; majorType: 7} & CborDataItem;

export type CborTextString = string & { readonly [cborTextString]: 'CborTextString'; majorType: 3 } & CborDataItem;

export type CborByteString = ArrayBuffer & { readonly [cborByteString]: 'CborByteString'; majorType: 2 } & CborDataItem;

export type CborEncodedDataItem = ArrayBuffer & { readonly [cborEncodedDataItem]: 'CborEncodedDataItem'; majorType: undefined } & CborDataItem;

export class CborArray extends Array<CborDataItem> implements CborDataItem {
    readonly majorType: 4;
}



export class CborMap extends Map<number | string, CborDataItem> implements CborDataItem {
    readonly majorType: 5;
}


/*
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

export abstract class CborDataItem<T = unknown> { 
    public readonly majorType: number | undefined; 
    public readonly value: T;
    protected constructor(majorType: number, value: T) {
        this.majorType = majorType;
        this.value = value;
    }
}

export class CborArray implements CborDataItem<CborDataItem[]> {
    value: CborDataItem[];
    readonly majorType: 4;
}

export class CborNil extends CborDataItem<null> {
    constructor() {
        super(7, null);
    }
}

export class CborTextString extends CborDataItem<string> {
    constructor(value: string) {
        super(3, value);
    }
}

export class CborByteString extends CborDataItem<ArrayBuffer> {
    constructor(value: ArrayBuffer) {
        super(2, value);
    }
}

export class CborEncodedDataItem extends CborDataItem<ArrayBuffer> {
    constructor(value: ArrayBuffer) {
        super(undefined, value);
    }
}

export class CborBoolean extends CborDataItem<boolean> {
    constructor(value: boolean) {
        super(7, value);
    }
}

export class CborNumber extends CborDataItem<number> {
    constructor(value: number) {
        super(value >= 0 ? 0 : 1, value);
    }
}


//export class CborMap extends Map<number | string, CborDataItem> implements CborDataItem {
//    constructor() { }
//    get majorType(): number { return 5; }
//}
*/

export type Brand<
  Base,
  Branding,
  ReservedName extends string = '__type__',
> = Base & {[K in ReservedName]: Branding} & {__witness__: Base};

export type AnyBrand = Brand<unknown, any>;

export type BaseOf<B extends AnyBrand> = B['__witness__'];

export type Brander<B extends AnyBrand> = (underlying: BaseOf<B>) => B;

export function identity<B extends AnyBrand>(underlying: BaseOf<B>): B {
  return underlying as B;
}

export function make<B extends AnyBrand>(): Brander<B> {
  return identity;
}

export type CborNumber = Brand<number, 'CborNumber'>;
export const CborNumber = make<CborNumber>();

type CborBoolean = Brand<boolean, 'CborBoolean'>;
export const CborBoolean = make<CborBoolean>();


type CborArray = Brand<Array<CborNumber | CborBoolean>, 'CborArray'>;
export const CborArray = make<CborArray>();


export class CborTest {
    public fun(num: CborNumber) {}
}


