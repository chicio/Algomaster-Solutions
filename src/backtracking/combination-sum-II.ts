/**
 * https://leetcode.com/problems/combination-sum-ii/description/
 * 40. Combination Sum II
 *
 * Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
 *
 * Each number in candidates may only be used once in the combination.
 *
 * Note: The solution set must not contain duplicate combinations.
 *
 *
 *
 * Example 1:
 *
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output:
 * [
 * [1,1,6],
 * [1,2,5],
 * [1,7],
 * [2,6]
 * ]
 * Example 2:
 *
 * Input: candidates = [2,5,2,1,2], target = 5
 * Output:
 * [
 * [1,2,2],
 * [5]
 * ]
 *
 *
 * Constraints:
 *
 * 1 <= candidates.length <= 100
 * 1 <= candidates[i] <= 50
 * 1 <= target <= 30
 */

function backtrackCombinationSum2(
    results: number[][],
    candidates: number[],
    target: number,
    currentCandidate: number,
    combination: number[]
) {
    if (target < 0) {
        return
    }

    if (target === 0) {
        results.push([...combination])
        return
    }

    for (let i = currentCandidate; i < candidates.length; i++) {
        if (i > currentCandidate && candidates[i] === candidates[i - 1]) {
            continue;
        }

        combination.push(candidates[i])
        backtrackCombinationSum2(results, candidates, target - candidates[i], i + 1, combination)
        combination.pop()
    }
}

function combinationSum2(candidates: number[], target: number): number[][] {
    const results: number[][] = []
    backtrackCombinationSum2(results, candidates.sort((a, b) => a - b), target, 0, [])
    return results
}

console.log(combinationSum2([10,1,2,7,6,1,5], 8)) // [[1,1,6],[1,2,5],[1,7],[2,6]]
