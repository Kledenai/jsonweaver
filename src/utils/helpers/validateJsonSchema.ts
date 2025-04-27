import createCustomError from './createCustomError';
import Ajv, { type ValidateFunction } from 'ajv';
import type { JsonObject } from '../../types';

const ajv = new Ajv({ allErrors: true, strict: false });

export default function validateJsonSchema (json: JsonObject, schema: JsonObject): void {
  const validate: ValidateFunction = ajv.compile(schema);

  const valid = validate(json);

  if (!valid) {
    const errors = validate.errors?.map(err => `${err.instancePath} ${err.message}`).join(', ');
    throw createCustomError(`JSON Schema validation error: ${errors}`, 400);
  }
};
