# any

```ts
function Promise.any<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>
```

Waits for the first promise to resolve and returns its result. If all promises reject, it rejects with an AggregateError.

## Example

```ts
import { Promise } from "@monstermann/promise";

const result = await Promise.any([
    Promise.reject("error1"),
    Promise.resolve(2),
    Promise.resolve(3),
]); // 2
```
