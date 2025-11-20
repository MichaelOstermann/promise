# throttle

`Promise.throttle(fn, options)`

Creates a throttled function that limits how often `fn` can be invoked based on `options.wait` milliseconds.

Implementation details:

- Only one `fn` can run at any given time, asynchronous functions can not conflict with each other
- Pending calls are not accumulated in an internal array and asynchronously resolved

## Example

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
