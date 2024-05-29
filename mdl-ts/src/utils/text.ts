import { URLSearchParamsRN } from "./url-search-params";

export class Text {

    private static readonly ignoreTransformList = ["presentation_definition", "grants"];

    static decode(buffer: ArrayBuffer): string {
        return String.fromCharCode.apply(null, new Uint16Array(buffer));
    }

    static encode(value: string): ArrayBuffer {
        const buf = new ArrayBuffer(value.length * 2); // 2 bytes for each char
        const bufView = new Uint16Array(buf);
        for (var i = 0, strLen = value.length; i < strLen; i++) {
          bufView[i] = value.charCodeAt(i);
        }
        return buf;
    }

    static camelToSnakeCase (str: string): string {
        return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
    };

    static stringifyNestedObject (obj: any): string {
        return encodeURIComponent(JSON.stringify(this.camelToSnakeCaseRecursive(obj)));
    };

    static camelToSnakeCaseRecursive (input: any): any {
        if (input === null || typeof input !== "object") {
            return input;
        }
    
        if (Array.isArray(input)) {
            return input.map(this.camelToSnakeCaseRecursive);
        }
    
        return Object.keys(input).reduce(
            (acc: Record<string, any>, key: string) => {
                const snakeKey = this.camelToSnakeCase(key);
                acc[snakeKey] = this.camelToSnakeCaseRecursive(input[key]);
                return acc;
            },
            {}
        );
    };

    static objectToSnakeCaseQueryString (json: Record<string, any>): string {
        return (
            "?" +
            Object.keys(json)
                .map((key) => {
                    const snakeKey = this.camelToSnakeCase(key);
                    const value =
                        typeof json[key] === "object"
                            ? this.stringifyNestedObject(json[key])
                            : json[key];
                    return `${encodeURIComponent(snakeKey)}=${value}`;
                })
                .join("&")
        );
    };

    static snakeToCamelRecursive (input: Record<string, any>): Record<string, any> {
        if (Array.isArray(input)) {
            return input.map((item) => this.snakeToCamelRecursive(item));
        } else if (typeof input === "object" && input !== null) {
            const output: { [key: string]: any } = {};
    
            for (const key in input) {
                if (Object.prototype.hasOwnProperty.call(input, key)) {
                    const camelKey = key.replace(/_([a-z])/g, (match, letter) =>
                        letter.toUpperCase()
                    );
    
                    if (this.ignoreTransformList.includes(key)) {
                        output[camelKey] = input[key];
                    } else {
                        output[camelKey] = this.snakeToCamelRecursive(input[key]);
                    }
                }
            }
    
            return output;
        } else {
            return input;
        }
    }

    static snakeToCamelCase (str: string): string {
        return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
    };
    
    static parseJsonValue (value: string, convertToCameCase: boolean): any {
        try {
            const parsedValue = JSON.parse(value);
            if (typeof parsedValue === "object" && parsedValue !== null) {
                return this.parseJsonKeys(parsedValue, convertToCameCase);
            } else {
                return parsedValue;
            }
        } catch (error) {
            return value;
        }
    };
    
    static parseJsonKeys (json: Record<string, string>, convertToCameCase: boolean): Record<string, any> {
        const result: Record<string, any> = {};
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const camelKey = convertToCameCase ? this.snakeToCamelCase(key) : key;
                const value = this.parseJsonValue(json[key], convertToCameCase);
                result[camelKey] = value;
            }
        }
        return result;
    };

    static parseQueryStringToJson (queryString: string): Record<string, any> {
//        const urlParams = new URLSearchParams(queryString);
//        const urlParams2 = new URLSearchParamsRN(queryString);
        const json: Record<string, any> = {};

        var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = new Map(),
        match;
        while (match = regex.exec(queryString)) {
            params.set(match[1], match[2]);
        }
    
        for (const [key, value] of params.entries()) {
            const camelKey = this.snakeToCamelCase(decodeURIComponent(key));
            json[camelKey] = this.parseJsonValue(
                decodeURIComponent(value),
                key === "client_metadata"
            );
        }
    
        return json;
    };
    
    static joinUrls(baseUrl: string, relativeUrl: string): string {
        const normalizedBaseUrl = baseUrl.endsWith("/")
            ? baseUrl.slice(0, -1)
            : baseUrl;
        const normalizedRelativeUrl = relativeUrl.startsWith("/")
            ? relativeUrl.slice(1)
            : relativeUrl;
    
        return `${normalizedBaseUrl}/${normalizedRelativeUrl}`;
    }
    
}