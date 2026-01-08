<div align="center">

<h1>promise</h1>

![Minified](https://img.shields.io/badge/Minified-4.00_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff) ![Minzipped](https://img.shields.io/badge/Minzipped-1.39_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff)

**Functional utilities for promises.**

[Documentation](https://MichaelOstermann.github.io/promise)

</div>

## Installation

```sh [npm]
npm install @monstermann/promise
```

```sh [pnpm]
pnpm add @monstermann/promise
```

```sh [yarn]
yarn add @monstermann/promise
```

```sh [bun]
bun add @monstermann/promise
```

## Tree-shaking

### Installation

```sh [npm]
npm install -D @monstermann/unplugin-promise
```

```sh [pnpm]
pnpm -D add @monstermann/unplugin-promise
```

```sh [yarn]
yarn -D add @monstermann/unplugin-promise
```

```sh [bun]
bun -D add @monstermann/unplugin-promise
```

### Usage

```ts [Vite]
// vite.config.ts
import promise from "@monstermann/unplugin-promise/vite";

export default defineConfig({
    plugins: [promise()],
});
```

```ts [Rollup]
// rollup.config.js
import promise from "@monstermann/unplugin-promise/rollup";

export default {
    plugins: [promise()],
};
```

```ts [Rolldown]
// rolldown.config.js
import promise from "@monstermann/unplugin-promise/rolldown";

export default {
    plugins: [promise()],
};
```

```ts [Webpack]
// webpack.config.js
const promise = require("@monstermann/unplugin-promise/webpack");

module.exports = {
    plugins: [promise()],
};
```

```ts [Rspack]
// rspack.config.js
const promise = require("@monstermann/unplugin-promise/rspack");

module.exports = {
    plugins: [promise()],
};
```

```ts [ESBuild]
// esbuild.config.js
import { build } from "esbuild";
import promise from "@monstermann/unplugin-promise/esbuild";

build({
    plugins: [promise()],
});
```

## Promise

### all

```ts
function Promise.all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>
```

Waits for all promises to resolve and returns an array of their results. If any promise rejects, the entire operation rejects with that reason.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const results = await Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
]); // [1, 2, 3]
```

### allSettled

```ts
function Promise.allSettled<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>; }>
```

Waits for all promises to settle (resolve or reject) and returns an array of their results with status information.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const results = await Promise.allSettled([
    Promise.resolve(1),
    Promise.reject("error"),
    Promise.resolve(3),
]);
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "error" },
//   { status: "fulfilled", value: 3 }
// ]
```

### andThen

```ts
function Promise.andThen<T, U>(
    target: Promise<T>,
    onResolved: (value: NoInfer<T>) => U | PromiseLike<U>,
    onRejected?:
        | ((reason: any) => U | PromiseLike<U>)
        | null
        | undefined,
): Promise<U>
```

Transforms resolved promise values with `onResolved`. This is an alias for `Promise.then`.

#### Example

```ts [data-first]
import { Promise } from "@monstermann/promise";

Promise.andThen(Promise.resolve(5), (x) => x * 2); // Promise<10>
```

```ts [data-last]
import { Promise } from "@monstermann/promise";

pipe(
    Promise.resolve(5),
    Promise.andThen((x) => x * 2),
); // Promise<10>
```

### any

```ts
function Promise.any<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>
```

Waits for the first promise to resolve and returns its result. If all promises reject, it rejects with an AggregateError.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const result = await Promise.any([
    Promise.reject("error1"),
    Promise.resolve(2),
    Promise.resolve(3),
]); // 2
```

### create

```ts
function Promise.create<T>(
    executor: (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void,
    ) => void,
): Promise<T>
```

Creates a new promise with an executor function that receives resolve and reject callbacks.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const promise = Promise.create<number>((resolve, reject) => {
    setTimeout(() => resolve(42), 1000);
});
```

### debounce

```ts
function Promise.debounce(...args: T): void
```

Creates a debounced function that delays invoking `fn` until after `options.wait` milliseconds have elapsed since the last time the debounced function was invoked.

Implementation details:

- Only one `fn` can run at any given time, asynchronous functions can not conflict with each other
- Pending calls are not accumulated in an internal array and asynchronously resolved

#### Example

```ts
import { Promise } from "@monstermann/promise";

const debouncedSave = Promise.debounce(saveData, {
    wait: 1000,
    // Maximum time to wait after the first call, default: undefined
    maxWait?: 5000,
    // Invoke function on the leading edge, default: false
    leading?: false,
    // Invoke function on the trailing edge, default: true
    trailing?: true,
});

// void
debouncedSave(data);

// Cancel pending execution - does not cancel current invocation
debouncedSave.clear();

// Execute pending invocation asap
debouncedSave.flush();

debouncedSave.isIdle();
debouncedSave.isPending();
debouncedSave.isRunning();

// Wait until idle, if a `gracePeriod` is given then wait
// until it has been idle for `gracePeriod` milliseconds
await debouncedSave.idle(gracePeriod?: number);
```

