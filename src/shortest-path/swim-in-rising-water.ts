/**
 * https://leetcode.com/problems/swim-in-rising-water/description/
 * 778. Swim in Rising Water
 */

import { dijkstraMatrix } from "../dijkstra";

function swimInWater(grid: number[][]): number {
    return dijkstraMatrix(grid, grid[0][0], (currentCost, _, nextValue) => Math.max(currentCost, nextValue));
};

console.log(swimInWater([[0, 2], [1, 3]])) // 3
console.log(swimInWater([[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]])) // 16