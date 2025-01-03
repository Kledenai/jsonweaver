import { create } from 'xmlbuilder';

export const toXML = (json: object): string => {
  if (typeof json !== 'object' || Array.isArray(json)) {
    throw new Error('Input must be a JSON object (not an array or primitive).');
  }

  const rootKey = 'root';
  const wrappedJson = { [rootKey]: json };

  return create(wrappedJson).end({ pretty: true });
};
