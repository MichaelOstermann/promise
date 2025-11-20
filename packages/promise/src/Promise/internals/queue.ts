interface Node<T> {
    next: Node<T> | undefined
    value: T
}

interface Queue<T> {
    head: Node<T> | undefined
    size: number
    tail: Node<T> | undefined
}

export function createQueue<T>(): Queue<T> {
    return {
        head: undefined,
        size: 0,
        tail: undefined,
    }
}

export function enqueue<T>(queue: Queue<T>, value: T): void {
    const node: Node<T> = { next: undefined, value }
    if (queue.head) {
        queue.tail!.next = node
        queue.tail = node
    }
    else {
        queue.head = queue.tail = node
    }
    queue.size++
}

export function dequeue<T>(queue: Queue<T>): T | undefined {
    const current = queue.head
    if (!current) return undefined
    queue.head = current.next
    if (!queue.head) queue.tail = undefined
    queue.size--
    return current.value
}
