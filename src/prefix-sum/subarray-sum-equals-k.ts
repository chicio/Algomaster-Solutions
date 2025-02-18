/**
 * 
 * https://leetcode.com/problems/subarray-sum-equals-k/description/
 * 560. Subarray Sum Equals K
 * Solved
 * Medium
 * Topics
 * Companies
 * Hint
 * Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
 * 
 * A subarray is a contiguous non-empty sequence of elements within an array.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [1,1,1], k = 2
 * Output: 2
 * Example 2:
 * 
 * Input: nums = [1,2,3], k = 3
 * Output: 2
 *  
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 2 * 104
 * -1000 <= nums[i] <= 1000
 * -107 <= k <= 107
 */

function subarraySum(nums: number[], k: number): number {
    let prefixSum = 0;
    let subarrays = 0
    let previousPrefixSum = new Map<number, number>()

    previousPrefixSum.set(0, 1)

    for (let i = 0; i < nums.length; i++) {
        prefixSum = prefixSum + nums[i] 

        if (previousPrefixSum.has(prefixSum - k)) {
            subarrays = subarrays + previousPrefixSum.get(prefixSum - k)!
        } 
          
        previousPrefixSum.set(prefixSum,  (previousPrefixSum.get(prefixSum) || 0) + 1)
    }

    return subarrays
};

console.log(subarraySum([1,2,3,1,1,1,2,3], 3))

