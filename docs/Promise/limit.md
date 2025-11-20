# limit

`Promise.limit(fn, options)`

Limits the concurrency of function execution.

## Example

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
