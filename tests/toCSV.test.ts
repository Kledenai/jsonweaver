import { customCSVFieldGenerator, toCSV } from '../src/converters/toCSV';

describe('toCSV Function', () => {
  it('should convert JSON to CSV', () => {
    const json = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }];
    const csv = toCSV(json);
  
    const expectedCSV = `"name","age"
"Alice",25
"Bob",30`;
  
    expect(csv).toBe(expectedCSV);
  });
  

  it('should return empty string for empty JSON array', () => {
    const json: [] = [];
    const csv = toCSV(json);

    expect(csv).toBe('');
  });

  it('should handle JSON with missing or extra keys', () => {
    const json = [
      { name: 'Alice', age: 25 },
      { name: 'Bob' },
      { name: 'Charlie', age: 30, city: 'New York' },
    ];
    const csv = toCSV(json);
  
    const expectedCSV = `"name","age","city"
"Alice",25,
"Bob",,
"Charlie",30,"New York"`;
  
    expect(csv).toBe(expectedCSV);
  });  

  it('should handle JSON with null or undefined values', () => {
    const json = [{ name: 'Alice', age: null }, { name: undefined, age: 30 }];
    const csv = toCSV(json);
  
    const expectedCSV = `"name","age"
"Alice",
,30`;
  
    expect(csv).toBe(expectedCSV);
  });
  

  it('should use custom field generator with header mapping', () => {
    const json = [
      { firstName: 'Alice', lastName: 'Doe', age: 25 },
      { firstName: 'Bob', lastName: 'Smith', age: 30 },
    ];
    const headerMapping = {
      firstName: 'First Name',
      lastName: 'Last Name',
      age: 'Age',
    };

    const csv = toCSV(json, customCSVFieldGenerator(headerMapping));

    const expectedCSV = `"First Name","Last Name","Age"
"Alice","Doe",25
"Bob","Smith",30`;

    expect(csv).toBe(expectedCSV);
  });

  it('should handle deeply nested JSON objects gracefully', () => {
    const json = [
      { name: 'Alice', details: { age: 25, city: 'New York' } },
      { name: 'Bob', details: { age: 30, city: 'Los Angeles' } },
    ];
    const csv = toCSV(json);

    const expectedCSV = `"name","details.age","details.city"
"Alice",25,"New York"
"Bob",30,"Los Angeles"`;

    expect(csv).toBe(expectedCSV);
  });

  it('should escape special characters in strings', () => {
    const json = [
      { name: 'Alice', description: 'Likes "cats" and, dogs.' },
      { name: 'Bob', description: 'Enjoys, "coding"' },
    ];
    const csv = toCSV(json);
  
    const expectedCSV = `"name","description"
"Alice","Likes ""cats"" and, dogs."
"Bob","Enjoys, ""coding"""`;
  
    expect(csv).toBe(expectedCSV);
  });
  

  it('should handle an array of arrays instead of objects', () => {
    const json = [
      ['Name', 'Age', 'City'],
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
    ] as any;

    const csv = toCSV(json);

    const expectedCSV = `"0","1","2"
"Name","Age","City"
"Alice",25,"New York"
"Bob",30,"Los Angeles"`;

    expect(csv).toBe(expectedCSV);
  });

  it('should handle data with a single object', () => {
    const json = [{ name: 'Alice', age: 25 }];
    const csv = toCSV(json);

    const expectedCSV = `"name","age"
"Alice",25`;

    expect(csv).toBe(expectedCSV);
  });

  it('should handle an array with only one key in some objects', () => {
    const json = [
      { name: 'Alice' },
      { name: 'Bob' },
      { age: 30 },
    ];
    const csv = toCSV(json);

    const expectedCSV = `"name","age"
"Alice",
"Bob",
,30`;

    expect(csv).toBe(expectedCSV);
  });

  it('should return empty string for an array of empty objects', () => {
    const json = [{}, {}, {}];
    const csv = toCSV(json);

    expect(csv).toBe('');
  });

  it('should correctly handle large datasets', () => {
    const json = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      value: `Value ${i + 1}`,
    }));
    const csv = toCSV(json);
  
    const expectedCSV = [
      `"id","value"`,
      ...Array.from({ length: 1000 }, (_, i) => `${i + 1},"Value ${i + 1}"`),
    ].join('\n');
  
    expect(csv).toBe(expectedCSV);
  });  
});
