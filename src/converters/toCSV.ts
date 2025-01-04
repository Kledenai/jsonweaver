import { Parser } from 'json2csv';
import { JSONArray } from '../types';

export const toCSV = (json: JSONArray): string => {
  if (json.length === 0) {
    return '';
  }

  const parser = new Parser();
  return parser.parse(json);
};
