/**
 * https://leetcode.com/problems/generate-parentheses/description/
 * 22. Generate Parentheses
 *
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 *
 *
 *
 * Example 1:
 *
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 * Example 2:
 *
 * Input: n = 1
 * Output: ["()"]
 *
 *
 * Constraints:
 *
 * 1 <= n <= 8
 */

function backtrackingParenthesis(result: string[], open: number, closed: number, n: number, current: string) {
    if (current.length === n * 2) {
        result.push(current)
        return
    }

    if (open < n) {
        backtrackingParenthesis(result, open + 1, closed, n, current + '(')
    }

    if (closed < open) {
        backtrackingParenthesis(result, open, closed + 1, n, current + ')')
    }
}

function generateParenthesis(n: number): string[] {
    const result: string[] = []
    backtrackingParenthesis(result, 0, 0, n, '')
    return result
}

console.log(generateParenthesis(3)) // ["((()))","(()())","(())()","()(())","()()()"]

