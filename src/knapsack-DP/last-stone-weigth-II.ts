/**
 * https://leetcode.com/problems/last-stone-weight-ii/description/
 * 1049. Last Stone Weight II
 */

function knapsack01_1D(
    values: number[],
    capacity: number
): number {
    const dp = new Array(capacity + 1).fill(0)
    dp[0] = 0

    for (const num of values) {
        for (let i = capacity; i >= num; i--) {
            dp[i] = Math.max(
                dp[i],
                num + dp[i - num]
            )
        }
    }

    console.log(dp)

    return dp[capacity];
}

function lastStoneWeightII(stones: number[]): number {
    const total = stones.reduce((stone, anotherStone) => stone + anotherStone, 0)
    const target = Math.floor(total / 2)
    const best = knapsack01_1D(stones, target)

    return total - 2 * best
};