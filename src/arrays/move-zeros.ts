/**
 * https://leetcode.com/problems/move-zeroes/description/
 * 283. Move Zeroes
 * Easy
 *
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 *
 * Note that you must do this in-place without making a copy of the array.
 *
 * Example 1:
 *
 * Input: nums = [0,1,0,3,12]
 * Output: [1,3,12,0,0]
 * Example 2:
 *
 * Input: nums = [0]
 * Output: [0]
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 104
 * -231 <= nums[i] <= 231 - 1
 *
 *
 * Follow up: Could you minimize the total number of operations done?
 *
 */
function moveZeroes(nums: number[]): void {
    let firstZero = 0
    let tempElement = Infinity

    for (let current = 0; current < nums.length; current++) {
        tempElement = nums[current]
        nums[current] = 0

        if (tempElement !== 0) {
            nums[firstZero] = tempElement
            firstZero++
        }
    }
}

let nums = [0,1,0,3,12];
moveZeroes(nums)
console.log(nums)
