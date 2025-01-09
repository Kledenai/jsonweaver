import { toJsonLines, toJsonLinesStream } from './converters/toJsonLines';
import { toMarkdownTable } from './converters/toMarkdownTable';
import { toYaml } from './converters/toYaml';
import { toCSV } from './converters/toCSV';
import { toXML } from './converters/toXML';

export const jsonweaver = {
  toJsonLinesStream,
  toMarkdownTable,
  toJsonLines,
  toYaml,
  toCSV,
  toXML,
};
