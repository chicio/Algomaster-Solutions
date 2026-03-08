/**
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 * 746. Min Cost Climbing Stairs
 */

function minCostClimbingStairs(cost: number[]): number {
    const dpCosts = [...cost]

    for (let i = cost.length - 1; i >= 0; i--) {
        dpCosts[i] = dpCosts[i] + Math.min(dpCosts[i + 1] ?? 0, dpCosts[i + 2] ?? 0)
    }

    return Math.min(dpCosts[0], dpCosts[1])
};

console.log(minCostClimbingStairs([10, 15, 20])) // 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])) // 6