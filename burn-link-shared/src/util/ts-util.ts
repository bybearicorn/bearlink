/** Replaces recursively **Date** type for **string**
 *
 * Backend uses Dates, but it is serialized as string in JSON */
export type FE<T> = T extends Date
  ? string
  : T extends Array<infer U>
    ? Array<FE<U>>
    : T extends object
      ? { [K in keyof T]: FE<T[K]> }
      : T;

export type NonNullableProps<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
