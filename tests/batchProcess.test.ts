import batchProcess from '../src/utils/helpers/batchProcess';

describe('batchProcess', () => {
  it('should process items in batches of given size', async () => {
    const input = Array.from({ length: 10 }, (_, i) => ({ id: i }));

    const results: number[] = [];
    await batchProcess(input, 3, async (batch, index) => {
      results.push(batch.length);
      return batch.length;
    });

    expect(results).toEqual([3, 3, 3, 1]);
  });

  it('should handle an empty array', async () => {
    const input: any[] = [];
    const results = await batchProcess(input, 5, async (batch) => batch.length);

    expect(results).toEqual([]);
  });

  it('should pass correct batch index', async () => {
    const input = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
    const receivedIndexes: number[] = [];

    await batchProcess(input, 2, async (_batch, index) => {
      receivedIndexes.push(index);
    });

    expect(receivedIndexes).toEqual([0, 1]);
  });
});
