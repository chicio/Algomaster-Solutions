/**
 * https://leetcode.com/problems/subarray-sums-divisible-by-k/description/
 * 974. Subarray Sums Divisible by K
 * 
 * Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.
 * 
 * A subarray is a contiguous part of an array.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [4,5,0,-2,-3,1], k = 5
 * Output: 7
 * Explanation: There are 7 subarrays with a sum divisible by k = 5:
 * [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
 * Example 2:
 * 
 * Input: nums = [5], k = 9
 * Output: 0
 *  
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 3 * 104
 * -104 <= nums[i] <= 104
 * 2 <= k <= 104
 */

function subarraysDivByK(nums: number[], k: number): number {
    let prefixSum = 0;
    let subarrays = 0
    let previousPrefixSum = new Map<number, number>()

    previousPrefixSum.set(0, 1)

    for (let i = 0; i < nums.length; i++) {
        prefixSum = prefixSum + nums[i] 
        let remainder = prefixSum % k;

        if (remainder < 0) { 
            remainder += k;
        }

        if (previousPrefixSum.has(remainder)) {
            subarrays = subarrays + previousPrefixSum.get(remainder)!
        } 
          
        previousPrefixSum.set(remainder, (previousPrefixSum.get(remainder) || 0) + 1)
    }

    return subarrays    
};

console.log(subarraysDivByK([4,5,0,-2,-3,1], 5))