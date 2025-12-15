/**
 * `Promise.create(executor)`
 *
 * Creates a new promise with an executor function that receives resolve and reject callbacks.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * const promise = Promise.create<number>((resolve, reject) => {
 *   setTimeout(() => resolve(42), 1000);
 * });
 * ```
 */
export function create<T>(executor: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void,
) => void): Promise<T> {
    return new globalThis.Promise(executor)
}
