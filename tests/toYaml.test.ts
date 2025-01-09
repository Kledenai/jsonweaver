import { toYaml } from '../src/converters/toYaml';

describe('toYaml', () => {
  it('should convert a JSON object to YAML format', () => {
    const jsonInput = {
      name: 'JsonWeaver',
      version: '1.0.3',
      features: ['JSON to YAML Conversion'],
    };

    const expectedYaml = `name: JsonWeaver\nversion: 1.0.3\nfeatures:\n  - JSON to YAML Conversion\n`;

    const yamlOutput = toYaml(jsonInput);
    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle empty JSON objects', () => {
    const jsonInput = {};
    const expectedYaml = '{}\n';

    const yamlOutput = toYaml(jsonInput);
    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should throw an error for invalid inputs', () => {
    expect(() => toYaml(null as unknown as object)).toThrow(
      'Conversion error: Input must be a valid JSON string or object.'
    );
    expect(() => toYaml(undefined as unknown as object)).toThrow(
      'Conversion error: Input must be a valid JSON string or object.'
    );
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

    const expectedYaml = `person:\n  name: John\n  address:\n    city: New York\n    zip: '10001'\n`;

    const yamlOutput = toYaml(jsonInput);
    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should correctly handle arrays in JSON objects', () => {
    const jsonInput = {
      items: ['item1', 'item2', 'item3'],
    };

    const expectedYaml = `items:\n  - item1\n  - item2\n  - item3\n`;

    const yamlOutput = toYaml(jsonInput);
    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle numbers, booleans, and null', () => {
    const jsonInput = {
      number: 42,
      boolean: true,
      nullValue: null,
    };

    const expectedYaml = `number: 42\nboolean: true\nnullValue: null\n`;

    const yamlOutput = toYaml(jsonInput);
    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle strings with special characters', () => {
    const jsonInput = {
      text: 'Line1\nLine2',
      emoji: '😊',
    };

    const expectedYaml = `text: |-\n  Line1\n  Line2\nemoji: 😊\n`;

    const yamlOutput = toYaml(jsonInput);
    expect(yamlOutput).toBe(expectedYaml);
  });


  it('should handle large JSON objects', () => {
    const jsonInput = Array.from({ length: 1000 }, (_, i) => ({ index: i }));

    expect(() => toYaml(jsonInput)).not.toThrow();
  });

  it('should produce consistent YAML output for YAML-like input', () => {
    const jsonInput = {
      yamlLike: `key: value`,
    };

    const expectedYaml = `yamlLike: 'key: value'\n`;

    const yamlOutput = toYaml(jsonInput);
    expect(yamlOutput).toBe(expectedYaml);
  });

  it('should handle numeric keys in objects', () => {
    const jsonInput = {
      123: 'value',
    };

    const expectedYaml = `'123': value\n`;

    const yamlOutput = toYaml(jsonInput);
    expect(yamlOutput).toBe(expectedYaml);
  });
});
