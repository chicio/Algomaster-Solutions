/**
 * https://leetcode.com/problems/sliding-window-median/description/
 * 480. Sliding Window Median
 */

import {Heap} from "../heap";

function medianSlidingWindow(nums: number[], k: number): number[] {
    const maxHeap = new Heap<number>((a, b) => b - a); // left half
    const minHeap = new Heap<number>((a, b) => a - b); // right half
    const delayed = new Map<number, number>();

    const result: number[] = [];

    let leftSize = 0;
    let rightSize = 0;

    function prune(heap: Heap<number>): void {
        while (heap.size() > 0) {
            const top = heap.peek()!;
            if (delayed.has(top)) {
                delayed.set(top, delayed.get(top)! - 1);
                if (delayed.get(top)! === 0) {
                    delayed.delete(top);
                }
                heap.extract();
            } else {
                break;
            }
        }
    }

    function rebalance(): void {
        if (leftSize > rightSize + 1) {
            minHeap.insert(maxHeap.extract()!);
            leftSize--;
            rightSize++;
            prune(maxHeap);
        } else if (leftSize < rightSize) {
            maxHeap.insert(minHeap.extract()!);
            leftSize++;
            rightSize--;
            prune(minHeap);
        }
    }

    function getMedian(): number {
        if (k % 2 === 1) {
            return maxHeap.peek()!;
        }
        return (maxHeap.peek()! + minHeap.peek()!) / 2;
    }

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];

        if (maxHeap.size() === 0 || num <= maxHeap.peek()!) {
            maxHeap.insert(num);
            leftSize++;
        } else {
            minHeap.insert(num);
            rightSize++;
        }

        rebalance();

        if (i >= k - 1) {
            result.push(getMedian());

            const outgoing = nums[i - k + 1];
            delayed.set(outgoing, (delayed.get(outgoing) ?? 0) + 1);

            if (outgoing <= maxHeap.peek()!) {
                leftSize--;
                if (outgoing === maxHeap.peek()) prune(maxHeap);
            } else {
                rightSize--;
                if (outgoing === minHeap.peek()) prune(minHeap);
            }

            rebalance();
        }
    }

    return result;
}

console.log(medianSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
