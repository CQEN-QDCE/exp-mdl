export class JsonStringifier {

    public static stringify(obj: any): string {
      return JSON.stringify(obj, JsonStringifier.stringifyReplacer);
    }

    public static parse(obj: any): any {
      return JSON.parse(obj, JsonStringifier.parseReviver);
    }

    private static stringifyReplacer(key, value) {
      if (typeof value === "object" && value !== null) {
        if (value instanceof Map) {
          return {
            _meta: { type: "map" },
            value: Array.from(value.entries()),
          };
        } else if (value instanceof Set) { // bonus feature!
          return {
            _meta: { type: "set" },
            value: Array.from(value.values()),
          };
        } else if ("_meta" in value) {
          // Escape "_meta" properties
          return {
            ...value,
            _meta: {
              type: "escaped-meta",
              value: value["_meta"],
            },
          };
        }
      }
      return value;
    }
    
    private static  parseReviver(key, value) {
      if (typeof value === "object" && value !== null) {
        if ("_meta" in value) {
          if (value._meta.type === "map") {
            return new Map(value.value);
          } else if (value._meta.type === "set") {
            return new Set(value.value);
          } else if (value._meta.type === "escaped-meta") {
            // Un-escape the "_meta" property
            return {
              ...value,
              _meta: value._meta.value,
            };
          } else {
            console.warn("Unexpected meta", value._meta);
          }
        }
      }
      return value;
    }
}

