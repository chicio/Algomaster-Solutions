/**
 * https://leetcode.com/problems/find-median-from-data-stream/description/
 * 295. Find Median from Data Stream
 */

import {Heap} from "../heap";

class MedianFinder {
    private minHeap = new Heap<number>((a,b) => a - b)
    private maxHeap = new Heap<number>((a,b) => b - a)

    addNum(num: number): void {
        if (this.maxHeap.size() === 0 || num <= this.maxHeap.peek()!) {
            this.maxHeap.insert(num)
        } else {
            this.minHeap.insert(num)
        }

        if (this.maxHeap.size() > this.minHeap.size() + 1 ) {
            this.minHeap.insert(this.maxHeap.extract()!)
        }

        if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.insert(this.minHeap.extract()!);
        }
    }

    findMedian(): number {
        if (this.maxHeap.size() === this.minHeap.size()) {
            return (this.maxHeap.peek()! + this.minHeap.peek()!) / 2
        }

        return this.maxHeap.peek()!
    }
}
