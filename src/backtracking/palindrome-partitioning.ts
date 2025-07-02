/**
 * https://leetcode.com/problems/palindrome-partitioning/description/
 * 131. Palindrome Partitioning
 *
 * Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "aab"
 * Output: [["a","a","b"],["aa","b"]]
 * Example 2:
 *
 * Input: s = "a"
 * Output: [["a"]]
 *
 *
 * Constraints:
 *
 * 1 <= s.length <= 16
 * s contains only lowercase English letters.
 */

const palindromeMemoization = new Set<string>();

function isPalindromeString(s: string): boolean {
    if (palindromeMemoization.has(s)) {
        return true
    }

    let left = 0
    let right = s.length - 1;

    while (left < right) {
        if (s[left++] !== s[right--]) {
            return false;
        }
    }

    palindromeMemoization.add(s)

    return true;
}

function backtrackPartition(
    results: string[][],
    currentPalindromes: string[],
    s: string,
    start: number
) {
    if (s.length <= start) {
        return results.push([...currentPalindromes])
    }

    for (let i = start; i < s.length; i++) {
        let substring = s.substring(start, i + 1)
        if (isPalindromeString(substring)) {
            currentPalindromes.push(substring)
            backtrackPartition(results, currentPalindromes, s, i + 1)
            currentPalindromes.pop()
        }
    }
}

function partition(s: string): string[][] {
    let results: string[][] = []
    backtrackPartition(results, [], s, 0)
    return results
}

console.log(partition("aab")) // [["a","a","b"],["aa","b"]]
