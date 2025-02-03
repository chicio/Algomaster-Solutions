/**
 * https://leetcode.com/problems/ransom-note/description/
 * 383. Ransom Note
 * 
 * Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.
 * 
 * Each letter in magazine can only be used once in ransomNote.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: ransomNote = "a", magazine = "b"
 * Output: false
 * Example 2:
 * 
 * Input: ransomNote = "aa", magazine = "ab"
 * Output: false
 * Example 3:
 * 
 * Input: ransomNote = "aa", magazine = "aab"
 * Output: true
 *  
 * 
 * Constraints:
 * 
 * 1 <= ransomNote.length, magazine.length <= 105
 * ransomNote and magazine consist of lowercase English letters.
 */

function canConstruct(ransomNote: string, magazine: string): boolean {
    const magazineLetterCount = new Map<string, number>()

    for(let i = 0; i < magazine.length; i++) {
        magazineLetterCount.set(magazine.charAt(i), (magazineLetterCount.get(magazine.charAt(i)) || 0) + 1)
    }

    for (let i = 0; i < ransomNote.length; i++) {
        if (!magazineLetterCount.has(ransomNote.charAt(i)) || magazineLetterCount.get(ransomNote.charAt(i)) === 0) {
            return false
        } else {
            magazineLetterCount.set(ransomNote.charAt(i), magazineLetterCount.get(ransomNote.charAt(i))! - 1)
        }
    }

    return true
};

console.log("aa", "aab")