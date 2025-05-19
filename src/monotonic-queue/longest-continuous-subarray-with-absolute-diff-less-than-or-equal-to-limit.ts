/**
 * https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description/
 * 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
 *
 * Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.
 *
 * Example 1:
 *
 * Input: nums = [8,2,4,7], limit = 4
 * Output: 2
 * Explanation: All subarrays are:
 * [8] with maximum absolute diff |8-8| = 0 <= 4.
 * [8,2] with maximum absolute diff |8-2| = 6 > 4.
 * [8,2,4] with maximum absolute diff |8-2| = 6 > 4.
 * [8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
 * [2] with maximum absolute diff |2-2| = 0 <= 4.
 * [2,4] with maximum absolute diff |2-4| = 2 <= 4.
 * [2,4,7] with maximum absolute diff |2-7| = 5 > 4.
 * [4] with maximum absolute diff |4-4| = 0 <= 4.
 * [4,7] with maximum absolute diff |4-7| = 3 <= 4.
 * [7] with maximum absolute diff |7-7| = 0 <= 4.
 * Therefore, the size of the longest subarray is 2.
 * Example 2:
 *
 * Input: nums = [10,1,2,4,7,2], limit = 5
 * Output: 4
 * Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.
 * Example 3:
 *
 * Input: nums = [4,2,2,2,4,4,2,2], limit = 0
 * Output: 3
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 105
 * 1 <= nums[i] <= 109
 * 0 <= limit <= 109
 */

function longestSubarray(nums: number[], limit: number): number {
    let maxDeque: number[] = []
    let minDeque: number[] = []
    let left = 0
    let right = 0
    let maxLength = -Infinity

    while (right < nums.length) {
        while (maxDeque.length > 0 && nums[maxDeque[maxDeque.length - 1]] < nums[right]) {
            maxDeque.pop()
        }

        while (minDeque.length > 0 && nums[minDeque[minDeque.length - 1]] > nums[right]) {
            minDeque.pop()
        }

        maxDeque.push(right)
        minDeque.push(right)

        while (nums[maxDeque[0]] - nums[minDeque[0]] > limit) {
            if (minDeque[0] === left) {
                minDeque.shift()
            }


            if (maxDeque[0] === left) {
                maxDeque.shift()
            }

            left++
        }

        maxLength = Math.max(right - left + 1, maxLength)
        right++
    }

    return maxLength
}

console.log(longestSubarray([10,1,2,4,7,2], 5))
console.log(longestSubarray([4,2,2,2,4,4,2,2], 0))
