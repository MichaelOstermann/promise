import type { Deferred } from "./defer"
import { defer } from "./defer"
import { createQueue, dequeue, enqueue } from "./internals/queue"

interface Queue {
    add: <T>(fn: () => T) => Promise<Awaited<T>>
    idle: () => Promise<void>
}

type QueueOptions = number | {
    concurrency: number
}

/**
 * # queue
 *
 * ```ts
 * function Promise.queue(options: QueueOptions): Queue
 * ```
 *
 * Creates a queue that limits concurrent execution of tasks.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * const taskQueue = Promise.queue({ concurrency: 2 });
 * const taskQueue2 = Promise.queue(2); // shorthand
 *
 * const results = await Promise.all([
 *     // At most 2 fetch calls are executed at any time
 *     taskQueue.add(() => fetchData(1)),
 *     taskQueue.add(() => fetchData(2)),
 *     taskQueue.add(() => fetchData(3)),
 * ]);
 *
 * // Wait for queue to become idle
 * await taskQueue.idle();
 * ```
 *
 */
export function queue(options: QueueOptions): Queue {
    const concurrency = getConcurrency(options)
    const queue = createQueue<() => void>()
    let idle: Deferred | undefined
    let running = 0

    function flush(): void {
        while (running < concurrency) {
            const next = dequeue(queue)
            if (!next) break
            running++
            next()
        }

        if (!queue.size && running === 0) {
            idle?.resolve()
            idle = undefined
        }
    }

    function done(): void {
        running--
        flush()
    }

    return {
        add<T>(fn: () => T): Promise<Awaited<T>> {
            idle ??= defer()
            const deferred = defer()
            const result = deferred.promise
                .then(fn)
                .finally(done)
            enqueue(queue, deferred.resolve)
            flush()
            return result as any
        },
        idle(): Promise<void> {
            return idle?.promise ?? Promise.resolve()
        },
    }
}

function getConcurrency(options: QueueOptions): number {
    const base = typeof options === "number" ? options : options.concurrency
    if (!Number.isSafeInteger(base)) return Infinity
    return Math.max(base, 1)
}
