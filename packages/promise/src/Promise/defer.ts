export interface Deferred<T = void> {
    promise: Promise<T>
    reject: (reason: unknown) => void
    resolve: (value: T) => void
}

/**
 * # defer
 *
 * ```ts
 * function Promise.defer<T = void>(): Deferred<T>
 * ```
 *
 * Creates a promise that can be resolved/rejected from the outside.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * const deferred = defer<string>();
 * setTimeout(() => deferred.resolve("completed"), 1000);
 * const result = await deferred.promise; // "completed"
 * ```
 *
 */
export function defer<T = void>(): Deferred<T> {
    const deferred = {} as Deferred<T>
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
    })
    return deferred
}
