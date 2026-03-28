/**
 * https://leetcode.com/problems/longest-increasing-subsequence/description/
 * 300. Longest Increasing Subsequence
 */

function lengthOfLIS(nums: number[]): number {
    const results = Array(nums.length).fill(1)

    for (let i = nums.length - 1; i >= 0; i--) {
        for (let k = nums.length - 1; k > i; k--) {
            if (nums[k] > nums[i]) {
                results[i] = Math.max(results[i], 1 + results[k])
            }
        }
    }

    return Math.max(...results)
};
