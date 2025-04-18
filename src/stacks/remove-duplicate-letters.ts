/**
 * 
 * https://leetcode.com/problems/remove-duplicate-letters/description/
 * 316. Remove Duplicate Letters
 * 
 * Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.
 * 
 * 
 * Example 1:
 * 
 * Input: s = "bcabc"
 * Output: "abc"
 * Example 2:
 * 
 * Input: s = "cbacdcbc"
 * Output: "acdb"
 *  
 * 
 * Constraints:
 * 
 * 1 <= s.length <= 104
 * s consists of lowercase English letters.
 *  
 * 
 * Note: This question is the same as 1081: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/
 */

function removeDuplicateLetters(s: string): string {
    let lastPositionOfChars = new Map<string, number>()

    for (let i = 0; i < s.length; i++) {
        lastPositionOfChars.set(s.charAt(i), i)
    }

    let alreadyUsed = new Set<string>()
    let result = "" //This is basically a monothonic stack

    for (let i = 0; i < s.length; i++) {
        let currentChar = s.charAt(i)
        let topChar = result.charAt(result.length - 1)

        if (!alreadyUsed.has(currentChar) && currentChar > topChar) {
            result += currentChar
        }

        if (!alreadyUsed.has(currentChar) && currentChar < topChar) {
            while ((lastPositionOfChars.get(topChar) ?? -1) > i && topChar > currentChar) {
                result = result.substring(0, result.length - 1);
                alreadyUsed.delete(topChar)
                topChar = result.charAt(result.length - 1)
            }

            result += currentChar
        }

        alreadyUsed.add(currentChar)
    }

    return result
};