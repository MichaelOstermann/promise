# wait

```ts
function Promise.wait(duration: number): Promise<void>
```

Creates a promise that resolves after `duration` milliseconds.

## Example

::: code-group

```ts [data-first]
import { Promise } from "@monstermann/promise";

await Promise.wait(1000); // waits 1 second
```

```ts [data-last]
import { Promise } from "@monstermann/promise";

pipe(1000, Promise.wait()); // returns Promise<void>
```

:::
