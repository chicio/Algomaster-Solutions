/**
 * https://leetcode.com/problems/find-all-anagrams-in-a-string/description/
 * Find All Anagrams in a String
 * Solved
 * Medium
 * Topics
 * Companies
 * Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: s = "cbaebabacd", p = "abc"
 * Output: [0,6]
 * Explanation:
 * The substring with start index = 0 is "cba", which is an anagram of "abc".
 * The substring with start index = 6 is "bac", which is an anagram of "abc".
 * Example 2:
 * 
 * Input: s = "abab", p = "ab"
 * Output: [0,1,2]
 * Explanation:
 * The substring with start index = 0 is "ab", which is an anagram of "ab".
 * The substring with start index = 1 is "ba", which is an anagram of "ab".
 * The substring with start index = 2 is "ab", which is an anagram of "ab".
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

function findAnagrams(s: string, p: string): number[] {
    let pLetters = new Map<string, number>()
    let sSubstringLetters = new Map<string, number>()

    for (const char of p) {
        pLetters.set(char, (pLetters.get(char) || 0) + 1)
    }

    for (let i = 0; i < p.length; i++) {
        sSubstringLetters.set(s.charAt(i), (sSubstringLetters.get(s.charAt(i)) || 0) + 1);
    }

    let arrayOfIndexes = []

    for (let i = p.length; i < s.length; i++) {
        if (areMapsEqual(pLetters, sSubstringLetters)) {
            arrayOfIndexes.push(i - p.length)
        }

        let charToBeRemoved = s.charAt(i - p.length)
        let charToBeAdded = s.charAt(i)
        let currentCount = sSubstringLetters.get(charToBeRemoved)!

        if (currentCount > 1)  {
            sSubstringLetters.set(charToBeRemoved, sSubstringLetters.get(charToBeRemoved)! - 1)
        } else {
            sSubstringLetters.delete(charToBeRemoved)
        }

        sSubstringLetters.set(charToBeAdded, (sSubstringLetters.get(charToBeAdded) || 0) + 1)
    }

    if (areMapsEqual(pLetters, sSubstringLetters)) {
        arrayOfIndexes.push(s.length - p.length)
    }

    return arrayOfIndexes
};

console.log(findAnagrams("cbeababacd", "abc"))