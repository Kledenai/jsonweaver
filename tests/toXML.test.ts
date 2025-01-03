import { toXML } from '../src/toXML';

test('Convert JSON to XML', () => {
  const json = { name: 'Alice', age: 25, city: 'Wonderland' };
  const xml = toXML(json);

  expect(xml).toContain('<root>');
  expect(xml).toContain('</root>');

  expect(xml).toContain('<name>Alice</name>');
  expect(xml).toContain('<age>25</age>');
  expect(xml).toContain('<city>Wonderland</city>');
});
