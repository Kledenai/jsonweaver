import flattenObject from '../src/utils/helpers/flattenObject';

describe('flattenObject', () => {
  it('should flatten a nested object', () => {
    const input = { a: { b: { c: 1 } } };
    const expected = { 'a.b.c': 1 };

    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle objects without nesting', () => {
    const input = { a: 1, b: 2 };
    const expected = { a: 1, b: 2 };

    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle empty objects', () => {
    const input = {};
    const expected = {};

    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle null and undefined values', () => {
    const input = { a: null, b: undefined };
    const expected = { a: null, b: undefined };

    expect(flattenObject(input)).toEqual(expected);
  });
});
