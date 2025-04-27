import type { CustomErrorType } from "../../types";

export default function createCustomError(message: string, code: number): CustomErrorType {
  return { message, code };
}