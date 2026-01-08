# then

```ts
function Promise.then<T, U>(
    target: Promise<T>,
    onResolved: (value: NoInfer<T>) => U | PromiseLike<U>,
    onRejected?:
        | ((reason: any) => U | PromiseLike<U>)
        | null
        | undefined,
): Promise<U>
```

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
