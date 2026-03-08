/**
 * https://leetcode.com/problems/combination-sum/description/
 * 39. Combination Sum
 */

function backtrackCombinationSum(
    candidates: number[],
    results: number[][],
    target: number,
    start: number,
    combination: number[]
) {
    if (results.length >= 150 || target < 0) {
        return
    }

    if (target === 0) {
        results.push([...combination])
        return
    }

    for (let i = start; i < candidates.length; i++) {
        combination.push(candidates[i])
        backtrackCombinationSum(candidates, results, target - candidates[i], i, combination)
        combination.pop()
    }
}

function combinationSum(candidates: number[], target: number): number[][] {
    let results: number[][] = []
    backtrackCombinationSum(candidates, results, target, 0, [])
    return results
}

console.log(combinationSum([2,3,6,7], 7)) // [[2,2,3],[7]]
