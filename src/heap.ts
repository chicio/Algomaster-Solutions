export class MinHeap {
    private readonly heap: number[] = []

    constructor() { }

    size(): number {
        return this.heap.length;
    }

    peek(): number | null {
        return this.heap.length > 0
            ? this.heap[0]
            : null;
    }

    insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    extractMin(): number | null {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop()!;
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();

        return min;
    }

    private bubbleUp(): void {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[index] >= this.heap[parentIndex]) {
                break;
            }

            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    private bubbleDown(): void {
        let index = 0;

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallest = index;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
                smallest = leftChildIndex;
            }

            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
                smallest = rightChildIndex;
            }

            if (smallest === index) {
                break;
            }

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

export class MaxHeap {
    private readonly heap: number[] = []

    constructor() { }

    size(): number {
        return this.heap.length;
    }

    peek(): number | null {
        return this.heap.length > 0
            ? this.heap[0]
            : null;
    }

    insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    extractMax(): number | null {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop()!;
        }

        const max = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();

        return max;
    }

    private bubbleUp(): void {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[index] <= this.heap[parentIndex]) {
                break;
            }

            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    private bubbleDown(): void {
        let index = 0;

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let largest = index;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largest]) {
                largest = leftChildIndex;
            }

            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largest]) {
                largest = rightChildIndex;
            }

            if (largest === index) {
                break;
            }

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}
