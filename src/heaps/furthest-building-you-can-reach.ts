/**
 * https://leetcode.com/problems/furthest-building-you-can-reach/
 * 1642. Furthest Building You Can Reach
 */
import {Heap} from "../heap";

function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    const gapsSorted = new Heap<number>((a, b) => a - b)
    let jumps = 0

    for (let i = 1; i < heights.length; i++) {
        if (heights[i] > heights[i - 1]) {
            const buildingsGap = heights[i] - heights[i - 1]

            gapsSorted.insert(buildingsGap)

            if (gapsSorted.size() > ladders) {
                bricks = bricks - gapsSorted.extract()!

                if (bricks < 0) {
                    return i - 1
                }
            }
        }
    }

    return heights.length - 1
}

console.log(furthestBuilding([4,12,2,7,3,18,20,3,19], 10, 2)) // Output: 7
