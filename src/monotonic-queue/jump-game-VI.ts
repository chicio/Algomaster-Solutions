/**
 * https://leetcode.com/problems/jump-game-vi/description/
 * 1696. Jump Game VI
 */

function maxResult(nums: number[], k: number): number {
    const previousMax = [nums[0]]
    const deque: number[] = [0]

    for (let i = 1; i < nums.length; i++) {
        while (deque.length > 0 && deque[0] < i - k) {
            deque.shift()
        }

        previousMax.push(nums[i] + previousMax[deque[0]])

        while (deque.length > 0 && previousMax[deque[deque.length - 1]] <= previousMax[i]) {
            deque.pop()
        }

        deque.push(i)
    }

    return previousMax[previousMax.length - 1]    
};

console.log(maxResult([1,-1,-2,4,-7,3], 2))