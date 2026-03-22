/**
 * https://leetcode.com/problems/perfect-squares/description/
 * 279. Perfect Squares
 */

function knapsackUnboundMinimizeGenerated(values: number[], capacity: number) {
    const dp = Array(capacity + 1).fill(Infinity)
    dp[0] = 0

    for (const value of values) {
        for (let i = value; i <= capacity; i++) {
            dp[i] = Math.min(dp[i], 1 + dp[i - value])
        }
    }

    return dp[capacity] === Infinity ? -1 : dp[capacity]
}

function numSquares(n: number): number {
    const generatedSquares = []

    for (let i = 1; i * i <= n; i++) {
        generatedSquares.push(i * i)
    }

    return knapsackUnboundMinimizeGenerated(generatedSquares, n)
};