/**
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 * Longest Substring Without Repeating Characters
 * 
 * Given a string s, find the length of the longest substring without duplicate characters.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * Example 2:
 * 
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * Example 3:
 * 
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 *  
 * 
 * Constraints:
 * 
 * 0 <= s.length <= 5 * 104
 * s consists of English letters, digits, symbols and spaces.
 */

function lengthOfLongestSubstring(s: string): number {
    let currentCharsInSubstring = new Map<string, number>()
    let maxLength = 0
    let startSubString = -1

    for (let i = 0; i < s.length; i++) {
        let currentChar = s.charAt(i)

        if (currentCharsInSubstring.has(currentChar) && currentCharsInSubstring.get(currentChar)! >= startSubString) {
            startSubString = currentCharsInSubstring.get(currentChar)!
        }

        currentCharsInSubstring.set(s.charAt(i), i)
        maxLength = Math.max(maxLength, i - startSubString)
    }

    return maxLength
};

