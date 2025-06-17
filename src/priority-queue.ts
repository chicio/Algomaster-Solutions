type Comparator<T> = (a: T, b: T) => number;

export class PriorityQueue<T> {
    private heap: T[] = [];

    constructor(
        private compare: Comparator<T>
    ) {}

    size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    enqueue(value: T): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    dequeue(): T | undefined {
        if (this.size() === 0) return undefined;
        if (this.size() === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();
        return top;
    }

    peek(): T | undefined {
        return this.heap[0];
    }

    private bubbleUp(): void {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
                break;
            }

            [this.heap[index], this.heap[parentIndex]] =
                [this.heap[parentIndex], this.heap[index]];

            index = parentIndex;
        }
    }

    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;

            if (
                left < length &&
                this.compare(this.heap[left], this.heap[smallest]) < 0
            ) {
                smallest = left;
            }

            if (
                right < length &&
                this.compare(this.heap[right], this.heap[smallest]) < 0
            ) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] =
                [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
