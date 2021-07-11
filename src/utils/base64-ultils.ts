export class Base64Ultils {
    private static stringToUTF8(str)
    {
        let bytes = [];

        for(let character of str)
        {
            let code = character.codePointAt(0);

            if(code <= 127)
            {
                let byte1 = code;

                bytes.push(byte1);
            }
            else if(code <= 2047)
            {
                let byte1 = 0xC0 | (code >> 6);
                let byte2 = 0x80 | (code & 0x3F);

                bytes.push(byte1, byte2);
            }
            else if(code <= 65535)
            {
                let byte1 = 0xE0 | (code >> 12);
                let byte2 = 0x80 | ((code >> 6) & 0x3F);
                let byte3 = 0x80 | (code & 0x3F);

                bytes.push(byte1, byte2, byte3);
            }
            else if(code <= 2097151)
            {
                let byte1 = 0xF0 | (code >> 18);
                let byte2 = 0x80 | ((code >> 12) & 0x3F);
                let byte3 = 0x80 | ((code >> 6) & 0x3F);
                let byte4 = 0x80 | (code & 0x3F);

                bytes.push(byte1, byte2, byte3, byte4);
            }
        }

        return bytes;
    }

    private static utf8ToString(bytes, fallback)
    {
        let valid = undefined;
        let codePoint = undefined;
        let codeBlocks = [0, 0, 0, 0];

        let result = "";

        for(let offset = 0; offset < bytes.length; offset++)
        {
            let byte = bytes[offset];

            if((byte & 0x80) == 0x00)
            {
                codeBlocks[0] = byte & 0x7F;

                codePoint = codeBlocks[0];
            }
            else if((byte & 0xE0) == 0xC0)
            {
                codeBlocks[0] = byte & 0x1F;

                byte = bytes[++offset];
                if(offset >= bytes.length || (byte & 0xC0) != 0x80) { valid = false; break; }

                codeBlocks[1] = byte & 0x3F;

                codePoint = (codeBlocks[0] << 6) + codeBlocks[1];
            }
            else if((byte & 0xF0) == 0xE0)
            {
                codeBlocks[0] = byte & 0xF;

                for(let blockIndex = 1; blockIndex <= 2; blockIndex++)
                {
                    byte = bytes[++offset];
                    if(offset >= bytes.length || (byte & 0xC0) != 0x80) { valid = false; break; }

                    codeBlocks[blockIndex] = byte & 0x3F;
                }
                if(valid === false) { break; }

                codePoint = (codeBlocks[0] << 12) + (codeBlocks[1] << 6) + codeBlocks[2];
            }
            else if((byte & 0xF8) == 0xF0)
            {
                codeBlocks[0] = byte & 0x7;

                for(let blockIndex = 1; blockIndex <= 3; blockIndex++)
                {
                    byte = bytes[++offset];
                    if(offset >= bytes.length || (byte & 0xC0) != 0x80) { valid = false; break; }

                    codeBlocks[blockIndex] = byte & 0x3F;
                }
                if(valid === false) { break; }

                codePoint = (codeBlocks[0] << 18) + (codeBlocks[1] << 12) + (codeBlocks[2] << 6) + (codeBlocks[3]);
            }
            else
            {
                valid = false; break;
            }

            result += String.fromCodePoint(codePoint);
        }

        if(valid === false)
        {
            if(!fallback)
            {
                throw new TypeError("Malformed utf-8 encoding.");
            }

            result = "";

            for(let offset = 0; offset != bytes.length; offset++)
            {
                result += String.fromCharCode(bytes[offset] & 0xFF);
            }
        }

        return result;
    }

    public static decodeBase64(text, binary)
    {
        if(/[^0-9a-zA-Z\+\/\=]/.test(text)) { throw new TypeError("The string to be decoded contains characters outside of the valid base64 range."); }

        let codePointA = 'A'.codePointAt(0);
        let codePointZ = 'Z'.codePointAt(0);
        let codePointa = 'a'.codePointAt(0);
        let codePointz = 'z'.codePointAt(0);
        let codePointZero = '0'.codePointAt(0);
        let codePointNine = '9'.codePointAt(0);
        let codePointPlus = '+'.codePointAt(0);
        let codePointSlash = '/'.codePointAt(0);

        function getCodeFromKey(key)
        {
            let keyCode = key.codePointAt(0);

            if(keyCode >= codePointA && keyCode <= codePointZ)
            {
                return keyCode - codePointA;
            }
            else if(keyCode >= codePointa && keyCode <= codePointz)
            {
                return keyCode + 26 - codePointa;
            }
            else if(keyCode >= codePointZero && keyCode <= codePointNine)
            {
                return keyCode + 52 - codePointZero;
            }
            else if(keyCode == codePointPlus)
            {
                return 62;
            }
            else if(keyCode == codePointSlash)
            {
                return 63;
            }

            return undefined;
        }

        let codes = Array.from(text).map(character => getCodeFromKey(character));

        let bytesLength = Math.ceil(codes.length / 4) * 3;

        if(codes[codes.length - 2] == undefined) { bytesLength = bytesLength - 2; } else if(codes[codes.length - 1] == undefined) { bytesLength--; }

        let bytes = new Uint8Array(bytesLength);

        for(let offset = 0, index = 0; offset < bytes.length;)
        {
            let code1 = codes[index++];
            let code2 = codes[index++];
            let code3 = codes[index++];
            let code4 = codes[index++];

            let byte1 = (code1 << 2) | (code2 >> 4);
            let byte2 = ((code2 & 0xf) << 4) | (code3 >> 2);
            let byte3 = ((code3 & 0x3) << 6) | code4;

            bytes[offset++] = byte1;
            bytes[offset++] = byte2;
            bytes[offset++] = byte3;
        }

        if(binary) { return bytes; }

        return Base64Ultils.utf8ToString(bytes, true);
    }

    public static encodeBase64(bytes) {
        if (bytes === undefined || bytes === null) {
            return '';
        }
        if (bytes instanceof Array) {
            bytes = bytes.filter(item => {
                return Number.isFinite(item) && item >= 0 && item <= 255;
            });
        }

        if (
            !(
                bytes instanceof Uint8Array ||
                bytes instanceof Uint8ClampedArray ||
                bytes instanceof Array
            )
        ) {
            if (typeof bytes === 'string') {
                const str = bytes;
                bytes = Array.from(unescape(encodeURIComponent(str))).map(ch =>
                    ch.codePointAt(0)
                );
            } else {
                throw new TypeError('bytes must be of type Uint8Array or String.');
            }
        }

        const keys = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '+',
            '/'
        ];
        const fillKey = '=';

        let byte1;
        let byte2;
        let byte3;
        let sign1 = ' ';
        let sign2 = ' ';
        let sign3 = ' ';
        let sign4 = ' ';

        let result = '';

        for (let index = 0; index < bytes.length; ) {
            let fillUpAt = 0;

            // tslint:disable:no-increment-decrement
            byte1 = bytes[index++];
            byte2 = bytes[index++];
            byte3 = bytes[index++];

            if (byte2 === undefined) {
                byte2 = 0;
                fillUpAt = 2;
            }

            if (byte3 === undefined) {
                byte3 = 0;
                if (!fillUpAt) {
                    fillUpAt = 3;
                }
            }

            // tslint:disable:no-bitwise
            sign1 = keys[byte1 >> 2];
            sign2 = keys[((byte1 & 0x3) << 4) + (byte2 >> 4)];
            sign3 = keys[((byte2 & 0xf) << 2) + (byte3 >> 6)];
            sign4 = keys[byte3 & 0x3f];

            if (fillUpAt > 0) {
                if (fillUpAt <= 2) {
                    sign3 = fillKey;
                }
                if (fillUpAt <= 3) {
                    sign4 = fillKey;
                }
            }

            result += sign1 + sign2 + sign3 + sign4;

            if (fillUpAt) {
                break;
            }
        }

        return result;
    }
}
