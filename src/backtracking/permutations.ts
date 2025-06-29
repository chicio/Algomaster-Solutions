/**
 * https://leetcode.com/problems/permutations/description/
 * 46. Permutations
 *
 * Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * Example 2:
 *
 * Input: nums = [0,1]
 * Output: [[0,1],[1,0]]
 * Example 3:
 *
 * Input: nums = [1]
 * Output: [[1]]
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 6
 * -10 <= nums[i] <= 10
 * All the integers of nums are unique.
 */

function backtrackingPermutation(
    results: number[][],
    elements: number[],
    start: number
) {
    if (start === elements.length) {
        results.push([...elements]);
        return;
    }

    for (let i = start; i < elements.length; i++) {
        [elements[start], elements[i]] = [elements[i], elements[start]]
        backtrackingPermutation(results, elements, start + 1);
        [elements[start], elements[i]] = [elements[i], elements[start]]
    }
}

function permute(nums: number[]): number[][] {
    const results: number[][] = [];
    backtrackingPermutation(results, nums, 0);
    return results;
}

console.log(permute([1, 2, 3]));
