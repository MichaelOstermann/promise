# then

`Promise.then(target, onResolved, onRejected?)`

Transforms resolved promise values with `onResolved`. This is an alias for `Promise.then`.

## Example

::: code-group

```ts [data-first]
import { Promise } from "@monstermann/promise";

Promise.then(Promise.resolve(5), (x) => x * 2); // Promise<10>
```

```ts [data-last]
import { Promise } from "@monstermann/promise";

pipe(
    Promise.resolve(5),
    Promise.then((x) => x * 2),
); // Promise<10>
```

:::
