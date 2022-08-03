export type OptionalU<T> = T | undefined;
export type OptionalN<T> = T | null;
export type Optional<T> = T | undefined | null;

// Plain Old JavaScript Object
/*
//DEPRECATED, use only if absolutely necessary
export interface POJSObject<T = unknown> {
  [key: string]: T;
}*/

// Plain Old JavaScript Dictionary
export type POJSODictionary = Record<string, string>;

//JSON
export type JSONPrimitives = null | boolean | number | string;

export type JSONProperties<P = undefined> =
  | JSONPrimitives
  | JSONObject
  | JSONArray
  | P;
// eslint-disable-next-line
// @ts-ignore
export type JSONObject = Record<string, JSONProperties>;
export type JSONArray = Array<JSONProperties>;
// eslint-disable-next-line
// @ts-ignore
export type JSONData<T> = JSONProperties<T>;

//Advanced Utility Types
// DeepPartial - This makes all properties down the tree are possibly undefined
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
