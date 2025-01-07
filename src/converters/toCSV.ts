import { FieldGenerator, HeaderMapping, JSONArray, JSONObject } from '../types';

const defaultCSVFieldGenerator: FieldGenerator = (json) => {
  const allKeys = Array.from(new Set(json.flatMap(item => Object.keys(item))));

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

const flattenObject = (obj: JSONObject, prefix = ''): JSONObject => {
  return Object.entries(obj).reduce((acc: JSONObject, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }

    return acc;
  }, {});
};

const flattenJSON = (json: JSONArray): JSONArray => {
  return json.map((item) => flattenObject(item as JSONObject));
};

export const toCSV = (
  json: JSONArray,
  fieldGenerator: FieldGenerator = defaultCSVFieldGenerator
): string => {
  if (json.length === 0) return '';

  const flattenedJSON = flattenJSON(json);

  const allObjectsEmpty = flattenedJSON.every(item => Object.keys(item).length === 0);
  if (allObjectsEmpty) return '';

  const fields = fieldGenerator(flattenedJSON);

  const headers = fields.map(field => `"${field.label}"`).join(',');

  const rows = flattenedJSON.map((row) =>
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