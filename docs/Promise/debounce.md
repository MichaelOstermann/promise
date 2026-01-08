# debounce

```ts
function Promise.debounce(...args: T): void
```

Creates a debounced function that delays invoking `fn` until after `options.wait` milliseconds have elapsed since the last time the debounced function was invoked.

Implementation details:

- Only one `fn` can run at any given time, asynchronous functions can not conflict with each other
- Pending calls are not accumulated in an internal array and asynchronously resolved

## Example

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
