/**
 * https://leetcode.com/problems/kth-largest-element-in-a-stream/description/
 * 703. Kth Largest Element in a Stream
 */
  
import { Heap } from "../heap";
  
class KthLargest {
    private minHeap = new Heap<number>((a, b) => a - b);

    constructor(
        private readonly k: number, 
        nums: number[]
    ) {
        for (const num of nums) {
            this.addToHeap(num, k)
        }
    }

    add(val: number): number {
        this.addToHeap(val, this.k)
        return this.minHeap.peek()!
    }

    private addToHeap(num: number, k: number) {
        this.minHeap.insert(num)

        if (this.minHeap.size() > k) {
            this.minHeap.extract()
        }        
    }
}