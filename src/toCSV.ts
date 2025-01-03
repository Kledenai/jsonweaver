import { Parser } from 'json2csv';

export const toCSV = (json: object[]): string => {
  const parser = new Parser();
  return parser.parse(json);
};
