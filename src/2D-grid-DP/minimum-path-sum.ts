/**
 * https://leetcode.com/problems/minimum-path-sum/
 * 64. Minimum Path Sum
 */

function minPathSum(grid: number[][]): number {
    const m = grid.length
    const n = grid[0].length
    const dp: number[][] = Array.from({ length: m }, () => 
        Array.from({ length: n }, () => 0)
    );

    dp[m - 1][n - 1] = grid[m - 1][n - 1]

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i === m - 1 && j === n - 1) {
                continue
            }

            const down = i + 1 < m ? dp[i + 1][j] : Infinity
            const right = j + 1 < n ? dp[i][j + 1] : Infinity

            dp[i][j] = grid[i][j] + Math.min(down, right)
        }
    }

    return dp[0][0]
};

console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])) // 7