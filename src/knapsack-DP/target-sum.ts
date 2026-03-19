/**
 * https://leetcode.com/problems/target-sum/description/
 * 494. Target Sum
 */

function knapsack01_1D_inverted_count(
    values: number[],
    capacity: number
): number {
    const dp = new Array(capacity + 1).fill(0)
    dp[0] = 1

    for (const num of values) {
        for (let i = capacity; i >= num; i--) {
            dp[i] += dp[i - num]
        }
    }

    return dp[capacity];
}

// Intuition: https://www.sparkcodehub.com/leetcode/494/target-sum?utm_source=chatgpt.com#google_vignette
function findTargetSumWays(nums: number[], target: number): number {
    const total = nums.reduce((a,b) => a + b, 0)

    if (total + target < 0 || (total + target) % 2 !== 0) {
        return 0
    }

    const capacity = (total + target) / 2

    return knapsack01_1D_inverted_count(nums , capacity)
};