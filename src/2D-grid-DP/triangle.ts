/**
 * https://leetcode.com/problems/triangle/description/
 * 120. Triangle
 */

function minimumTotal(triangle: number[][]): number {
    const m = triangle.length
    const dp = triangle.map(row => [...row])

    for (let i = m - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            const down = dp[i + 1][j]
            const right = dp[i + 1][j + 1]

            dp[i][j] = triangle[i][j] + Math.min(down, right)
        }
    }

    return dp[0][0]    
};