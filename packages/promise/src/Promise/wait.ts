import { dfdlT } from "@monstermann/dfdl"

/**
 * # wait
 *
 * ```ts
 * function Promise.wait(duration: number): Promise<void>
 * ```
 *
 * Creates a promise that resolves after `duration` milliseconds.
 *
 * ## Example
 *
 * ```ts [data-first]
 * import { Promise } from "@monstermann/promise";
 *
 * await Promise.wait(1000); // waits 1 second
 * ```
 *
 * ```ts [data-last]
 * import { Promise } from "@monstermann/promise";
 *
 * pipe(1000, Promise.wait()); // returns Promise<void>
 * ```
 *
 */
export const wait: {
    (): (duration: number) => Promise<void>
    (duration: number): Promise<void>
} = dfdlT((duration: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, Math.max(duration, 0)))
}, 1)
