/**
 * https://leetcode.com/problems/reverse-pairs/description/
 * 493. Reverse Pairs
 *
 * Given an integer array nums, return the number of reverse pairs in the array.
 *
 * A reverse pair is a pair (i, j) where:
 *
 * 0 <= i < j < nums.length and
 * nums[i] > 2 * nums[j].
 *
 *
 * Example 1:
 *
 * Input: nums = [1,3,2,3,1]
 * Output: 2
 * Explanation: The reverse pairs are:
 * (1, 4) --> nums[1] = 3, nums[4] = 1, 3 > 2 * 1
 * (3, 4) --> nums[3] = 3, nums[4] = 1, 3 > 2 * 1
 * Example 2:
 *
 * Input: nums = [2,4,3,5,1]
 * Output: 3
 * Explanation: The reverse pairs are:
 * (1, 4) --> nums[1] = 4, nums[4] = 1, 4 > 2 * 1
 * (2, 4) --> nums[2] = 3, nums[4] = 1, 3 > 2 * 1
 * (3, 4) --> nums[3] = 5, nums[4] = 1, 5 > 2 * 1
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 5 * 104
 * -231 <= nums[i] <= 231 - 1
 */

function mergeSortAndCount(nums: number[]): { sorted: number[], count: number } {
    if (nums.length <= 1) {
        return { sorted: nums, count: 0 };
    }

    const mid = Math.floor(nums.length / 2);
    const left = mergeSortAndCount(nums.slice(0, mid));
    const right = mergeSortAndCount(nums.slice(mid));

    let count = left.count + right.count;
    let j = 0;

    for (let i = 0; i < left.sorted.length; i++) {
        while (j < right.sorted.length && left.sorted[i] > 2 * right.sorted[j]) {
            j++;
        }
        count += j;
    }

    let merged: number[] = [];
    let i = 0;
    j = 0;

    while (i < left.sorted.length && j < right.sorted.length) {
        if (left.sorted[i] < right.sorted[j]) {
            merged.push(left.sorted[i++]);
        } else {
            merged.push(right.sorted[j++]);
        }
    }

    while (i < left.sorted.length) {
        merged.push(left.sorted[i++]);
    }

    while (j < right.sorted.length) {
        merged.push(right.sorted[j++]);
    }

    return { sorted: merged, count };
}

function reversePairs(nums: number[]): number {
    return mergeSortAndCount(nums).count;
}

console.log(reversePairs([1,3,2,3,1]));
