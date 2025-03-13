/**
 * https://leetcode.com/problems/number-of-good-pairs
 * 1512. Number of Good Pairs
 * Given an array of integers nums, return the number of good pairs.
 * 
 * A pair (i, j) is called good if nums[i] == nums[j] and i < j.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [1,2,3,1,1,3]
 * Output: 4
 * Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
 * Example 2:
 * 
 * Input: nums = [1,1,1,1]
 * Output: 6
 * Explanation: Each pair in the array are good.
 * Example 3:
 * 
 * Input: nums = [1,2,3]
 * Output: 0
 *  
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 100
 * 1 <= nums[i] <= 100
 */

function numIdenticalPairs(nums: number[]): number {
    const numbersCount = new Map<number, number>()
    let countGoodPairs = 0

    for (let i = 0; i < nums.length; i++) {
        if (numbersCount.has(nums[i])) {
            countGoodPairs = countGoodPairs + numbersCount.get(nums[i])!
        }

        numbersCount.set(nums[i], (numbersCount.get(nums[i]) || 0) + 1);
    }

    return countGoodPairs
};

console.log(numIdenticalPairs([1,2,3,1,1,3]))