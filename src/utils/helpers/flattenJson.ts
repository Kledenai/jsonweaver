import type { JsonArray, JsonObject } from "../../types";
import flattenObject from "./flattenObject";

export default function flattenJson (Json: JsonArray): JsonArray {
  return Json.map((item) => flattenObject(item as JsonObject));
};