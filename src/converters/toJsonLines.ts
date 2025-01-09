import { Readable } from 'stream';
import { JsonLinesObject, ToJsonLinesOptions } from '../types';

export function toJsonLines(
  jsonArray: JsonLinesObject[],
  options?: ToJsonLinesOptions
): string {
  if (!Array.isArray(jsonArray)) {
    throw new Error('Input must be an array of JSON objects.');
  }

  if (!jsonArray.every(item => item && typeof item === 'object' && !Array.isArray(item))) {
    throw new Error('All elements in the array must be valid JSON objects.');
  }

  const { indent = 0, excludeKeys = [] } = options || {};

  return jsonArray
    .map(obj => {
      const filteredObj = { ...obj };
      excludeKeys.forEach(key => delete filteredObj[key]);
      return JSON.stringify(filteredObj, null, indent);
    })
    .join('\n');
};

export function toJsonLinesStream(jsonArray: object[]): Readable {
  if (!Array.isArray(jsonArray)) {
      throw new Error('Input must be an array of JSON objects.');
  }

  return Readable.from(jsonArray.map(obj => JSON.stringify(obj) + '\n'));
};
