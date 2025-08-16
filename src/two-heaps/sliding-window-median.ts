/**
 * https://leetcode.com/problems/sliding-window-median/description/
 * 480. Sliding Window Median
 *
 * The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.
 *
 * For examples, if arr = [2,3,4], the median is 3.
 * For examples, if arr = [1,2,3,4], the median is (2 + 3) / 2 = 2.5.
 * You are given an integer array nums and an integer k. There is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
 *
 * Return the median array for each window in the original array. Answers within 10-5 of the actual value will be accepted.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
 * Explanation:
 * Window position                Median
 * ---------------                -----
 * [1  3  -1] -3  5  3  6  7        1
 *  1 [3  -1  -3] 5  3  6  7       -1
 *  1  3 [-1  -3  5] 3  6  7       -1
 *  1  3  -1 [-3  5  3] 6  7        3
 *  1  3  -1  -3 [5  3  6] 7        5
 *  1  3  -1  -3  5 [3  6  7]       6
 * Example 2:
 *
 * Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
 * Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]
 *
 *
 * Constraints:
 *
 * 1 <= k <= nums.length <= 105
 * -231 <= nums[i] <= 231 - 1
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
