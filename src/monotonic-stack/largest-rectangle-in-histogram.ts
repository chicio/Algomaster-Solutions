/**
 * https://leetcode.com/problems/largest-rectangle-in-histogram/description/
 * 84. Largest Rectangle in Histogram
 * Solved
 * Hard
 * Topics
 * Companies
 * Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: heights = [2,1,5,6,2,3]
 * Output: 10
 * Explanation: The above is a histogram where width of each bar is 1.
 * The largest rectangle is shown in the red area, which has an area = 10 units.
 * Example 2:
 *
 *
 * Input: heights = [2,4]
 * Output: 4
 *
 *
 * Constraints:
 *
 * 1 <= heights.length <= 105
 * 0 <= heights[i] <= 104
 */

interface StackElement {
    index: number
    value: number
}

function largestRectangleArea(heights: number[]): number {
    const stack: StackElement[] = []
    let maxArea = 0
    // Add 0 at the end to have and additional element to flush next ones when reaching the end
    const heightsPreprocessed = [...heights, 0]

    for (let i = 0; i < heightsPreprocessed.length; i++) {
        const currentElement = heightsPreprocessed[i]

        while (stack.length > 0 && stack[stack.length - 1].value > currentElement) {
            const currentMax = stack.pop()!
            const rectangleHeight = currentMax.value
            const rectangleBase = stack.length === 0 ? i : i - stack[stack.length - 1].index - 1
            maxArea = Math.max(maxArea, rectangleBase * rectangleHeight)
        }

        stack.push({ index: i, value: currentElement })
    }

    return maxArea
}

console.log(largestRectangleArea([2,1,5,6,2,3]))
console.log(largestRectangleArea([2,4]))
console.log(largestRectangleArea([1]))
console.log(largestRectangleArea([2,1,2]))
console.log(largestRectangleArea([4,2,0,3,2,5]))

