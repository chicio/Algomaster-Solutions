/**
 * https://leetcode.com/problems/maximum-number-of-points-with-cost/
 * 1937. Maximum Number of Points with Cost
 */

function maxPoints(points: number[][]): number {
    const rows = points.length
    const columns = points[0].length

    let row = points[0]

    for (let r = 1; r < rows; r++) {
        const nextRow = [...points[r]]
        const left = Array(columns)
        const right = Array(columns)

        left[0] = row[0]

        for (let c = 1; c < columns; c++) {
            left[c] = Math.max(row[c], left[c - 1] - 1)
        }

        right[columns - 1] = row[columns - 1]

        for (let c = columns - 2; c >= 0; c--) {
            right[c] = Math.max(row[c], right[c + 1] - 1)
        }

        for (let c = 0; c < columns; c++) {
            nextRow[c] =  points[r][c] + Math.max(left[c], right[c])
        }

        row = [...nextRow]
    }

    return Math.max(...row)
};