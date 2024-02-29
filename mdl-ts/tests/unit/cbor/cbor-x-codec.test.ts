import { CborArray } from "../../../src/cbor/types/cbor-array";
import { CborBoolean } from "../../../src/cbor/types/cbor-boolean";
import { CborByteString } from "../../../src/cbor/types/cbor-byte-string";
import { CborDataItem } from "../../../src/cbor/cbor-data-item";
import { ExtendedArray } from "../../../src/data-element/test";
import { CborArray2, CborBoolean2, CborDataItem2, CborNumber2 } from "../../../src/cbor/cbor-types";

describe('testing CborXCodec', () => {
    test('Serialization', async () => {
        let cborBoolean = new CborBoolean(true);
        let cborArray = new CborArray();

        let cborNumber2 = new CborNumber2(4);
        let cborBoolean2 = new CborBoolean2(true);
        let dataItem2: CborDataItem2 = cborBoolean2;
        if (dataItem2 instanceof CborBoolean2) {
            let t = 1;
        }
        let cborArray2 = new CborArray2(cborNumber2, cborNumber2, cborBoolean2);
        cborArray2[100] = cborNumber2;
        //cborArray2.push(9)
        
        let myProxy = new ExtendedArray();
        myProxy[5] = 7;
        
        if (cborArray instanceof CborDataItem) {
            let t = 1;
        
        }
        cborArray.push(cborBoolean);
        cborArray.push(cborBoolean);
        cborArray[1] = cborBoolean;
        for (let i of cborArray) {
            let t = i;
        }

        let plan = [];
        plan[10] = 1;

        let vrai = ['test', 'test4'];

        //let value = cborArray.get<CborBoolean>(0);
        let value2 = cborArray[0] as CborBoolean;
        let g = cborArray as CborDataItem;
        let x= new Number(0);
        cborBoolean.getValue();
        cborArray[1] = cborBoolean;
        let test2 = cborArray[1];

        let f = new Map<string, string>();

        f.set("a", "b");
        f.set("c", "d");

        let bytes = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
        let bytes2 = new CborByteString(bytes.buffer);
        //let bytes3 = new Uint8Array(bytes2.value);
        //bytes3.fill(0);

        let test:boolean = cborBoolean.valueOf();
    });
});