/**
 * https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/description/
 * 632. Smallest Range Covering Elements from K Lists
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