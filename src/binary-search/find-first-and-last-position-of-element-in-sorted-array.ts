/**
 * https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 * 34. Find First and Last Position of Element in Sorted Array
 *
 * Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
 *
 * If target is not found in the array, return [-1, -1].
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [5,7,7,8,8,10], target = 8
 * Output: [3,4]
 * Example 2:
 *
 * Input: nums = [5,7,7,8,8,10], target = 6
 * Output: [-1,-1]
 * Example 3:
 *
 * Input: nums = [], target = 0
 * Output: [-1,-1]
 *
 *
 * Constraints:
 *
 * 0 <= nums.length <= 105
 * -109 <= nums[i] <= 109
 * nums is a non-decreasing array.
 * -109 <= target <= 109
 */

function searchRange(nums: number[], target: number): number[] {
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2)

        if (nums[mid] < target) {
            left = mid + 1
        } else if (nums[mid] > target) {
            right = mid - 1
        } else {
            let start = mid
            let end = mid

            while (start - 1 >= 0 && nums[start - 1] === target) {
                start--
            }

            while (end + 1 < nums.length && nums[end + 1] === target) {
                end++
            }

            return [start, end]
        }
    }

    return [-1, -1]
}

console.log(searchRange([5,7,7,8,8,10], 8))
