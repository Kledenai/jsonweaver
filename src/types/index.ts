export type JSONObject = Record<string, any>;
export type JSONArray = JSONObject[];

export interface HeaderMapping {
  [key: string]: string;
}

export type ToXMLOptions = {
  maxDepth?: number;
  arrayHandling?: 'wrap' | 'index';
};

type Field = {
  label: string;
  value: string | ((row: Record<string, any>) => string);
};

export type FieldGenerator = (json: JSONArray) => Field[];
