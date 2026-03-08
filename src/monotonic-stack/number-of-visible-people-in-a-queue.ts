/**
 * https://leetcode.com/problems/number-of-visible-people-in-a-queue/description/
 * 1944. Number of Visible People in a Queue
 */

function canSeePersonsCount(heights: number[]): number[] {
    const stack: number[] = []
    const answers = Array(heights.length).fill(0)

    for(let i = heights.length - 1; i >= 0; i--) {
        let currentElement = heights[i]
        let count = 0

        while (stack.length > 0 && stack[stack.length - 1] < currentElement) {
            stack.pop()!
            count++
        }

        answers[i] = stack.length === 0 ? count : count + 1
        stack.push(currentElement)
    }

    return answers
}

console.log(canSeePersonsCount([10,6,8,5,11,9]))
console.log(canSeePersonsCount([5,1,2,3,10]))
