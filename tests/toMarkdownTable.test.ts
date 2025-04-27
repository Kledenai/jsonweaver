import toMarkdownTable from '../src/converters/toMarkdownTable';

describe('toMarkdownTable', () => {
  it('should convert JSON array to a Markdown table', () => {
    const json = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ];

    const markdown = toMarkdownTable(json);

    const expected = `
| name | age |
| --- | --- |
| Alice | 25 |
| Bob | 30 |`.trim();

    expect(markdown).toBe(expected);
  });

  it('should handle missing keys in JSON objects', () => {
    const json = [
      { name: 'Alice', age: 25 },
      { name: 'Bob' },
    ];

    const markdown = toMarkdownTable(json);

    const expected = `
| name | age |
| --- | --- |
| Alice | 25 |
| Bob |  |`.trim();

    expect(markdown).toBe(expected);
  });

  it('should throw an error for an empty JSON array', () => {
    expect(() => toMarkdownTable([])).toThrow('Input JSON array is empty.');
  });

  it('should handle null and undefined values gracefully', () => {
    const json = [
      { name: 'Alice', age: null },
      { name: undefined, age: 30 },
    ];

    const markdown = toMarkdownTable(json);

    const expected = `
| name | age |
| --- | --- |
| Alice |  |
|  | 30 |`.trim();

    expect(markdown).toBe(expected);
  });

  it('should handle extra keys in JSON objects', () => {
    const json = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30, city: 'New York' },
    ];

    const markdown = toMarkdownTable(json);

    const expected = `
| name | age | city |
| --- | --- | --- |
| Alice | 25 |  |
| Bob | 30 | New York |`.trim();

    expect(markdown).toBe(expected);
  });
});
