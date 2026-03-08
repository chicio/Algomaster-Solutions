/**
 * https://leetcode.com/problems/permutations/description/
 * 46. Permutations
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
