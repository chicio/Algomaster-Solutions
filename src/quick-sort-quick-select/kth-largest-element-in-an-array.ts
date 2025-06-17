/**
 * https://leetcode.com/problems/kth-largest-element-in-an-array/description/
 * 215. Kth Largest Element in an Array
 *
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 *
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 *
 * Can you solve it without sorting?
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * Example 2:
 *
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 *
 *
 * Constraints:
 *
 * 1 <= k <= nums.length <= 105
 * -104 <= nums[i] <= 104
 */

/// Solution with min heap
import {MinHeap} from "../heap";

function findKthLargest(nums: number[], k: number): number {
    let heap = new MinHeap()

    for (const num of nums) {
        heap.insert(num)

        if(heap.size() > k) {
            heap.extractMin()
        }
    }

    return heap.peek()!
}

console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4))

/// Solution using Quick Select algorithm
function partition(nums: number[], left: number, right: number, pivotIndex: number) {
    const pivot = nums[pivotIndex];
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

    let partitionIndex = left

    for (let i = left; i < right; i++) {
        if (nums[i] < pivot) {
            [nums[partitionIndex], nums[i]] = [nums[i], nums[partitionIndex]]
            partitionIndex++
        }
    }

    [nums[partitionIndex], nums[right]] = [nums[right], nums[partitionIndex]]

    return partitionIndex
}

function quickSelect(nums: number[], left: number, right: number, k: number): number {
    if (left === right) {
        return nums[left];
    }

    const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left
    const pivot = nums[pivotIndex];
    const partitionIndex = partition(nums, left, right, pivotIndex)

    if (partitionIndex > k) {
        return quickSelect(nums, left, partitionIndex - 1, k)
    } else if (partitionIndex < k) {
        return quickSelect(nums, partitionIndex + 1, right, k)
    } else {
        return nums[partitionIndex]
    }
}

function findKthLargestQS(nums: number[], k: number): number {
    let realK = nums.length - k

    return quickSelect(nums, 0, nums.length - 1, realK)
};
