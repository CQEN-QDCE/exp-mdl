export class Hex {

    static encode(buffer: ArrayBuffer): string {
        let s = '';
        const h = '0123456789abcdef';
        (new Uint8Array(buffer)).forEach((v) => { s += h[v >> 4] + h[v & 15]; });
        return s;
    }

    static decode(value: string): ArrayBuffer {
        if (typeof value !== 'string') throw new TypeError('Expected input to be a string.');
        if ((value.length % 2) !== 0) throw new RangeError('Expected string to be an even number of characters.');
        const byteArray = new Uint8Array(value.length / 2)
        for (let i = 0; i < value.length; i += 2) byteArray[i / 2] = parseInt(value.substring(i, i + 2), 16);
        return byteArray.buffer
    }
}