# defer

`Promise.defer()`

Creates a promise that can be resolved/rejected from the outside.

## Example

```ts
import { Promise } from "@monstermann/promise";

const deferred = defer<string>();
setTimeout(() => deferred.resolve("completed"), 1000);
const result = await deferred.promise; // "completed"
```
