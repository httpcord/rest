import type { Routes } from "../deps/mod.ts";

// strong-type route strings
export type Route = ReturnType<typeof Routes[keyof typeof Routes]>;

export type JSONPrimitiveType = string | number | boolean;

export interface JSONObject {
  [key: string]: JSONPrimitiveType | JSONPrimitiveType[] | JSONObject;
}
