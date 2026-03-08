/**
 * https://leetcode.com/problems/surrounded-regions/description/
 * 130. Surrounded Regions
 */

function dfsRegions(row: number, column: number, board: string[][]) {
    if (!board[row] || !board[row][column] || board[row][column] === 'X' || board[row][column] === 'T') {
        return
    }

    if (board[row][column] === 'O') {
        board[row][column] = 'T'
    }

    dfsRegions(row, column - 1, board)
    dfsRegions(row - 1, column, board)
    dfsRegions(row, column + 1, board)
    dfsRegions(row + 1, column, board)
}

function deleteSafeO(board: string[][], rows: number, columns: number) {
    for (let i = 0; i < rows; i++) {
        for (let k = 0; k < columns; k++) {
            if (board[i][k] === 'O') {
                board[i][k] = 'X'
            }

            if (board[i][k] === 'T') {
                board[i][k] = 'O'
            }        
        }
    }
}

function solve(board: string[][]): void {
    const rows = board.length
    const columns = board[0].length

    for (let c = 0; c < columns; c++) {
        dfsRegions(0, c, board)
        dfsRegions(rows - 1, c, board)
    }

    for (let r = 0; r < rows; r++) {
        dfsRegions(r, 0, board)
        dfsRegions(r, columns - 1, board)
    }

    deleteSafeO(board, rows, columns)
}

console.log(solve([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]))