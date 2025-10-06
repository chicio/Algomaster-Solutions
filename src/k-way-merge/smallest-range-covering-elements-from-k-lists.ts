/**
 * https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/description/
 * 632. Smallest Range Covering Elements from K Lists
 *
 * You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.
 *
 * We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
 * Output: [20,24]
 * Explanation: 
 * List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
 * List 2: [0, 9, 12, 20], 20 is in range [20,24].
 * List 3: [5, 18, 22, 30], 22 is in range [20,24].
 * Example 2:
 * 
 * Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
 * Output: [1,1]
 *  
 * 
 * Constraints:
 * 
 * nums.length == k
 * 1 <= k <= 3500
 * 1 <= nums[i].length <= 50
 * -105 <= nums[i][j] <= 105
 * nums[i] is sorted in non-decreasing order.
 */

import { Heap } from "../heap";

interface Entry {
  value: number;
  listIndex: number;
  elementIndex: number;
}

function smallestRange(nums: number[][]): number[] {
  const heap = new Heap<Entry>((a, b) => a.value - b.value);
  let currentMax = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i][0];
    heap.insert({ value: val, listIndex: i, elementIndex: 0 });
    currentMax = Math.max(currentMax, val);
  }
  
  let bestRange = [-Infinity, Infinity];

  while (heap.size() === nums.length) {
    const minEntry = heap.extract()!;
    const currentMin = minEntry.value;

    if (currentMax - currentMin < bestRange[1] - bestRange[0]) {
      bestRange = [currentMin, currentMax];
    }

    const nextIndex = minEntry.elementIndex + 1;

    if (nextIndex < nums[minEntry.listIndex].length) {
      const nextVal = nums[minEntry.listIndex][nextIndex];
      heap.insert({ value: nextVal, listIndex: minEntry.listIndex, elementIndex: nextIndex });
      currentMax = Math.max(currentMax, nextVal);
    } else {
      break;
    }
  }

  return bestRange;
}

console.log(smallestRange([[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]));