/**
 * # all
 *
 * ```ts
 * function Promise.all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>
 * ```
 *
 * Waits for all promises to resolve and returns an array of their results. If any promise rejects, the entire operation rejects with that reason.
 *
 * ## Example
 *
 * ```ts
 * import { Promise } from "@monstermann/promise";
 *
 * const results = await Promise.all([
 *     Promise.resolve(1),
 *     Promise.resolve(2),
 *     Promise.resolve(3),
 * ]); // [1, 2, 3]
 * ```
 *
 */
export const all = globalThis.Promise.all.bind(globalThis.Promise)
