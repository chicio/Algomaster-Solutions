/**
 * https://leetcode.com/problems/largest-rectangle-in-histogram/description/
 * 84. Largest Rectangle in Histogram
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

