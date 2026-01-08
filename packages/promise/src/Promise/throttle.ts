import type { Timer } from "./internals/timers"
import { clearTimer, createTimer, restartTimer, startTimer } from "./internals/timers"

export interface Throttled<T extends unknown[]> {
    (...args: T): void
    clear: () => void
    flush: () => void
    idle: (gracePeriod?: number) => Promise<void>
    isIdle: () => boolean
    isPending: () => boolean
    isRunning: () => boolean
}

type ThrottleOptions = {
    leading?: boolean
    trailing?: boolean
    wait: number
}

/**
 * # throttle
 *
 * ```ts
 * function Promise.throttle(...args: T): void
 * ```
 *
 * Creates a throttled function that limits how often `fn` can be invoked based on `options.wait` milliseconds.
 *
 * Implementation details:
 *
 * - Only one `fn` can run at any given time, asynchronous functions can not conflict with each other
 * - Pending calls are not accumulated in an internal array and asynchronously resolved
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * const throttledSave = Promise.throttle(saveData, {
 *     wait: 1000,
 *     // Invoke function on the leading edge, default: false
 *     leading?: false,
 *     // Invoke function on the trailing edge, default: true
 *     trailing?: true,
 * });
 *
 * // void
 * throttledSave(data);
 *
 * // Cancel pending execution - does not cancel current invocation
 * throttledSave.clear();
 *
 * // Execute pending invocation asap
 * throttledSave.flush();
 *
 * throttledSave.isIdle();
 * throttledSave.isPending();
 * throttledSave.isRunning();
 *
 * // Wait until idle, if a `gracePeriod` is given then wait
 * // until it has been idle for `gracePeriod` milliseconds
 * await throttledSave.idle(gracePeriod?: number);
 * ```
 *
 */
export function throttle<T extends unknown[]>(
    fn: (...args: T) => void | Promise<void>,
    options: ThrottleOptions,
): Throttled<T> {
    let isRunning = false
    let isPending = false
    let flushAsap = false
    let nextArgs: T | undefined
    const idleTimers = new Set<Timer>()
    const waitTimer = createTimer(options.wait, options.trailing === false ? clear : invoke)

    function clear() {
        if (!isPending) return

        isPending = false
        nextArgs = undefined
        clearTimer(waitTimer)

        if (!isRunning) restartTimer(idleTimers)
    }

    async function invoke() {
        const args = nextArgs
        if (isRunning || !isPending || !args) return

        isRunning = true
        isPending = false
        nextArgs = undefined
        clearTimer(waitTimer)
        clearTimer(idleTimers)

        try {
            await fn(...args)
        }
        finally {
            isRunning = false

            if (isPending && flushAsap) {
                invoke()
            }
            else if (isPending) {
                startTimer(waitTimer)
            }
            else {
                restartTimer(idleTimers)
            }
        }
    }

    function throttled(...args: T): void {
        isPending = true
        nextArgs = args

        if (isRunning) return

        if (!isPending && !isRunning && options.leading) {
            invoke()
            return
        }

        clearTimer(idleTimers)
        startTimer(waitTimer)
    }

    throttled.clear = clear

    throttled.flush = function () {
        if (!isPending) return
        if (!isRunning) invoke()
        else flushAsap = true
    }

    throttled.idle = function (gracePeriod: number = 0): Promise<void> {
        return new Promise<void>((resolve) => {
            const t = createTimer(gracePeriod, () => {
                idleTimers.delete(t)
                resolve()
            })
            idleTimers.add(t)
        })
    }

    throttled.isIdle = () => !isPending && !isRunning
    throttled.isPending = () => isPending
    throttled.isRunning = () => isRunning

    return throttled
}
