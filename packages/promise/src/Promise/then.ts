import { dfdlT } from "@monstermann/dfdl"

/**
 * `Promise.then(target, onResolved, onRejected?)`
 *
 * Transforms resolved promise values with `onResolved`. This is an alias for `Promise.then`.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * Promise.then(Promise.resolve(5), (x) => x * 2); // Promise<10>
 * ```
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * pipe(
 *     Promise.resolve(5),
 *     Promise.then((x) => x * 2),
 * ); // Promise<10>
 * ```
 */
export const then: {
    <T, U>(
        onResolved: (value: NoInfer<T>) => U | PromiseLike<U>,
        onRejected?: ((reason: any) => U | PromiseLike<U>) | null | undefined
    ): (target: Promise<T>) => Promise<U>
    <T, U>(
        target: Promise<T>,
        onResolved: (value: NoInfer<T>) => U | PromiseLike<U>,
        onRejected?: ((reason: any) => U | PromiseLike<U>) | null | undefined
    ): Promise<U>
} = dfdlT(<T, U>(
    target: Promise<T>,
    onResolved: (value: NoInfer<T>) => U | PromiseLike<U>,
    onRejected?: ((reason: any) => U | PromiseLike<U>) | null | undefined,
): Promise<U> => {
    return target.then(onResolved, onRejected)
}, 2)
