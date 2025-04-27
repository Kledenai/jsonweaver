import type { JsonObject } from "../../types";

export default function flattenObject(obj: JsonObject, prefix = ''): JsonObject {
  return Object.entries(obj).reduce((acc: JsonObject, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }

    return acc;
  }, {});
}
