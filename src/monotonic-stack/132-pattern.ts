/**
 * https://leetcode.com/problems/132-pattern/description/
 * 132 Pattern
 */

function find132pattern(nums: number[]): boolean {
    let stack: number[] = []
    let secondElement = -Infinity

    for(let i = nums.length - 1; i >= 0; i--) {
        let currentElement = nums[i]

        while (stack.length > 0 && stack[stack.length - 1] < currentElement) {
            let currentMajor = stack.pop()!

            if (currentMajor > secondElement) {
                secondElement = currentMajor
            }
        }

        if (currentElement < secondElement)  {
            return true
        }

        stack.push(currentElement)
    }

    return false
}
