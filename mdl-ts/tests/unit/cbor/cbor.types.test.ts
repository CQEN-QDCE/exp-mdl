//import { CborDataItem, CborNil, CborNumber } from "../../../src/cbor/cbor-types";

import { CborNumber, CborArray, CborBoolean, CborTest } from "../../../src/cbor/cbor-types";
//import { CborBoolean } from "../../../src/data-element/cbor-boolean";

describe('testing CborXCodec', () => {
    test('Serialization', async () => {

        let cborNumber = CborNumber(-5);
        //cborNumber.
        //cborNumber = 7;
        let cborBoolean = CborBoolean(true);
        let cborArray = CborArray([cborNumber, cborBoolean]);

        let cborArray2 = CborArray([]);

        let bla2 = cborArray[1] as CborNumber;
        //cborArray.
        let v = cborArray instanceof Array;

        let cbortest = new CborTest();
        cbortest.fun(bla2);
        
        let bla = 1;
    });
});

/*
describe('testing CborXCodec', () => {
    test('Serialization', async () => {

        const cborNumber = new CborNumber(-5);
        const instanceOf = cborNumber instanceof CborDataItem;
        const test: CborDataItem = cborNumber;
        //let test: CborNumber = 5;
        //let test = 5 as CborNumber;
        let test2:CborNil = undefined ;

        //let test4 = new Number(6);
        //let number: number = test4.valueOf();
        //let test3 = new CborNumber2(6);
        //let number267: CborNumber3 = 5;

        //let cborMap = new CborMap();
        //cborMap.set('test', test);
        //cborMap.set('test2', test2);

        //let gh = CborNil2;

        //let t = typeof test2;
        //if (number267 instanceof CborNumber3) {

    
        
        let bla = 1;
    });
});

*/
