import * as yaml from 'js-yaml';
import { CustomErrorType, JsonObject, toYamlOptions } from '../types';
import { createCustomError } from '../utils/errors';

export function toYaml(jsonInput: string | JsonObject, options?: toYamlOptions): string {
  const { sortKeys = false, noRefs = true } = options || {};
  let jsonData: JsonObject;

  try {
    if (typeof jsonInput === 'string') {
      jsonData = JSON.parse(jsonInput);
    } else if (typeof jsonInput === 'object' && jsonInput !== null) {
      jsonData = jsonInput;
    } else {
      const error = createCustomError('Input must be a valid JSON string or object.', 400);
      throw error;
    }

    return yaml.dump(jsonData, {
      noRefs,
      sortKeys,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      const customError = createCustomError('Invalid JSON format.', 400);
      throw customError;
    } else if (error && typeof (error as CustomErrorType).message === 'string') {
      const customError = createCustomError(`Conversion error: ${(error as CustomErrorType).message}`, 500);
      throw customError;
    } else {
      const customError = createCustomError('An unknown error occurred.', 500);
      throw customError;
    }
  }
}
