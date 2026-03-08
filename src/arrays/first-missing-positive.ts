/**
 * https://leetcode.com/problems/first-missing-positive/description/
 * 41. First Missing Positive
 */

// Easier not in place algorithm
//
// function firstMissingPositive(nums: number[]): number {
//     let numbers = new Set<number>()
//     let max = 0
//
//     for (let i  = 0; i < nums.length; i++) {
//         let current = nums[i]
//
//         if (current > 0) {
//             numbers.add(current)
//             max = Math.max(max, current)
//         }
//     }
//
//     for(let i = 1; i < max; i++) {
//         if (!numbers.has(i)) {
//             return i
//         }
//     }
//
//     return max + 1
// };

function firstMissingPositive(nums: number[]): number {
    /// https://en.wikipedia.org/wiki/Cycle_sort
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] > 0 && nums[i] <= nums.length && nums[i] !== nums[nums[i] - 1]) {
            let temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            return i + 1
        }
    }

    return nums.length + 1
};

console.log(firstMissingPositive([7,8,9,11,12]))
console.log(firstMissingPositive([3,4,-1,1]))
