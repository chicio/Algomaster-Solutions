/**
 * 
 * https://leetcode.com/problems/permutation-in-string/description/
 * 567. Permutation in String
 *
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
 * 
 * In other words, return true if one of s1's permutations is the substring of s2.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: s1 = "ab", s2 = "eidbaooo"
 * Output: true
 * Explanation: s2 contains one permutation of s1 ("ba").
 * Example 2:
 * 
 * Input: s1 = "ab", s2 = "eidboaoo"
 * Output: false
 *  
 * 
 * Constraints:
 * 
 * 1 <= s1.length, s2.length <= 104
 * s1 and s2 consist of lowercase English letters.
 */

function areMapsEqual(map1: Map<string, number>, map2: Map<string, number>): boolean {
    if (map1.size !== map2.size) { 
        return false
    }

    for (const [key, value] of map1) {
        if (map2.get(key) !== value) { 
            return false
        }
    }

    return true;
}

function checkInclusion(s1: string, s2: string): boolean {
    let s1Letters = new Map<string, number>()
    let s2SubstringLetters = new Map<string, number>()

    for (const char of s1) {
        s1Letters.set(char, (s1Letters.get(char) || 0) + 1)
    }

    for (let i = 0; i < s1.length; i++) {
        s2SubstringLetters.set(s2.charAt(i), (s2SubstringLetters.get(s2.charAt(i)) || 0) + 1);
    }

    for (let i = s1.length; i < s2.length; i++) {
        if (areMapsEqual(s1Letters, s2SubstringLetters)) {
            return true
        }

        let charToBeRemoved = s2.charAt(i - s1.length)
        let charToBeAdded = s2.charAt(i)
        let currentCount = s2SubstringLetters.get(charToBeRemoved)!

        if (currentCount > 1)  {
            s2SubstringLetters.set(charToBeRemoved, s2SubstringLetters.get(charToBeRemoved)! - 1)
        } else {
            s2SubstringLetters.delete(charToBeRemoved)
        }

        s2SubstringLetters.set(charToBeAdded, (s2SubstringLetters.get(charToBeAdded) || 0) + 1)
    }

    if (areMapsEqual(s1Letters, s2SubstringLetters)) {
        return true
    }

    return false
};

console.log(checkInclusion("eidbaooo", "ab"))