### defer

```ts
function Promise.defer<T = void>(): Deferred<T>
```

Creates a promise that can be resolved/rejected from the outside.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const deferred = defer<string>();
setTimeout(() => deferred.resolve("completed"), 1000);
const result = await deferred.promise; // "completed"
```

### is

```ts
function Promise.is(target: unknown): target is Promise<unknown>
```

Checks if `target` is a Promise instance.

#### Example

```ts
import { Promise } from "@monstermann/promise";

Promise.is(Promise.resolve()); // true
Promise.is("hello"); // false
```

### limit

```ts
function Promise.limit(...args: T): Promise<Awaited<U>>
```

Limits the concurrency of function execution.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const limitedFetch = Promise.limit(fetch, { concurrency: 3 });
const limitedFetch2 = Promise.limit(fetch, 3); // Shorthand

const results = await Promise.all([
    // At most 3 fetch calls are executed at any time
    limitedFetch("/api/1"),
    limitedFetch("/api/2"),
    limitedFetch("/api/3"),
    limitedFetch("/api/4"),
]);

// Wait for queue to become idle
await limitedFetch.idle();
```

### orElse

```ts
function Promise.orElse<T, U>(
    target: Promise<T>,
    onRejected: (reason: unknown) => U | PromiseLike<U>,
): Promise<T | U>
```

Catches rejected promises and handles them with `onRejected`. This is an alias for `Promise.catch`.

#### Example

```ts [data-first]
import { Promise } from "@monstermann/promise";

Promise.orElse(Promise.reject("error"), () => "fallback"); // Promise<"fallback">
```

```ts [data-last]
import { Promise } from "@monstermann/promise";

pipe(
    Promise.reject("error"),
    Promise.orElse(() => "fallback"),
); // Promise<"fallback">
```

### queue

```ts
function Promise.queue(options: QueueOptions): Queue
```

Creates a queue that limits concurrent execution of tasks.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const taskQueue = Promise.queue({ concurrency: 2 });
const taskQueue2 = Promise.queue(2); // shorthand

const results = await Promise.all([
    // At most 2 fetch calls are executed at any time
    taskQueue.add(() => fetchData(1)),
    taskQueue.add(() => fetchData(2)),
    taskQueue.add(() => fetchData(3)),
]);

// Wait for queue to become idle
await taskQueue.idle();
```

### reject

```ts
function Promise.reject<T = never>(reason?: any): Promise<T>
```

Creates a promise that is rejected with the given reason.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const promise = Promise.reject("error"); // Promise<never>
```

### resolve

```ts
function Promise.resolve<T>(value: T): Promise<Awaited<T>>
```

Creates a promise that resolves with the given value. If the value is already a promise, it returns that promise.

#### Example

```ts
import { Promise } from "@monstermann/promise";

const promise = Promise.resolve(42); // Promise<42>
```

### throttle

```ts
function Promise.throttle(...args: T): void
```

Creates a throttled function that limits how often `fn` can be invoked based on `options.wait` milliseconds.

Implementation details:

- Only one `fn` can run at any given time, asynchronous functions can not conflict with each other
- Pending calls are not accumulated in an internal array and asynchronously resolved

#### Example

```ts
import { Promise } from "@monstermann/promise";

const throttledSave = Promise.throttle(saveData, {
    wait: 1000,
    // Invoke function on the leading edge, default: false
    leading?: false,
    // Invoke function on the trailing edge, default: true
    trailing?: true,
});

// void
throttledSave(data);

// Cancel pending execution - does not cancel current invocation
throttledSave.clear();

// Execute pending invocation asap
throttledSave.flush();

throttledSave.isIdle();
throttledSave.isPending();
throttledSave.isRunning();

// Wait until idle, if a `gracePeriod` is given then wait
// until it has been idle for `gracePeriod` milliseconds
await throttledSave.idle(gracePeriod?: number);
```

### wait

```ts
function Promise.wait(duration: number): Promise<void>
```

Creates a promise that resolves after `duration` milliseconds.

#### Example

```ts [data-first]
import { Promise } from "@monstermann/promise";

await Promise.wait(1000); // waits 1 second
```

```ts [data-last]
import { Promise } from "@monstermann/promise";

pipe(1000, Promise.wait()); // returns Promise<void>
```
