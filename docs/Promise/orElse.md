# orElse

```ts
function Promise.orElse<T, U>(
    target: Promise<T>,
    onRejected: (reason: unknown) => U | PromiseLike<U>,
): Promise<T | U>
```

Catches rejected promises and handles them with `onRejected`. This is an alias for `Promise.catch`.

## Example

::: code-group

```ts [data-first]
import { Promise } from "@monstermann/promise";

Promise.orElse(Promise.reject("error"), () => "fallback"); // Promise<"fallback">
```

```ts [data-last]
import { Promise } from "@monstermann/promise";

pipe(
    Promise.reject("error"),
    Promise.orElse(() => "fallback"),
); // Promise<"fallback">
```

:::
