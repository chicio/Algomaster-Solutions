/**
 * https://leetcode.com/problems/n-queens/description/
 * 51. N-Queens
 *
 * The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
 *
 * Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
 *
 * Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: n = 4
 * Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
 * Example 2:
 *
 * Input: n = 1
 * Output: [["Q"]]
 *
 *
 * Constraints:
 *
 * 1 <= n <= 9
 */

function isValid(row: number, col: number, board: string[][]): boolean {
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') {
            return false;
        }
    }

    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') {
            return false;
        }
    }

    for (let i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
        if (board[i][j] === 'Q') {
            return false;
        }
    }

    return true;
};

function backtrackNQueens(results: string[][], board: string[][], row: number) {
    if (row === board.length) {
        results.push([...board.map(row => row.join(""))])
        return
    }

    for (let col = 0; col < board.length; col++) {
        if (isValid(row, col, board)) {
            board[row][col] = 'Q'
            backtrackNQueens(results, board, row + 1);
            board[row][col] = '.'
        }
    }
}

function solveNQueens(n: number): string[][] {
    const results: string[][] = []
    const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'));
    backtrackNQueens(results, board, 0)
    return results
}

console.log(solveNQueens(4)); // [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
