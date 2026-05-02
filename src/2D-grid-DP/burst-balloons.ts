/**
 * https://leetcode.com/problems/burst-balloons/submissions/1993246851/
 * 312. Burst Balloons
 */

function maxCoins(nums: number[]): number {
    const n = nums.length
    const arr = [1, ...nums, 1]
    const dp = Array.from({ length: n + 2 }, () =>
        Array(n + 2).fill(0)
    )

    for (let len = 2; len < n + 2; len++) {
        for (let left = 0; left + len < n + 2; left++) {
            const right = left + len

            for (let k = left + 1; k < right; k++) {
                dp[left][right] = Math.max(
                    dp[left][right],
                    dp[left][k] +
                    dp[k][right] +
                    arr[left] * arr[k] * arr[right]
                )
            }
        }
    }

    return dp[0][n + 1]
}