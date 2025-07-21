type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> {
    private readonly heap: T[] = [];
    private readonly compare: Comparator<T>;

    constructor(compare: Comparator<T>) {
        this.compare = compare;
    }

    size(): number {
        return this.heap.length;
    }

    peek(): T | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    insert(value: T): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    extract(): T | null {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop()!;

        const top = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();

        return top;
    }

    private bubbleUp(): void {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;

            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    private bubbleDown(): void {
        let index = 0;

        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;

            if (left < this.heap.length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }

            if (right < this.heap.length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
