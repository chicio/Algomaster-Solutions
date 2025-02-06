/**
 * https://leetcode.com/problems/longest-consecutive-sequence/description/
 * 128. Longest Consecutive Sequence
 *
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
 * 
 * You must write an algorithm that runs in O(n) time.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [100,4,200,1,3,2]
 * Output: 4
 * Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
 * Example 2:
 * 
 * Input: nums = [0,3,7,2,5,8,4,6,0,1]
 * Output: 9
 *  
 * 
 * Constraints:
 * 
 * 0 <= nums.length <= 105
 * -109 <= nums[i] <= 109
 */

function longestConsecutive(nums: number[]): number {
    let numbers = new Set<number>(nums)
    let count = 0
    let maxCount = 0

    for(let num of numbers.values()) {
        if (!numbers.has(num - 1)) {
            let current = num
            count = 1
            
            while (numbers.has(current + 1)) {
                current++
                count++
            }

            maxCount = Math.max(maxCount, count)
        }
    }

    return maxCount
};

console.log(longestConsecutive([100,4,200,1,3,2]))