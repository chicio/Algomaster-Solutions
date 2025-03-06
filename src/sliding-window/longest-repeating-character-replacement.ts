/**
 * https://leetcode.com/problems/longest-repeating-character-replacement/description/
 * 424. Longest Repeating Character Replacement
 * 
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.
 * 
 * Return the length of the longest substring containing the same letter you can get after performing the above operations.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: s = "ABAB", k = 2
 * Output: 4
 * Explanation: Replace the two 'A's with two 'B's or vice versa.
 * Example 2:
 * 
 * Input: s = "AABABBA", k = 1
 * Output: 4
 * Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
 * The substring "BBBB" has the longest repeating letters, which is 4.
 * There may exists other ways to achieve this answer too.
 *  
 * 
 * Constraints:
 * 
 * 1 <= s.length <= 105
 * s consists of only uppercase English letters.
 * 0 <= k <= s.length
 */
function characterReplacement(s: string, k: number): number {
    const charsFrequencies = new Map<string, number>();
    let maxLength = 0
    let maxFrequency = 0
    let startSubstring = 0

    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i)
        charsFrequencies.set(char, (charsFrequencies.get(char) || 0) + 1)
        maxFrequency = Math.max(maxFrequency, charsFrequencies.get(char)!)

        while (i - startSubstring + 1 - maxFrequency > k) {
            let startingChar = s.charAt(startSubstring)
            charsFrequencies.set(startingChar, charsFrequencies.get(startingChar)! - 1)
            startSubstring++
        }
        
        maxLength = Math.max(maxLength, i - startSubstring + 1)
    }

    return maxLength
};

console.log(characterReplacement("KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF", 4))