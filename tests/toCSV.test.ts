import { toCSV } from '../src/toCSV';

test('Convert JSON to CSV', () => {
  const json = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }];
  const csv = toCSV(json);

  expect(csv).toContain('"name","age"');
  expect(csv).toContain('"Alice",25');
  expect(csv).toContain('"Bob",30');
});