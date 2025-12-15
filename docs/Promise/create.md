# create

`Promise.create(executor)`

Creates a new promise with an executor function that receives resolve and reject callbacks.

## Example

```ts
import { Promise } from "@monstermann/promise";

const promise = Promise.create<number>((resolve, reject) => {
    setTimeout(() => resolve(42), 1000);
});
```
