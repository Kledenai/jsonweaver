import { toMarkdownTable } from '../src/converters/toMarkdownTable';

describe('toMarkdownTable Function', () => {
  it('should convert JSON to a Markdown table', () => {
    const json = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ];

    const markdown = toMarkdownTable(json);

    const expectedTable = `
| name | age |
| --- | --- |
| Alice | 25 |
| Bob | 30 |`.trim();

    expect(markdown).toBe(expectedTable);
  });

  it('should handle missing keys in JSON objects', () => {
    const json = [
      { name: 'Alice', age: 25 },
      { name: 'Bob' },
    ];

    const markdown = toMarkdownTable(json);

    const expectedTable = `
| name | age |
| --- | --- |
| Alice | 25 |
| Bob |  |`.trim();

    expect(markdown).toBe(expectedTable);
  });

  it('should return an error for an empty JSON array', () => {
    const json: [] = [];

    expect(() => toMarkdownTable(json)).toThrow('Input JSON array is empty.');
  });

  it('should handle null and undefined values', () => {
    const json = [
      { name: 'Alice', age: null },
      { name: undefined, age: 30 },
    ];

    const markdown = toMarkdownTable(json);

    const expectedTable = `
| name | age |
| --- | --- |
| Alice |  |
|  | 30 |`.trim();

    expect(markdown).toBe(expectedTable);
  });

  it('should handle extra keys in JSON objects', () => {
    const json = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30, city: 'New York' },
    ];

    const markdown = toMarkdownTable(json);

    const expectedTable = `
| name | age | city |
| --- | --- | --- |
| Alice | 25 |  |
| Bob | 30 | New York |`.trim();

    expect(markdown).toBe(expectedTable);
  });
});
