import { CustomErrorType } from "../types";

export function createCustomError(message: string, code: number): CustomErrorType {
  return { message, code };
}