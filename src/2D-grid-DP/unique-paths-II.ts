/**
 * https://leetcode.com/problems/unique-paths-ii/
 * 63. Unique Paths II
 */

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length
    const n = obstacleGrid[0].length
    const dp: number[][] = Array.from({ length: m }, () => 
        Array.from({ length: n }, () => 0)
    );

    if (obstacleGrid[m - 1][n - 1] === 1) {
        return 0
    }

    dp[m - 1][n - 1] = 1

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if(obstacleGrid[i][j] === 1) {
                dp[i][j] = 0
            } else {
                if (i === m - 1 && j === n - 1) {
                    continue
                }

                const down = i + 1 < m ? dp[i + 1][j] : 0
                const right = j + 1 < n ? dp[i][j + 1] : 0

                dp[i][j] = down + right
            }
        }
    }

    return dp[0][0]
};