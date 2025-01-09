import { toJsonLines, toJsonLinesStream } from '../src/converters/toJsonLines';

describe('toJsonLines', () => {
  it('should convert an array of JSON objects to JSONLines format', () => {
    const jsonArray: Record<string, unknown>[] = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ];

    const expected = `{"name":"Alice","age":25}
{"name":"Bob","age":30}`;
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should handle nested objects and arrays', () => {
    const jsonArray: Record<string, unknown>[] = [
      { name: 'Alice', details: { age: 25, city: 'New York' } },
      { name: 'Bob', hobbies: ['reading', 'traveling'] },
    ];

    const expected = `{"name":"Alice","details":{"age":25,"city":"New York"}}
{"name":"Bob","hobbies":["reading","traveling"]}`;
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should handle different data types', () => {
    const jsonArray: Record<string, unknown>[] = [
      { number: 42, boolean: true, nullValue: null, emptyObject: {} },
    ];

    const expected = `{"number":42,"boolean":true,"nullValue":null,"emptyObject":{}}`;
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should handle an empty array', () => {
    const jsonArray: Record<string, unknown>[] = [];
    const expected = '';
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should handle large volumes of data', () => {
    const jsonArray = Array.from({ length: 1000 }, (_, i) => ({ id: i }));

    const result = toJsonLines(jsonArray);

    expect(result.startsWith('{"id":0}')).toBe(true);
    expect(result.endsWith('{"id":999}')).toBe(true);
  });

  it('should handle numeric keys in objects', () => {
    const jsonArray: Record<string, unknown>[] = [
      { '123': 'value' },
    ];

    const expected = `{"123":"value"}`;
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should exclude specified keys from the objects', () => {
    const jsonArray: Record<string, unknown>[] = [
      { name: 'Alice', age: 25, city: 'New York' },
      { name: 'Bob', age: 30, city: 'Los Angeles' },
    ];

    const options = { excludeKeys: ['city'] };
    const expected = `{"name":"Alice","age":25}
{"name":"Bob","age":30}`;
    const result = toJsonLines(jsonArray, options);

    expect(result).toBe(expected);
  });
});

describe('toJsonLinesStream', () => {
  it('should create a readable stream of JSONLines', async () => {
    const jsonArray: Record<string, unknown>[] = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ];

    const stream = toJsonLinesStream(jsonArray);
    const chunks: string[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk.toString());
    }

    const expected = `{"name":"Alice","age":25}
{"name":"Bob","age":30}
`;
    expect(chunks.join('')).toBe(expected);
  });

  it('should handle nested objects and arrays in stream', async () => {
    const jsonArray: Record<string, unknown>[] = [
      { name: 'Alice', details: { age: 25, city: 'New York' } },
      { name: 'Bob', hobbies: ['reading', 'traveling'] },
    ];

    const stream = toJsonLinesStream(jsonArray);
    const chunks: string[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk.toString());
    }

    const expected = `{"name":"Alice","details":{"age":25,"city":"New York"}}
{"name":"Bob","hobbies":["reading","traveling"]}
`;
    expect(chunks.join('')).toBe(expected);
  });

  it('should handle an empty array and produce an empty stream', async () => {
    const jsonArray: Record<string, unknown>[] = [];
    const stream = toJsonLinesStream(jsonArray);
    const chunks: string[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk.toString());
    }

    expect(chunks.join('')).toBe('');
  });

  it('should throw an error if the input is not an array', () => {
    expect(() => toJsonLinesStream(null as unknown as Record<string, unknown>[])).toThrow(
      'Input must be an array of JSON objects.'
    );
  });
});
