import { expectType } from "tsd";

// IMPLEMENT THIS TYPE
export type WrapForPenpal<T> = {
  [P in keyof T]: T[P] extends { (...args: infer Args): infer R } // Value is a method or anything callable
  ? R extends Promise<any> // I inferred return a Promise
  ? (...args: Args) => R // Return function signature 
  : (...args: Args) => Promise<R> // Result should be wrapped in a promise
  : never
};

/**
 * Test Scenario - Do not change anything below this line
 */
const methods = {
  add(a: number, b: number): number {
    return a + b;
  },
  subtract(a: number, b: number): number {
    return a - b;
  },
};

const asyncMethods: WrapForPenpal<typeof methods> = {} as any;

let addPromise = asyncMethods.add(1, 2);
expectType<Promise<number>>(addPromise);
// @ts-expect-error
expectType<typeof addPromise>("this should fail");

let subtractPromise = asyncMethods.subtract(1, 2);
expectType<Promise<number>>(subtractPromise);
// @ts-expect-error
expectType<typeof subtractPromise>("this should fail");
