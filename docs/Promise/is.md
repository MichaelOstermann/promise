# is

`Promise.is(target)`

Checks if `target` is a Promise instance.

## Example

```ts
import { Promise } from "@monstermann/promise";

Promise.is(Promise.resolve()); // true
Promise.is("hello"); // false
```
