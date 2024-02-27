export class ServerRetrievalUtil {

    public static mapToUrlQuery(map: Map<string, string>): string {
        let stringBuffer = '';
        var first = true
        for (const [key, value] of map.entries()) {
            if (!first) {
                stringBuffer += "&";
            }
            first = false;
            stringBuffer += key;
            stringBuffer += "=";
            stringBuffer += encodeURI(value);
        }
        return stringBuffer;
    }

    public static urlToMap(url: string): Map<string, string> {
        const queryStringParts = url.split("?");
        const queryString = queryStringParts[queryStringParts.length - 1];
        const parametersAndValues = queryString.split("&");
        let map = new Map<string, string>();
        for(const parameterAndValue of parametersAndValues) {
            const parameterAndValueParts = parameterAndValue.split("=");
            map.set(parameterAndValueParts[0], parameterAndValueParts[1]);
        }
        return map;
    }
}