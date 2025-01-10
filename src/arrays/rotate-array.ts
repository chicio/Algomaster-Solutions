/**
 * https://leetcode.com/problems/rotate-array/description/
 * 189. Rotate Array
 *
 *  Hint
 * Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
 *
 * Example 1:
 *
 * Input: nums = [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 * Explanation:
 * rotate 1 steps to the right: [7,1,2,3,4,5,6]
 * rotate 2 steps to the right: [6,7,1,2,3,4,5]
 * rotate 3 steps to the right: [5,6,7,1,2,3,4]
 * Example 2:
 *
 * Input: nums = [-1,-100,3,99], k = 2
 * Output: [3,99,-1,-100]
 * Explanation:
 * rotate 1 steps to the right: [99,-1,-100,3]
 * rotate 2 steps to the right: [3,99,-1,-100]
 */

function rotate(nums: number[], k: number): void {
    const kModulo = k % nums.length

    for(let i = 0, j = nums.length - 1; i < j; i++, j--) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }

    for(let i = 0, j = kModulo - 1; i < j; i++, j--) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }

    for(let i = kModulo, j = nums.length - 1; i < j; i++, j--) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
}

const example = [1,2,3,4,5,6,7]
rotate(example, 3)

console.log(example)
