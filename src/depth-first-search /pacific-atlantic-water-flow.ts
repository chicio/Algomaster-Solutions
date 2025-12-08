/**
 * https://leetcode.com/problems/pacific-atlantic-water-flow/
 * 417. Pacific Atlantic Water Flow
 * 
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
 * 
 * The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
 * 
 * The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
 * 
 * Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
 * Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
 * Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
 * [0,4]: [0,4] -> Pacific Ocean 
 *        [0,4] -> Atlantic Ocean
 * [1,3]: [1,3] -> [0,3] -> Pacific Ocean 
 *        [1,3] -> [1,4] -> Atlantic Ocean
 * [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
 *        [1,4] -> Atlantic Ocean
 * [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
 *        [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
 * [3,0]: [3,0] -> Pacific Ocean 
 *        [3,0] -> [4,0] -> Atlantic Ocean
 * [3,1]: [3,1] -> [3,0] -> Pacific Ocean 
 *        [3,1] -> [4,1] -> Atlantic Ocean
 * [4,0]: [4,0] -> Pacific Ocean 
 *        [4,0] -> Atlantic Ocean
 * Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
 * Example 2:
 * 
 * Input: heights = [[1]]
 * Output: [[0,0]]
 * Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
 *  
 * 
 * Constraints:
 * 
 * m == heights.length
 * n == heights[r].length
 * 1 <= m, n <= 200
 * 0 <= heights[r][c] <= 105
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