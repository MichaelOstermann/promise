import { queue } from "./queue"

export interface Limited {
    <T>(fn: () => Promise<T>): Promise<Awaited<T>>
    idle: () => Promise<void>
}

type LimitOptions = number | {
    concurrency: number
}

/**
 * # limit
 *
 * ```ts
 * function Promise.limit(options: number | { concurrency: number }): Limited
 * ```
 *
 * Creates a limiter that controls the concurrency of function execution.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * const limiter = Promise.limit({ concurrency: 3 });
 * const limiter2 = Promise.limit(3); // Shorthand
 *
 * const results = await Promise.all([
 *     // At most 3 functions are executed at any time
 *     limiter(() => fetch("/api/1")),
 *     limiter(() => fetch("/api/2")),
 *     limiter(() => fetch("/api/3")),
 *     limiter(() => fetch("/api/4")),
 * ]);
 *
 * // Wait for queue to become idle
 * await limiter.idle();
 * ```
 *
 */
export function limit(
    options: LimitOptions,
): Limited {
    const q = queue(options)

    const limited: Limited = function (fn) {
        return q.add(() => fn())
    }

    limited.idle = q.idle

    return limited
}
