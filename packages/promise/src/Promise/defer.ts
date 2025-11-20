export interface Deferred<T = void> {
    promise: Promise<T>
    reject: (reason: unknown) => void
    resolve: (value: T) => void
}

/**
 * `Promise.defer()`
 *
 * Creates a promise that can be resolved/rejected from the outside.
 *
 * ## Example
 *
 * ```ts
 * const deferred = defer<string>();
 * setTimeout(() => deferred.resolve("completed"), 1000);
 */
export function defer<T = void>(): Deferred<T> {
    const deferred = {} as Deferred<T>
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
    })
    return deferred
}
