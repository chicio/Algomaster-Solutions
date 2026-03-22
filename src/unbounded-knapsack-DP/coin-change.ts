/**
 * https://leetcode.com/problems/coin-change/description/
 * 322. Coin Change
 */

function knapsackUnboundMinimize(values: number[], capacity: number) {
    const dp = Array(capacity + 1).fill(Infinity)
    dp[0] = 0

    for (const value of values) {
        for (let i = value; i <= capacity; i++) {
            dp[i] = Math.min(dp[i], 1 + dp[i - value])
        }
    }

    return dp[capacity] === Infinity ? -1 : dp[capacity]
}

function coinChange(coins: number[], amount: number): number {
    return knapsackUnboundMinimize(coins, amount)
};