export class ArrayBufferComparer {

    public static equals(arrayBuffer1: ArrayBuffer, arrayBuffer2: ArrayBuffer): boolean {
        if (arrayBuffer1 === arrayBuffer2) return true;
        if (arrayBuffer1.byteLength !== arrayBuffer2.byteLength) return false;
        const view1 = new DataView(arrayBuffer1);
        const view2 = new DataView(arrayBuffer2);
        let i = arrayBuffer1.byteLength;
        while (i--) if (view1.getUint8(i) !== view2.getUint8(i)) return false;
        return true;
    }

    public static concatenate(arrayBuffer1: ArrayBuffer, arrayBuffer2: ArrayBuffer): ArrayBuffer {
        let tmp = new Uint8Array(arrayBuffer1.byteLength + arrayBuffer2.byteLength);
        tmp.set(new Uint8Array(arrayBuffer1), 0);
        tmp.set(new Uint8Array(arrayBuffer2), arrayBuffer1.byteLength);
        return tmp.buffer;
    }
    
}