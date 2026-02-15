# limit

```ts
function Promise.limit(options: number | { concurrency: number }): Limited
```

Creates a limiter that controls the concurrency of function execution.

## Example

```ts
import { Promise } from "@monstermann/promise";

const limiter = Promise.limit({ concurrency: 3 });
const limiter2 = Promise.limit(3); // Shorthand

const results = await Promise.all([
    // At most 3 functions are executed at any time
    limiter(() => fetch("/api/1")),
    limiter(() => fetch("/api/2")),
    limiter(() => fetch("/api/3")),
    limiter(() => fetch("/api/4")),
]);

// Wait for queue to become idle
await limiter.idle();
```
