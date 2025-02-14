/**
 * https://leetcode.com/problems/3sum/description/
 * 15. 3Sum
 * 
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * 
 * Notice that the solution set must not contain duplicate triplets.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 * Explanation: 
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
 * The distinct triplets are [-1,0,1] and [-1,-1,2].
 * Notice that the order of the output and the order of the triplets does not matter.
 * Example 2:
 * 
 * Input: nums = [0,1,1]
 * Output: []
 * Explanation: The only possible triplet does not sum up to 0.
 * Example 3:
 * 
 * Input: nums = [0,0,0]
 * Output: [[0,0,0]]
 * Explanation: The only possible triplet sums up to 0.
 *  
 * 
 * Constraints:
 * 
 * 3 <= nums.length <= 3000
 * -105 <= nums[i] <= 105
 */

function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b)
    let tuples: number[][] = [];

    for (let i = 0; i < nums.length; i++) {
        let current = nums[i]

        if (i > 0 && current === nums[i - 1]) {
            continue; 
        }

        let first = i + 1
        let last = nums.length - 1

        while (first < last) {
            let sum = nums[first] + nums[last] + current 

            if (sum > 0) {
                last--
            } else if (sum < 0) {
                first++
            } else {
                tuples.push([current, nums[first], nums[last]])
                first++
                last--

                while (first < last && nums[first] === nums[first - 1]) { 
                    first++; 
                }
                while (first < last && nums[last] === nums[last + 1]) {
                    last--;
                } 
            }
        }
    }

    return tuples
};

console.log(threeSum([-1,0,1,2,-1,-4]))