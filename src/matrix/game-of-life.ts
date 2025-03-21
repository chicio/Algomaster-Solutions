/**
 * 
 * https://leetcode.com/problems/game-of-life/description/
 * 289. Game of Life
 * 
 * According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."
 * 
 * The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):
 * 
 * Any live cell with fewer than two live neighbors dies as if caused by under-population.
 * Any live cell with two or three live neighbors lives on to the next generation.
 * Any live cell with more than three live neighbors dies, as if by over-population.
 * Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 * The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the m x n grid board. In this process, births and deaths occur simultaneously.
 * 
 * Given the current state of the board, update the board to reflect its next state.
 * 
 * Note that you do not need to return anything.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
 * Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
 * Example 2:
 * 
 * 
 * Input: board = [[1,1],[1,0]]
 * Output: [[1,1],[1,1]]
 *  
 * 
 * Constraints:
 * 
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 25
 * board[i][j] is 0 or 1.
 *  
 * 
 * Follow up:
 * 
 * Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.
 * In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause
 * problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you
 * address these problems? 
 */


/**
 Do not return anything, modify board in-place instead.
 */

 enum CellStatus {
    dead = 0,
    alive = 1,
    aliveToDead = 2,
    deadToAlive = 3
}

function gameOfLife(board: number[][]): void {
    for (let i = 0; i < board.length; i++) {
        for (let h = 0; h < board[i].length; h++) {
            
            let aliveCells = 0

            for (let k = i - 1; k <= i + 1; k++) {
                for (let j = h - 1; j <= h + 1; j++) {
                    if (k < 0 || j < 0 || k >= board.length || j >= board[i].length || (i == k && j === h)) {
                        continue
                    }

                    if (board[k][j] === CellStatus.aliveToDead || board[k][j] === CellStatus.alive) {
                        aliveCells++
                    }
                }
            }

            if ((aliveCells < 2 || aliveCells > 3) && (board[i][h] === CellStatus.alive || board[i][h] === CellStatus.aliveToDead)) {
                board[i][h] = CellStatus.aliveToDead
            } else if (aliveCells === 3 && (board[i][h] === 0 || board[i][h] === 3)) {
                board[i][h] = CellStatus.deadToAlive
            }
        }
    }

    for (let i = 0; i < board.length; i++) {
        for (let h = 0; h < board[i].length; h++) {
            board[i][h] = board[i][h] % 2
        }
    }
};


console.log(gameOfLife([[0,1,0],[0,0,1],[1,1,1],[0,0,0]]))
console.log(gameOfLife([[1,1],[1,0]]))
