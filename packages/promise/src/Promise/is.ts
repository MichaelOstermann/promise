/**
 * # is
 *
 * ```ts
 * function Promise.is(target: unknown): target is Promise<unknown>
 * ```
 *
 * Checks if `target` is a Promise instance.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * Promise.is(Promise.resolve()); // true
 * Promise.is("hello"); // false
 * ```
 *
 */
export function is(target: unknown): target is Promise<unknown> {
    return target instanceof Promise
        || (
            isObject(target)
            && "then" in target
            && typeof target.then === "function"
            && "catch" in target
            && typeof target.catch === "function"
        )
}

function isObject(value: unknown): value is object {
    return value !== null && (typeof value === "object" || typeof value === "function")
}
