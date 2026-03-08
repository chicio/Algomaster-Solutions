/**
 * https://leetcode.com/problems/subsets/description/
 * 78. Subsets
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
