/**
 * https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/
 * 452. Minimum Number of Arrows to Burst Balloons
 */

function findMinArrowShots(points: number[][]): number {
    points.sort((a, b) => a[0] - b[0])

    let arrows = 1
    let currentEnd = points[0][1]

    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > currentEnd) {
            arrows++
            currentEnd = points[i][1]
        } else {
            currentEnd = Math.min(points[i][1], currentEnd)
        }
    }

    return arrows
};

console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])) // 2
console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]])) // 4
console.log(findMinArrowShots([[1,2],[2,3],[3,4],[4,5]])) // 2