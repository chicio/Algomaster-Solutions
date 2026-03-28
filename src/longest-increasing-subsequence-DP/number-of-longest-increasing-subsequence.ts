/**
 * https://leetcode.com/problems/number-of-longest-increasing-subsequence/description/
 * 673. Number of Longest Increasing Subsequence
 */


function findNumberOfLIS(nums: number[]): number {
    const results = Array(nums.length).fill(1)
    const resultsCount = Array(nums.length).fill(1)

    for (let i = nums.length - 1; i >= 0; i--) {
        for (let k = nums.length - 1; k > i; k--) {
            if (nums[k] > nums[i]) {
                if (1 + results[k] > results[i]) {
                    results[i] = 1 + results[k]
                    resultsCount[i] = resultsCount[k]
                } else if (1 + results[k] === results[i]) {
                    resultsCount[i] += resultsCount[k]
                }
            }
        }
    }

    const maxLen = Math.max(...results)
    let count = 0

    for (let i = 0; i < results.length; i++) {
        if (results[i] === maxLen) {
            count += resultsCount[i]
        }
    }

    return count
};