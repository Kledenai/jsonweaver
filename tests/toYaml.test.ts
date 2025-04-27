import toYaml from '../src/converters/toYaml';

describe('toYaml', () => {
  it('should convert a JSON object to YAML format', () => {
    const jsonInput = {
      name: 'JsonWeaver',
      version: '1.0.3',
      features: ['JSON to YAML Conversion'],
    };

    const expectedYaml = `name: JsonWeaver
version: 1.0.3
features:
  - JSON to YAML Conversion
`;

    const yamlOutput = toYaml(jsonInput);

    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle empty JSON objects', () => {
    const yamlOutput = toYaml({});

    expect(yamlOutput).toBe('{}\n');
  });

  it('should throw an error for invalid inputs', () => {
    expect(() => toYaml(null as unknown as object)).toThrow('Conversion error: Input must be a valid JSON string or object.');
    expect(() => toYaml(undefined as unknown as object)).toThrow('Conversion error: Input must be a valid JSON string or object.');
  });

  it('should correctly handle nested JSON objects', () => {
    const jsonInput = {
      person: {
        name: 'John',
        address: {
          city: 'New York',
          zip: '10001',
        },
      },
    };

    const expectedYaml = `person:
  name: John
  address:
    city: New York
    zip: '10001'
`;

    const yamlOutput = toYaml(jsonInput);

    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should correctly handle arrays in JSON objects', () => {
    const jsonInput = {
      items: ['item1', 'item2', 'item3'],
    };

    const expectedYaml = `items:
  - item1
  - item2
  - item3
`;

    const yamlOutput = toYaml(jsonInput);

    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle numbers, booleans, and null values', () => {
    const jsonInput = {
      number: 42,
      boolean: true,
      nullValue: null,
    };

    const expectedYaml = `number: 42
boolean: true
nullValue: null
`;

    const yamlOutput = toYaml(jsonInput);

    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle strings with special characters', () => {
    const jsonInput = {
      text: 'Line1\nLine2',
      emoji: '😊',
    };

    const expectedYaml = `text: |-
  Line1
  Line2
emoji: 😊
`;

    const yamlOutput = toYaml(jsonInput);

    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle large JSON objects', () => {
    const jsonInput = Array.from({ length: 1000 }, (_, i) => ({ index: i }));

    expect(() => toYaml(jsonInput)).not.toThrow();
  });

  it('should produce consistent YAML output for YAML-like strings', () => {
    const jsonInput = {
      yamlLike: `key: value`,
    };

    const expectedYaml = `yamlLike: 'key: value'
`;

    const yamlOutput = toYaml(jsonInput);

    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle numeric keys in JSON objects', () => {
    const jsonInput = {
      123: 'value',
    };

    const expectedYaml = `'123': value
`;

    const yamlOutput = toYaml(jsonInput);

    expect(yamlOutput).toBe(expectedYaml);
  });
});
