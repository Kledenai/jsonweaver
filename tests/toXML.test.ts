import toXML from '../src/converters/toXML';

describe('toXML', () => {
  it('should convert a simple JSON object to XML', () => {
    const json = { name: 'Alice', age: 25, city: 'Wonderland' };
    const xml = toXML(json);

    const expected = `
<root>
  <name>Alice</name>
  <age>25</age>
  <city>Wonderland</city>
</root>`.trim();

    expect(xml).toBe(expected);
  });

  it('should handle an empty JSON object', () => {
    const json = {};
    const xml = toXML(json);

    const expected = `<root/>`;

    expect(xml).toBe(expected);
  });

  it('should handle JSON with null and undefined values gracefully', () => {
    const json = { name: 'Alice', age: null, city: undefined };
    const xml = toXML(json);

    const expected = `
<root>
  <name>Alice</name>
  <age/>
  <city/>
</root>`.trim();

    expect(xml).toBe(expected);
  });

  it('should handle deeply nested JSON objects', () => {
    const json = { person: { name: 'Alice', details: { age: 25, city: 'Wonderland' } } };
    const xml = toXML(json);

    const expected = `
<root>
  <person>
    <name>Alice</name>
    <details>
      <age>25</age>
      <city>Wonderland</city>
    </details>
  </person>
</root>`.trim();

    expect(xml).toBe(expected);
  });

  it('should handle arrays with wrap mode (default)', () => {
    const json = { people: ['Alice', 'Bob', 'Charlie'] };
    const xml = toXML(json, { arrayHandling: 'wrap' });

    const expected = `
<root>
  <people>
    <item>Alice</item>
    <item>Bob</item>
    <item>Charlie</item>
  </people>
</root>`.trim();

    expect(xml).toBe(expected);
  });

  it('should handle arrays with index mode', () => {
    const json = { people: ['Alice', 'Bob', 'Charlie'] };
    const xml = toXML(json, { arrayHandling: 'index' });

    const expected = `
<root>
  <people>
    <item0>Alice</item0>
    <item1>Bob</item1>
    <item2>Charlie</item2>
  </people>
</root>`.trim();

    expect(xml).toBe(expected);
  });

  it('should respect the maxDepth option', () => {
    const json = { person: { name: 'Alice', details: { age: 25, city: 'Wonderland' } } };
    const xml = toXML(json, { maxDepth: 1 });

    const expected = `
<root>
  <person/>
</root>`.trim();

    expect(xml).toBe(expected);
  });
});
