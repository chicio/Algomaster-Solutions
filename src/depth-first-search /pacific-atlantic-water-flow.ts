/**
 * https://leetcode.com/problems/pacific-atlantic-water-flow/
 * 417. Pacific Atlantic Water Flow
 */

function dfsOcean(
    row: number,
    column: number,
    heights: number[][],
    reachable: boolean[][]
) {
    if (reachable[row][column]) {
        return
    } 

    reachable[row][column] = true

    const rows = heights.length
    const cols = heights[0].length
    const currentHeight = heights[row][column]

    if (row - 1 >= 0) {
        if (heights[row - 1][column] >= currentHeight) {
            dfsOcean(row - 1, column, heights, reachable)
        }
    }

    if (row + 1 < rows) {
        if (heights[row + 1][column] >= currentHeight) {
            dfsOcean(row + 1, column, heights, reachable)
        }
    }

    if (column - 1 >= 0) {
        if (heights[row][column - 1] >= currentHeight) {
            dfsOcean(row, column - 1, heights, reachable)
        }
    }

    if (column + 1 < cols) {
        if (heights[row][column + 1] >= currentHeight) {
            dfsOcean(row, column + 1, heights, reachable)
        }
    }
}

function pacificAtlantic(heights: number[][]): number[][] {
    const rows = heights.length
    const columns = heights[0].length
    const reachablePacific: boolean[][] = Array.from(
        Array(heights.length), _ => Array(heights[0].length).fill(false)
    )
    const reachableAtlantic: boolean[][] = Array.from(
        Array(heights.length), _ => Array(heights[0].length).fill(false)
    )

    for (let c = 0; c < columns; c++) {
        dfsOcean(0, c, heights, reachablePacific)
        dfsOcean(rows - 1, c, heights, reachableAtlantic)
    }

    for (let r = 0; r < rows; r++) {
        dfsOcean(r, 0, heights, reachablePacific)
        dfsOcean(r, columns - 1, heights, reachableAtlantic)
    }

    const results = []

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (reachablePacific[i][j] && reachableAtlantic[i][j]) {
                results.push([i, j])
            }
        }
    }

    return results
};