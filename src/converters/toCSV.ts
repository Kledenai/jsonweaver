import { FieldGenerator, HeaderMapping, JsonArray, JsonObject } from '../types';

const defaultCSVFieldGenerator: FieldGenerator = (Json) => {
  const allKeys = Array.from(new Set(Json.flatMap(item => Object.keys(item))));

  return allKeys.map(key => ({
    label: key,
    value: key
  }));
};

export const customCSVFieldGenerator = (headerMapping: HeaderMapping): FieldGenerator => {
  return () => {
    return Object.keys(headerMapping).map(key => ({
      label: headerMapping[key],
      value: key
    }));
  };
};

const flattenObject = (obj: JsonObject, prefix = ''): JsonObject => {
  return Object.entries(obj).reduce((acc: JsonObject, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }

    return acc;
  }, {});
};

const flattenJson = (Json: JsonArray): JsonArray => {
  return Json.map((item) => flattenObject(item as JsonObject));
};

export const toCSV = (
  Json: JsonArray,
  fieldGenerator: FieldGenerator = defaultCSVFieldGenerator
): string => {
  if (Json.length === 0) return '';

  const flattenedJson = flattenJson(Json);

  const allObjectsEmpty = flattenedJson.every(item => Object.keys(item).length === 0);
  if (allObjectsEmpty) return '';

  const fields = fieldGenerator(flattenedJson);

  const headers = fields.map(field => `"${field.label}"`).join(',');

  const rows = flattenedJson.map((row) =>
    fields
      .map((field) => {
        const value = row[field.value as string];

        if (value === null || value === undefined) {
          return '';
        } else if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        } else if (typeof value === 'number') {
          return `${value}`;
        } else {
          return `"${String(value).replace(/"/g, '""')}"`;
        }
      })
      .join(',')
  );

  return [headers, ...rows].join('\n');
};