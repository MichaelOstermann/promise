# allSettled

`Promise.allSettled(values)`

Waits for all promises to settle (resolve or reject) and returns an array of their results with status information.

## Example

```ts
import { Promise } from "@monstermann/promise";

const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("error"),
  Promise.resolve(3)
]);
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "error" },
//   { status: "fulfilled", value: 3 }
// ]
```
