/**
 * https://leetcode.com/problems/majority-element/description/
 * 169. Majority Element
 * Easy
 *
 * Topics
 * Companies
 * Given an array nums of size n, return the majority element.
 *
 * The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [3,2,3]
 * Output: 3
 * Example 2:
 *
 * Input: nums = [2,2,1,1,1,2,2]
 * Output: 2
 *
 *
 * Constraints:
 *
 * n == nums.length
 * 1 <= n <= 5 * 104
 * -109 <= nums[i] <= 109
 *
 *
 * Follow-up: Could you solve the problem in linear time and in O(1) space?
 */

// Booyer Moore voting algorithm, better refactored with respect to the last attempt
// See: https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/
function majorityElement(nums: number[]): number {
    let candidate = 0;
    let count = 0;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    count = 0;

    for (const num of nums) {
        if (num === candidate) {
            count++;
        }
    }

    if (count > nums.length / 2) {
        return candidate;
    } else {
        return -1 //
    }
}

const test = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(test))
