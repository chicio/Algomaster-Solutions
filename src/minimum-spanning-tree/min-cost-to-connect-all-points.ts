/*
 * 1584. Min Cost to Connect All Points
 * 
 * You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].
 * 
 * The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.
 * 
 * Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
 * Output: 20
 * Explanation: 
 * 
 * We can connect the points as shown above to get the minimum cost of 20.
 * Notice that there is a unique path between every pair of points.
 * Example 2:
 * 
 * Input: points = [[3,12],[-2,5],[-4,1]]
 * Output: 18
 *  
 * 
 * Constraints:
 * 
 * 1 <= points.length <= 1000
 * -106 <= xi, yi <= 106
 * All pairs (xi, yi) are distinct.
 */

import { UnionFind } from "../union-find"

function minCostConnectPoints(points: number[][]): number {
    const edges: number[][] = []

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const cost =
                Math.abs(points[i][0] - points[j][0]) +
                Math.abs(points[i][1] - points[j][1])

            edges.push([i, j, cost])
        }
    }

    edges.sort((a, b) => a[2] - b[2])

    const uf = new UnionFind(points.length)
    let totalCost = 0
    let used = 0

    for (const [u, v, cost] of edges) {
        if (uf.union(u, v)) {
            totalCost += cost
            used++

            if (used === points.length - 1) { 
                break
            }
        }
    }

    return totalCost
};

console.log(minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])) // 20
console.log(minCostConnectPoints([[3,12],[-2,5],[-4,1]])) // 18