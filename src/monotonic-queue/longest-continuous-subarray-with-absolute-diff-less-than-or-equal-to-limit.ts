/**
 * https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description/
 * 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
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
