/**
 * https://leetcode.com/problems/combination-sum-ii/description/
 * 40. Combination Sum II
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
