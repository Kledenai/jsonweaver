import flattenJson from '../src/utils/helpers/flattenJson';

describe('flattenJson', () => {
  it('should flatten an array of nested objects', () => {
    const input = [{ a: { b: 1 } }, { a: { c: 2 } }];
    const expected = [{ 'a.b': 1 }, { 'a.c': 2 }];

    expect(flattenJson(input)).toEqual(expected);
  });

  it('should handle an empty array', () => {
    expect(flattenJson([])).toEqual([]);
  });

  it('should handle array with flat objects', () => {
    const input = [{ a: 1 }, { b: 2 }];
    const expected = [{ a: 1 }, { b: 2 }];

    expect(flattenJson(input)).toEqual(expected);
  });
});
