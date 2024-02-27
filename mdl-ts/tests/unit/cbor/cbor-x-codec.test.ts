import { CborArray } from "../../../src/data-element/cbor-array";
import { CborBoolean } from "../../../src/data-element/cbor-boolean";
import { CborByteString } from "../../../src/data-element/cbor-byte-string";
import { CborDataItem2 } from "../../../src/data-element/cbor-data-item2";

describe('testing CborXCodec', () => {
    test('Serialization', async () => {
        let cborBoolean = new CborBoolean(true);
        let cborArray = new CborArray();
        cborArray.add(cborBoolean);
        cborArray.add(cborBoolean);
        for (let i of cborArray) {
            let t = i;
        }
        let vrai = ['test', 'test4'];

        let value = cborArray.get<CborBoolean>(0);
        let value2 = cborArray[0] as CborBoolean;
        let g = cborArray as CborDataItem2;
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