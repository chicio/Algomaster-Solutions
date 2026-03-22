/**
 * https://leetcode.com/problems/coin-change-ii/description/
 * 518. Coin Change II
 */

function knapsackUnboundCombinations(values: number[], capacity: number) {
    const dp = Array(capacity + 1).fill(0)
    dp[0] = 1

    for (const value of values) {
        for (let i = value; i <= capacity; i++) {
            dp[i] += dp[i - value]
        }
    }

    return dp[capacity]
}

function change(amount: number, coins: number[]): number {
    return knapsackUnboundCombinations(coins, amount)
};