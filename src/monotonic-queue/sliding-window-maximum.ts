/**
 * https://leetcode.com/problems/sliding-window-maximum/description/
 * 239. Sliding Window Maximum
 */

function maxSlidingWindow(nums: number[], k: number): number[] {
    let results: number[] = []
    let deque: number[] = []
    let left = 0
    let right = 0

    while (right < nums.length) {
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[right]) {
            deque.pop()
        }

        deque.push(right)

        if (left > deque[0]) {
            deque.shift()
        }

        if (right + 1 >= k) {
            results.push(nums[deque[0]])
            left++
        }

        right++
    }

    return results
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
