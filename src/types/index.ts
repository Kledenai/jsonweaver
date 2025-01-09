export type JsonObject = Record<string, any>;
export type JsonArray = JsonObject[];

export interface HeaderMapping {
  [key: string]: string;
}

export type ToXmlOptions = {
  maxDepth?: number;
  arrayHandling?: 'wrap' | 'index';
};

type Field = {
  label: string;
  value: string | ((row: Record<string, any>) => string);
};

export type FieldGenerator = (json: JsonArray) => Field[];

export type toYamlOptions = {
  sortKeys?: boolean;
  noRefs?: boolean;
};

export type ToJsonLinesOptions = {
  indent?: number;
  excludeKeys?: string[];
};

export type CustomErrorType = {
  message: string;
  code: number;
};

export type JsonLinesObject = {
  [key: string]: any;
};