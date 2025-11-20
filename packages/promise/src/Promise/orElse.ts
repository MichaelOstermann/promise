import { dfdlT } from "@monstermann/dfdl"

/**
 * `Promise.orElse(target, onRejected)`
 *
 * Catches rejected promises and handles them with `onRejected`. This is an alias for `Promise.catch`.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * Promise.orElse(Promise.reject("error"), () => "fallback"); // Promise<"fallback">
 * ```
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * pipe(
 *     Promise.reject("error"),
 *     Promise.orElse(() => "fallback"),
 * ); // Promise<"fallback">
 * ```
 */
export const orElse: {
    <T, U>(onRejected: (reason: unknown) => U | PromiseLike<U>): (target: Promise<T>) => Promise<T | U>
    <T, U>(target: Promise<T>, onRejected: (reason: unknown) => U | PromiseLike<U>): Promise<T | U>
} = dfdlT(<T, U>(target: Promise<T>, onRejected: (reason: unknown) => U | PromiseLike<U>): Promise<T | U> => {
    return target.catch(onRejected)
}, 2)
