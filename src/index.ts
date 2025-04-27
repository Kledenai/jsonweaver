import { toJsonLines, toJsonLinesStream } from './converters/toJsonLines';
import validateJsonSchema from './utils/helpers/validateJsonSchema';
import toMarkdownTable from './converters/toMarkdownTable';
import batchProcess from './utils/helpers/batchProcess';
import { toCSV } from './converters/toCSV';
import toYaml from './converters/toYaml';
import toXML from './converters/toXML';

export const jsonweaver = {
  validateJsonSchema,
  toJsonLinesStream,
  toMarkdownTable,
  batchProcess,
  toJsonLines,
  toYaml,
  toCSV,
  toXML,
};
