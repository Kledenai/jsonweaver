import { toJsonLines, toJsonLinesStream } from '../src/converters/toJsonLines';

describe('toJsonLines', () => {
  it('should convert an array of JSON objects to JSONLines format', () => {
    const jsonArray = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ];

    const expected = `{"name":"Alice","age":25}
{"name":"Bob","age":30}`;
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should handle nested objects and arrays', () => {
    const jsonArray = [
      { name: 'Alice', details: { age: 25, city: 'New York' } },
      { name: 'Bob', hobbies: ['reading', 'traveling'] },
    ];

    const expected = `{"name":"Alice","details":{"age":25,"city":"New York"}}
{"name":"Bob","hobbies":["reading","traveling"]}`;
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should handle different data types correctly', () => {
    const jsonArray = [
      { number: 42, boolean: true, nullValue: null, emptyObject: {} },
    ];

    const expected = `{"number":42,"boolean":true,"nullValue":null,"emptyObject":{}}`;
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should return an empty string for an empty array', () => {
    const result = toJsonLines([]);

    expect(result).toBe('');
  });

  it('should handle large volumes of data', () => {
    const jsonArray = Array.from({ length: 1000 }, (_, i) => ({ id: i }));

    const result = toJsonLines(jsonArray);

    expect(result.startsWith('{"id":0}')).toBe(true);
    expect(result.endsWith('{"id":999}')).toBe(true);
  });

  it('should correctly exclude specified keys', () => {
    const jsonArray = [
      { name: 'Alice', age: 25, city: 'New York' },
      { name: 'Bob', age: 30, city: 'Los Angeles' },
    ];

    const options = { excludeKeys: ['city'] };
    const expected = `{"name":"Alice","age":25}
{"name":"Bob","age":30}`;
    const result = toJsonLines(jsonArray, options);

    expect(result).toBe(expected);
  });

  it('should handle numeric keys in objects', () => {
    const jsonArray = [{ '123': 'value' }];

    const expected = `{"123":"value"}`;
    const result = toJsonLines(jsonArray);

    expect(result).toBe(expected);
  });

  it('should throw an error if input is not an array', () => {
    expect(() => toJsonLines(null as unknown as object[])).toThrow('Input must be an array of JSON objects.');
    expect(() => toJsonLines({} as unknown as object[])).toThrow('Input must be an array of JSON objects.');
  });
});

describe('toJsonLinesStream', () => {
  it('should create a readable stream of JSONLines', async () => {
    const jsonArray = [
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

  it('should handle nested objects and arrays in the stream', async () => {
    const jsonArray = [
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

  it('should return an empty stream for an empty array', async () => {
    const stream = toJsonLinesStream([]);
    const chunks: string[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk.toString());
    }

    expect(chunks.join('')).toBe('');
  });

  it('should throw an error if input is not an array', () => {
    expect(() => toJsonLinesStream(null as unknown as object[])).toThrow('Input must be an array of JSON objects.');
    expect(() => toJsonLinesStream({} as unknown as object[])).toThrow('Input must be an array of JSON objects.');
  });
});
