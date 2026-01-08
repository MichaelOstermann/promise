# resolve

```ts
function Promise.resolve<T>(value: T): Promise<Awaited<T>>
```

Creates a promise that resolves with the given value. If the value is already a promise, it returns that promise.

## Example

```ts
import { Promise } from "@monstermann/promise";

const promise = Promise.resolve(42); // Promise<42>
```
