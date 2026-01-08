/**
 * # reject
 *
 * ```ts
 * function Promise.reject<T = never>(reason?: any): Promise<T>
 * ```
 *
 * Creates a promise that is rejected with the given reason.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * const promise = Promise.reject("error"); // Promise<never>
 * ```
 *
 */
export const reject = globalThis.Promise.reject.bind(globalThis.Promise)
