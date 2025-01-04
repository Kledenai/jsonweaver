import { toXML } from '../src/converters/toXML';

describe('toXML Function', () => {
  it('should convert JSON to XML', () => {
    const json = { name: 'Alice', age: 25, city: 'Wonderland' };
    const xml = toXML(json);

    const expectedXML = `
<root>
  <name>Alice</name>
  <age>25</age>
  <city>Wonderland</city>
</root>`.trim();

    expect(xml).toBe(expectedXML);
  });

  it('should handle empty JSON', () => {
    const json = {};
    const xml = toXML(json);

    const expectedXML = `
<root/>`.trim();

    expect(xml).toBe(expectedXML);
  });

  it('should handle JSON with null and undefined values', () => {
    const json = { name: 'Alice', age: null, city: undefined };
    const xml = toXML(json);

    const expectedXML = `
<root>
  <name>Alice</name>
  <age/>
  <city/>
</root>`.trim();

    expect(xml).toBe(expectedXML);
  });

  it('should handle nested JSON', () => {
    const json = { person: { name: 'Alice', details: { age: 25, city: 'Wonderland' } } };
    const xml = toXML(json);

    const expectedXML = `
<root>
  <person>
    <name>Alice</name>
    <details>
      <age>25</age>
      <city>Wonderland</city>
    </details>
  </person>
</root>`.trim();

      expect(xml).toBe(expectedXML);
    });

  it('should handle arrays with wrap mode', () => {
    const json = { people: ['Alice', 'Bob', 'Charlie'] };
    const xml = toXML(json, { arrayHandling: 'wrap' });

    const expectedXML = `
<root>
  <people>
    <item>Alice</item>
    <item>Bob</item>
    <item>Charlie</item>
  </people>
</root>`.trim();

    expect(xml).toBe(expectedXML);

  });

  it('should handle arrays with index mode', () => {
    const json = { people: ['Alice', 'Bob', 'Charlie'] };
    const xml = toXML(json, { arrayHandling: 'index' });

    const expectedXML = `
<root>
  <people>
    <item0>Alice</item0>
    <item1>Bob</item1>
    <item2>Charlie</item2>
  </people>
</root>`.trim();
  
    expect(xml).toBe(expectedXML);
  });
  

  it('should respect maxDepth option', () => {
    const json = { person: { name: 'Alice', details: { age: 25, city: 'Wonderland' } } };
    const xml = toXML(json, { maxDepth: 1 });

    const expectedXML = `
<root>
  <person/>
</root>`.trim();

    expect(xml).toBe(expectedXML);
  });
});
