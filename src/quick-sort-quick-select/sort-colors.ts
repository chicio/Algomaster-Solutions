/**
 * 
 * https://leetcode.com/problems/sort-colors/description/
 * 75. Sort Colors
 * 
 * Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
 * 
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 * 
 * You must solve this problem without using the library's sort function.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 * Example 2:
 * 
 * Input: nums = [2,0,1]
 * Output: [0,1,2]
 *  
 * 
 * Constraints:
 * 
 * n == nums.length
 * 1 <= n <= 300
 * nums[i] is either 0, 1, or 2.
 *  
 * 
 * Follow up: Could you come up with a one-pass algorithm using only constant extra space?
 */

 function sortColors(nums: number[]): void {
    let colorsCount: Record<number, number> = {
        0: 0,
        1: 0,
        2: 0
    }

    for (let i = 0; i < nums.length; i++) {
        colorsCount[nums[i]] = colorsCount[nums[i]] + 1
    }

    for (let i = 0; i < colorsCount[0]; i++) {
        nums[i] = 0
    }

    for (let i = colorsCount[0]; i < colorsCount[0] + colorsCount[1]; i++) {
        nums[i] = 1
    }

    for (let i = colorsCount[0] + colorsCount[1]; i < nums.length; i++) {
        nums[i] = 2
    }
};

console.log(sortColors([2,0,2,1,1,0]))