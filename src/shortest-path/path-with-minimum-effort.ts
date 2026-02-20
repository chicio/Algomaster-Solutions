/**
 * https://leetcode.com/problems/path-with-minimum-effort/description/
 * 1631. Path With Minimum Effort
 * 
 * You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.
 * 
 * A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.
 * 
 * Return the minimum effort required to travel from the top-left cell to the bottom-right cell.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * 
 * Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
 * Output: 2
 * Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
 * This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.
 * Example 2:
 * 
 * 
 * 
 * Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
 * Output: 1
 * Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].
 * Example 3:
 * 
 * 
 * Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
 * Output: 0
 * Explanation: This route does not require any effort.
 *  
 * 
 * Constraints:
 * 
 * rows == heights.length
 * columns == heights[i].length
 * 1 <= rows, columns <= 100
 * 1 <= heights[i][j] <= 106
 */

import { Heap } from "../heap";

type MatrixElement = { row: number; column: number; cost: number };

function dijkstraMatrix(
    graph: number[][],
): number {
    const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]]
    const rows = graph.length
    const columns = graph[0].length
    const dist: number[][] = Array.from({ length: rows }, () => Array(columns).fill(Infinity));
    dist[0][0] = 0;

    const minCostHeap = new Heap<MatrixElement>((a, b) => a.cost - b.cost);
    minCostHeap.insert({ row: 0, column: 0, cost: 0 });

    while (minCostHeap.size() > 0) {
        const current = minCostHeap.extract()!;
        const { row, column, cost } = current;

        if (cost > dist[row][column]) { 
            continue;
        }

        if (row == rows - 1 && column === columns - 1) {
            return cost
        }

        for (const [moveX, moveY] of directions) {
            const newRow = row + moveX
            const newColumn = column + moveY

            if (newRow < 0 || newRow >= rows || newColumn < 0 || newColumn >= columns) {
                continue;
            }

            const edgeCost = Math.abs(graph[row][column] - graph[newRow][newColumn])
            const newCost = Math.max(cost, edgeCost);

            if (newCost < dist[newRow][newColumn]) {
                dist[newRow][newColumn] = newCost;
                minCostHeap.insert({ row: newRow, column: newColumn, cost: newCost });
            }
        }
    }

    return 0;
}

function minimumEffortPath(heights: number[][]): number {
    return dijkstraMatrix(heights)
};

console.log(minimumEffortPath([[1, 2, 2], [3, 8, 2], [5, 3, 5]])) // 2
console.log(minimumEffortPath([[1, 2, 3], [3, 8, 4], [5, 3, 5]])) // 1
console.log(minimumEffortPath([[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]])) // 0  