
/**
 * 
 * https://leetcode.com/problems/making-a-large-island/description/
 * 827. Making A Large Island
 * Solved
 * Hard
 * 
 * Topics
 * premium lock icon
 * Companies
 * You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.
 * 
 * Return the size of the largest island in grid after applying this operation.
 * 
 * An island is a 4-directionally connected group of 1s.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: grid = [[1,0],[0,1]]
 * Output: 3
 * Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
 * Example 2:
 * 
 * Input: grid = [[1,1],[1,0]]
 * Output: 4
 * Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
 * Example 3:
 * 
 * Input: grid = [[1,1],[1,1]]
 * Output: 4
 * Explanation: Can't change any 0 to 1, only one island with area = 4.
 *  
 * 
 * Constraints:
 * 
 * n == grid.length
 * n == grid[i].length
 * 1 <= n <= 500
 * grid[i][j] is either 0 or 1.
 */

function dfsArea(row: number, column: number, grid: number[][], label: number): number {
    if (!grid[row] || !grid[row][column] || grid[row][column] != 1) {
        return 0
    }

    grid[row][column] = label
    let area = 1

    area += dfsArea(row, column - 1, grid, label)
    area += dfsArea(row - 1, column, grid, label)
    area += dfsArea(row, column + 1, grid, label)
    area += dfsArea(row + 1, column, grid, label)

    return area
}

function largestIsland(grid: number[][]): number {
    let label = 2
    let areas = new Map<number, number>
    let rows = grid.length
    let columns = grid[0].length

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (grid[i][j] === 1) {
                let area = dfsArea(i, j, grid, label)
                areas.set(label, area)
                label++
            }
        }
    }

    let sumOfAreas = 0

    for (const area of areas.values()) {
        sumOfAreas = sumOfAreas + area
    }

    if (rows * columns === sumOfAreas) {
        return sumOfAreas
    }

    let maxArea = 0

    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            if (grid[row][column] === 0) {
                let seen = new Set<number>()
                let leftArea = grid[row] && grid[row][column - 1] ? seen.add(grid[row][column - 1]) ?? 0 : 0
                let topArea = grid[row - 1] && grid[row - 1][column] ? seen.add(grid[row - 1][column]) ?? 0 : 0
                let rightArea = grid[row] && grid[row][column + 1] ? seen.add(grid[row][column + 1]) ?? 0 : 0
                let bottomArea = grid[row + 1] && grid[row + 1][column] ? seen.add(grid[row + 1][column]) ?? 0 : 0
                
                let area = 1
                for (let lbl of seen) {
                    area += areas.get(lbl) ?? 0
                } 

                maxArea = Math.max(maxArea, area)
            }
        }
    }

    return maxArea
};

console.log(largestIsland([[1, 0], [0, 1]])) // 3
console.log(largestIsland([[1, 1], [1, 0]])) // 4
console.log(largestIsland([[1, 1], [1, 1]])) // 4
console.log(largestIsland([[0, 0], [0, 0]])) // 1