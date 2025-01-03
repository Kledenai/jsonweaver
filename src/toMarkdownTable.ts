export const toMarkdownTable = (json: Array<{ [key: string]: any }>): string => {
  if (json.length === 0) {
    throw new Error('Input JSON array is empty.');
  }

  const headers = Object.keys(json[0]);
  const rows = json.map(obj => headers.map(header => obj[header] || ''));

  const headerRow = `| ${headers.join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '--- ').join('| ')}|`;
  const dataRows = rows.map(row => `| ${row.join(' | ')} |`);

  return [headerRow, separatorRow, ...dataRows].join('\n');
};
