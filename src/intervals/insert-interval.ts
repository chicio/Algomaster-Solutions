/**
 * https://leetcode.com/problems/insert-interval/description/
 * 57. Insert Interval
 */

function insert(intervals: number[][], newInterval: number[]): number[][] {
    const result = []
    let i = 0

    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i++])
    }

    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(intervals[i][0], newInterval[0])
        newInterval[1] = Math.max(intervals[i][1], newInterval[1])
        i++
    }

    result.push(newInterval)

    while (i < intervals.length) {
        result.push(intervals[i++])
    }

    return result
};