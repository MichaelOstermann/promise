# queue

```ts
function Promise.queue(options: QueueOptions): Queue
```

Creates a queue that limits concurrent execution of tasks.

## Example

```ts
import { Promise } from "@monstermann/promise";

const taskQueue = Promise.queue({ concurrency: 2 });
const taskQueue2 = Promise.queue(2); // shorthand

const results = await Promise.all([
    // At most 2 fetch calls are executed at any time
    taskQueue.add(() => fetchData(1)),
    taskQueue.add(() => fetchData(2)),
    taskQueue.add(() => fetchData(3)),
]);

// Wait for queue to become idle
await taskQueue.idle();
```
