/**
 * https://leetcode.com/problems/majority-element/description/
 * 169. Majority Element
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
        return -1
    }
}

const test = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(test))
