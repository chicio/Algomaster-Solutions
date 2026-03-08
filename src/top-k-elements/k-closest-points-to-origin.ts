/**
 * https://leetcode.com/problems/k-closest-points-to-origin/description/
 * 973. K Closest Points to Origin
 */

import { Heap } from "../heap"

function kClosest(points: number[][], k: number): number[][] {
    const kClosestsPoints = new Heap<{ point: number[], distance: number }>((a, b) => b.distance - a.distance)
    
    for (const point of points) {
        const distance = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2))
        kClosestsPoints.insert({ point, distance })

        if (kClosestsPoints.size() > k) {
            kClosestsPoints.extract()
        }
    }

    const result: number[][] = []

    while (kClosestsPoints.size() > 0) {
        result.push(kClosestsPoints.extract()!.point)
    }

    return result
};

console.log(kClosest([[1,3],[-2,2]], 1)) // Output: [[-2,2]]