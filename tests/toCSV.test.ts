import { toCSV } from '../src/converters/toCSV';

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
      { name: 'Charlie', age: 30, city: 'New York' }
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
});
