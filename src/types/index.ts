export type ToXMLOptions = {
  maxDepth?: number;
  arrayHandling?: 'wrap' | 'index';
};

export type JSONObject = Record<string, any>;

export type JSONArray = JSONObject[];