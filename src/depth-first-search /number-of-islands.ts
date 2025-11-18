/**
 * 
 * https://leetcode.com/problems/number-of-islands/description/
 * 200. Number of Islands
 * 
 * Topics
 * premium lock icon
 * Companies
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * Output: 1
 * Example 2:
 * 
 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 *  
 * 
 * Constraints:
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 300
 * grid[i][j] is '0' or '1'.
 */

function dfs(grid: string[][], r: number, c: number, visited: boolean[][]): void {
    if (
        (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) || 
        visited[r][c] ||
        grid[r][c] !== "1"
    ) {
        return
    }

    visited[r][c] = true;

    dfs(grid, r + 1, c, visited);
    dfs(grid, r - 1, c, visited);
    dfs(grid, r, c + 1, visited);
    dfs(grid, r, c - 1, visited);
}

function numIslands(grid: string[][]): number {
    const visited: boolean[][] = Array.from(
        Array(grid.length), _ => Array(grid[0].length).fill(false)
    )
    let islands = 0
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1' && !visited[i][j]) {
                islands++
                dfs(grid, i, j, visited)
            }
        }
    }

    return islands
};

console.log(numIslands([
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
])) 