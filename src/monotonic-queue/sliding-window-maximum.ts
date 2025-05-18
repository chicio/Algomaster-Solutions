/**
 * https://leetcode.com/problems/sliding-window-maximum/description/
 * 239. Sliding Window Maximum
 *
 * You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
 *
 * Return the max sliding window.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [3,3,5,5,6,7]
 * Explanation:
 * Window position                Max
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 * Example 2:
 *
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 105
 * -104 <= nums[i] <= 104
 * 1 <= k <= nums.length
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
