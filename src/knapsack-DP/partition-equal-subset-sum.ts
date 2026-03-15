/**
 * https://leetcode.com/problems/partition-equal-subset-sum/description/
 * 416. Partition Equal Subset Sum
 */

function knapsack01_1D(
    values: number[],
    capacity: number
): boolean {
    const dp = new Array(capacity + 1).fill(false)
    dp[0] = true

    for (const num of values) {
        for (let i = capacity; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num]
        }
    }

    return dp[capacity];
}

function canPartition(nums: number[]): boolean {
    const target = nums.reduce((a,b) => a + b, 0)

    if (target % 2 !== 0) {
        return false;
    }

    return knapsack01_1D(nums, target / 2)
};