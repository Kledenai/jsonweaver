import { toMarkdownTable } from '../src/toMarkdownTable';

test('Convert JSON to Markdown Table', () => {
  const json = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
  ];

  const markdown = toMarkdownTable(json);

  expect(markdown).toContain('| name | age |');
  expect(markdown).toContain('| --- | --- |');
  expect(markdown).toContain('| Alice | 25 |');
  expect(markdown).toContain('| Bob | 30 |');
});

test('Handles missing keys in JSON objects', () => {
  const json = [
    { name: 'Alice', age: 25 },
    { name: 'Bob' }, // Missing "age"
  ];

  const markdown = toMarkdownTable(json);

  expect(markdown).toContain('| name | age |');
  expect(markdown).toContain('| --- | --- |');
  expect(markdown).toContain('| Alice | 25 |');
  expect(markdown).toContain('| Bob |  |');
});
