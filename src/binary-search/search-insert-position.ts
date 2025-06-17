/**
 * https://leetcode.com/problems/search-insert-position/description/
 * 35. Search Insert Position
 * 
 * Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
 * 
 * You must write an algorithm with O(log n) runtime complexity.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [1,3,5,6], target = 5
 * Output: 2
 * Example 2:
 * 
 * Input: nums = [1,3,5,6], target = 2
 * Output: 1
 * Example 3:
 * 
 * Input: nums = [1,3,5,6], target = 7
 * Output: 4
 *  
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 104
 * -104 <= nums[i] <= 104
 * nums contains distinct values sorted in ascending order.
 * -104 <= target <= 104
 */

function searchInsert(nums: number[], target: number, left: number = 0, right: number = nums.length): number {
    if (left >= right) {
        return left
    }

    const mid = left + Math.floor((right - left) / 2)
    
    if (nums[mid] === target) {
        return mid
    }

    if (target < nums[mid]) {
        return searchInsert(nums, target, left, mid)
    } else {
        return searchInsert(nums, target, mid + 1, right)
    }
};

console.log(searchInsert([1, 3, 5, 6], 5)) // Output: 2