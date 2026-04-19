/**
 * https://leetcode.com/problems/count-square-submatrices-with-all-ones/
 * 1277. Count Square Submatrices with All Ones
 */

function countSquares(matrix: number[][]): number {
    const m = matrix.length
    const n = matrix[0].length

    const dp = Array.from({ length: m }, () => Array(n).fill(0))
    let result = 0

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            if (matrix[i][j] === 1) {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j],
                        dp[i][j - 1],
                        dp[i - 1][j - 1]
                    ) + 1
                }

                result += dp[i][j]
            }
        }
    }

    return result
}