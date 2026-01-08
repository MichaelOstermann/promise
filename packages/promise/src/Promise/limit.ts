import { queue } from "./queue"

export interface Limited<T extends unknown[], U> {
    (...args: T): Promise<Awaited<U>>
    idle: () => Promise<void>
}

type LimitOptions = number | {
    concurrency: number
}

/**
 * # limit
 *
 * ```ts
 * function Promise.limit(...args: T): Promise<Awaited<U>>
 * ```
 *
 * Limits the concurrency of function execution.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * const limitedFetch = Promise.limit(fetch, { concurrency: 3 });
 * const limitedFetch2 = Promise.limit(fetch, 3); // Shorthand
 *
 * const results = await Promise.all([
 *     // At most 3 fetch calls are executed at any time
 *     limitedFetch("/api/1"),
 *     limitedFetch("/api/2"),
 *     limitedFetch("/api/3"),
 *     limitedFetch("/api/4"),
 * ]);
 *
 * // Wait for queue to become idle
 * await limitedFetch.idle();
 * ```
 *
 */
export function limit<T extends unknown[], U>(
    fn: (...args: T) => U,
    options: LimitOptions,
): Limited<T, U> {
    const q = queue(options)

    const limited: Limited<T, U> = function (...args) {
        return q.add(() => fn(...args))
    }

    limited.idle = q.idle

    return limited
}
