/**
 * https://leetcode.com/problems/path-with-minimum-effort/description/
 * 1631. Path With Minimum Effort
 */

import { dijkstraMatrix } from "../dijkstra";

function minimumEffortPath(heights: number[][]): number {
    return dijkstraMatrix(heights, 0, (currentCost, currentValue, nextValue) => Math.max(currentCost, Math.abs(currentValue - nextValue)));
};

console.log(minimumEffortPath([[1, 2, 2], [3, 8, 2], [5, 3, 5]])) // 2
console.log(minimumEffortPath([[1, 2, 3], [3, 8, 4], [5, 3, 5]])) // 1
console.log(minimumEffortPath([[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]])) // 0  