import type { JsonArray } from '../types';

export const toMarkdownTable = (json: JsonArray): string => {
  if (json.length === 0) {
    throw new Error('Input JSON array is empty.');
  }

  const headers = Array.from(new Set(json.flatMap(Object.keys)));
  const rows = json.map(obj => headers.map(header => obj[header] || ''));

  const headerRow = `| ${headers.join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '--- ').join('| ')}|`;
  const dataRows = rows.map(row => `| ${row.join(' | ')} |`);

  return [headerRow, separatorRow, ...dataRows].join('\n');
};
