# is

```ts
function Promise.is(target: unknown): target is Promise<unknown>
```

Checks if `target` is a Promise instance.

## Example

```ts
import { Promise } from "@monstermann/promise";

Promise.is(Promise.resolve()); // true
Promise.is("hello"); // false
```
