/**
 * https://leetcode.com/problems/valid-parentheses/description/
 * Valid Parentheses
 *  
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 * 
 * An input string is valid if:
 * 
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
 * Every close bracket has a corresponding open bracket of the same type.
 *  
 * 
 * Example 1:
 * 
 * Input: s = "()"
 * 
 * Output: true
 * 
 * Example 2:
 * 
 * Input: s = "()[]{}"
 * 
 * Output: true
 * 
 * Example 3:
 * 
 * Input: s = "(]"
 * 
 * Output: false
 * 
 * Example 4:
 * 
 * Input: s = "([])"
 * 
 * Output: true
 * 
 *  
 * 
 * Constraints:
 * 
 * 1 <= s.length <= 104
 * s consists of parentheses only '()[]{}'.
 */

const parenthesisCombinations: Record<string, string> = {
    '}' : '{',
    ']' : '[',
    ')' : '(',
}

function isValid(s: string): boolean {
    let stack: string[] = []

    for (let i = 0; i < s.length; i++) {
        const parenthesis = s.charAt(i);

        if (parenthesis === '(' || parenthesis === '{' || parenthesis === '[') {
            stack.push(parenthesis)
        } else {
            let lastParenthesis = stack.pop()
            if (lastParenthesis !== parenthesisCombinations[parenthesis]) {
                return false
            }
        }
    }

    return stack.length === 0
};