import { create } from 'xmlbuilder';
import { ToXmlOptions, JsonObject } from '../types';

export const toXML = (json: JsonObject, options: ToXmlOptions = {}): string => {
  if (typeof json !== 'object' || Array.isArray(json)) {
    throw new Error('Input must be a JSON object (not an array or primitive).');
  }

  const { maxDepth = Infinity, arrayHandling = 'wrap' } = options;

  const buildXML = (obj: any, depth: number = 0): any => {
    if (depth > maxDepth) {
      return;
    }

    if (Array.isArray(obj)) {
      if (arrayHandling === 'wrap') {
        return { item: obj.map((item) => buildXML(item, depth + 1)) };
      } else if (arrayHandling === 'index') {
        return obj.reduce((acc: JsonObject, item, index) => {
          acc[`item${index}`] = buildXML(item, depth + 1);
          return acc;
        }, {});
      }
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.entries(obj).reduce((acc: JsonObject, [key, value]) => {
        acc[key] = buildXML(value, depth + 1);
        return acc;
      }, {});
    } else if (obj === null || obj === undefined) {
      return '';
    }

    return obj;
  };

  const wrappedJson = { root: buildXML(json) };

  return create(wrappedJson, { headless: true }).end({ pretty: true });
};

