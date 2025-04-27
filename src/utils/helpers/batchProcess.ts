import type { JsonArray } from '../../types';

export default function batchProcess<T>(
  data: JsonArray,
  batchSize: number,
  processor: (batch: JsonArray, index: number) => Promise<T> | T
): Promise<T[]> {
  const batches: JsonArray[] = [];

  for (let i = 0; i < data.length; i += batchSize) {
    batches.push(data.slice(i, i + batchSize));
  }

  return Promise.all(
    batches.map((batch, index) => processor(batch, index))
  );
}
