/**
 * https://leetcode.com/problems/contiguous-array/description/
 * 525. Contiguous Array
 * Solved
 * Medium
 * Topics
 * Companies
 * Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [0,1]
 * Output: 2
 * Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
 * Example 2:
 * 
 * Input: nums = [0,1,0]
 * Output: 2
 * Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
 *  
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 105
 * nums[i] is either 0 or 1.
 * 
 */

function findMaxLength(nums: number[]): number {
    let prefixSum = 0;
    let maxSubarray = 0
    let previousPrefixSum = new Map<number, number>()

    previousPrefixSum.set(0, -1)

    for (let i = 0; i < nums.length; i++) {
        prefixSum = prefixSum + (nums[i] === 0 ? -1 : 1)

        if (previousPrefixSum.has(prefixSum)) {
            maxSubarray = Math.max(maxSubarray, i - previousPrefixSum.get(prefixSum)!)
        } 
          
        if (!previousPrefixSum.has(prefixSum)) {
            previousPrefixSum.set(prefixSum, i)
        } 
    }

    return maxSubarray    
};

console.log(findMaxLength([0, 0, 1, 0, 1, 0, 0, 0]))