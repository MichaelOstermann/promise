import type { Timer } from "./internals/timers"
import { clearTimer, createTimer, restartTimer, startTimer } from "./internals/timers"

export interface Debounced<T extends unknown[]> {
    (...args: T): void
    clear: () => void
    flush: () => void
    idle: (gracePeriod?: number) => Promise<void>
    isIdle: () => boolean
    isPending: () => boolean
    isRunning: () => boolean
}

type DebounceOptions = {
    leading?: boolean
    maxWait?: number
    trailing?: boolean
    wait: number
}

/**
 * # debounce
 *
 * ```ts
 * function Promise.debounce(...args: T): void
 * ```
 *
 * Creates a debounced function that delays invoking `fn` until after `options.wait` milliseconds have elapsed since the last time the debounced function was invoked.
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
 * const debouncedSave = Promise.debounce(saveData, {
 *     wait: 1000,
 *     // Maximum time to wait after the first call, default: undefined
 *     maxWait?: 5000,
 *     // Invoke function on the leading edge, default: false
 *     leading?: false,
 *     // Invoke function on the trailing edge, default: true
 *     trailing?: true,
 * });
 *
 * // void
 * debouncedSave(data);
 *
 * // Cancel pending execution - does not cancel current invocation
 * debouncedSave.clear();
 *
 * // Execute pending invocation asap
 * debouncedSave.flush();
 *
 * debouncedSave.isIdle();
 * debouncedSave.isPending();
 * debouncedSave.isRunning();
 *
 * // Wait until idle, if a `gracePeriod` is given then wait
 * // until it has been idle for `gracePeriod` milliseconds
 * await debouncedSave.idle(gracePeriod?: number);
 * ```
 *
 */
export function debounce<T extends unknown[]>(
    fn: (...args: T) => void | Promise<void>,
    options: DebounceOptions,
): Debounced<T> {
    let isRunning = false
    let isPending = false
    let flushAsap = false
    let nextArgs: T | undefined
    const idleTimers = new Set<Timer>()
    const waitTimer = createTimer(options.wait, options.trailing === false ? clear : invoke)
    const maxWaitTimer = createTimer(options.maxWait ?? -1, invoke)

    function clear() {
        if (!isPending) return

        isPending = false
        nextArgs = undefined
        clearTimer(waitTimer)
        clearTimer(maxWaitTimer)

        if (!isRunning) restartTimer(idleTimers)
    }

    async function invoke() {
        const args = nextArgs
        if (isRunning || !isPending || !args) return

        isRunning = true
        isPending = false
        nextArgs = undefined
        clearTimer(waitTimer)
        clearTimer(maxWaitTimer)
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
                restartTimer(waitTimer)
                restartTimer(maxWaitTimer)
            }
            else {
                restartTimer(idleTimers)
            }
        }
    }

    function debounced(...args: T): void {
        isPending = true
        nextArgs = args

        if (isRunning) return

        if (!isPending && !isRunning && options.leading) {
            invoke()
            return
        }

        clearTimer(idleTimers)
        restartTimer(waitTimer)
        startTimer(maxWaitTimer)
    }

    debounced.clear = clear

    debounced.flush = function () {
        if (!isPending) return
        if (!isRunning) invoke()
        else flushAsap = true
    }

    debounced.idle = function (gracePeriod: number = 0): Promise<void> {
        return new Promise<void>((resolve) => {
            const t = createTimer(gracePeriod, () => {
                idleTimers.delete(t)
                resolve()
            })
            idleTimers.add(t)
        })
    }

    debounced.isIdle = () => !isPending && !isRunning
    debounced.isPending = () => isPending
    debounced.isRunning = () => isRunning

    return debounced
}
