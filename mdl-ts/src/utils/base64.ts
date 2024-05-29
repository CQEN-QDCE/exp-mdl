export class Base64 {
    
    private static chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    
    private static lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);

    private static initialized = false;
    
    private static initialize() {
        for (let i = 0; i < Base64.chars.length; i++) Base64.lookup[Base64.chars.charCodeAt(i)] = i;
        Base64.initialized = true;
    }

    static urlEncode(buffer: ArrayBuffer): string {
        return Base64.encode(buffer).replace(/\+/g, '-')
                                    .replace(/\//g, '_')
                                    .replace(/=+$/, '');
    }

    static encode(buffer: ArrayBuffer): string {
        Base64.initialize();
        const bytes = new Uint8Array(buffer);
        const len = bytes.length;
        let base64 = '';

        for (let i = 0; i < len; i += 3) {
            base64 += Base64.chars[bytes[i] >> 2];
            base64 += Base64.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += Base64.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += Base64.chars[bytes[i + 2] & 63];
        }

        if (len % 3 === 2) {
            base64 = base64.substring(0, base64.length - 1) + '=';
        } else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + '==';
        }

        return base64;
    }

    static urlDecode(base64: string): ArrayBuffer {
        const m = base64.length % 4;
        return Base64.decode(base64.replace(/-/g, '+')
                                   .replace(/_/g, '/')
                                   .padEnd(base64.length + (m === 0 ? 0 : 4 - m), '='))
    }

    static decode(base64: string): ArrayBuffer {
        Base64.initialize();
        let bufferLength = base64.length * 0.75;
        const len = base64.length;
        let p = 0;
        let encoded1;
        let encoded2;
        let encoded3;
        let encoded4;

        if (base64[base64.length - 1] === '=') {
            bufferLength--;
            if (base64[base64.length - 2] === '=') {
                bufferLength--;
            }
        }

        const arraybuffer = new ArrayBuffer(bufferLength),
            bytes = new Uint8Array(arraybuffer);

        for (let i = 0; i < len; i += 4) {
            encoded1 = Base64.lookup[base64.charCodeAt(i)];
            encoded2 = Base64.lookup[base64.charCodeAt(i + 1)];
            encoded3 = Base64.lookup[base64.charCodeAt(i + 2)];
            encoded4 = Base64.lookup[base64.charCodeAt(i + 3)];

            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }

        return arraybuffer;
    }
}