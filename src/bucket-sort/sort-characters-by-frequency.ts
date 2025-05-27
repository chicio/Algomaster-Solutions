/**
 * https://leetcode.com/problems/sort-characters-by-frequency/description/
 * 451. Sort Characters By Frequency
 *
 * Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.
 *
 * Return the sorted string. If there are multiple answers, return any of them.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "tree"
 * Output: "eert"
 * Explanation: 'e' appears twice while 'r' and 't' both appear once.
 * So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
 * Example 2:
 *
 * Input: s = "cccaaa"
 * Output: "aaaccc"
 * Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
 * Note that "cacaca" is incorrect, as the same characters must be together.
 * Example 3:
 *
 * Input: s = "Aabb"
 * Output: "bbAa"
 * Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
 * Note that 'A' and 'a' are treated as two different characters.
 *
 *
 * Constraints:
 *
 * 1 <= s.length <= 5 * 105
 * s consists of uppercase and lowercase English letters and digits.
 */


function frequencySort(s: string): string {
    let frequencies = new Map<string, number>()

    for (let i = 0; i < s.length; i++) {
        let currentChar = s.charAt(i)
        frequencies.set(currentChar, (frequencies.get(currentChar) || 0) + 1)
    }

    let bucketsOfFrequencies = new Map<number, string[]>()

    for (const [char, frequency] of frequencies) {
        let bucket = bucketsOfFrequencies.get(frequency) || []
        bucket.push(char)
        bucketsOfFrequencies.set(frequency, bucket)
    }

    let result = ""

    let sortedFrequencies = Array.from(bucketsOfFrequencies.keys()).sort((a, b) => b - a);

    for (const frequency of sortedFrequencies) {
        const chars = bucketsOfFrequencies.get(frequency)!;
        for (const currentChar of chars) {
            result += currentChar.repeat(frequency);
        }
    }

    return result
};


console.log(frequencySort("Aabb"))
