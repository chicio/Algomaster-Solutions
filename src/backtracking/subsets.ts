/**
 * https://leetcode.com/problems/subsets/description/
 * 78. Subsets
 *
 * Given an integer array nums of unique elements, return all possible subsets (the power set).
 *
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * Example 2:
 *
 * Input: nums = [0]
 * Output: [[],[0]]
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 10
 * -10 <= nums[i] <= 10
 * All the numbers of nums are unique.
 */

function backtrackSubsets(results: number[][], nums: number[], current: number[], start: number) {
    results.push([...current])

    for (let i = start; i < nums.length; i++) {
        current.push(nums[i])
        backtrackSubsets(results, nums, current, i + 1)
        current.pop()
    }
}

function subsets(nums: number[]): number[][] {
    const results: number[][] = []
    backtrackSubsets(results, nums, [], 0)
    return results
}

console.log(subsets([1, 2, 3])) // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
