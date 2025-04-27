import validateJsonSchema from '../src/utils/helpers/validateJsonSchema';

describe('validateJsonSchema', () => {
  const schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  };

  it('should validate a correct JSON object', () => {
    const validJson = { name: 'Alice' };

    expect(() => validateJsonSchema(validJson, schema)).not.toThrow();
  });

  it('should throw an error for an invalid JSON object', () => {
    const invalidJson = { age: 25 };

    expect(() => validateJsonSchema(invalidJson, schema)).toThrow('JSON Schema validation error');
  });

  it('should allow missing non-required properties', () => {
    const partialSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
      required: ['name'],
    };

    const validJson = { name: 'Alice' };
    expect(() => validateJsonSchema(validJson, partialSchema)).not.toThrow();
  });

  it('should throw if the input does not match schema type', () => {
    const invalidJson = 'invalid';

    expect(() => validateJsonSchema(invalidJson as any, schema)).toThrow();
  });
});