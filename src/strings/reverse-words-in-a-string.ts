/**
 * https://leetcode.com/problems/reverse-words-in-a-string/description/
 * 151. Reverse Words in a String
 *
 *  Given an input string s, reverse the order of the words.
 *
 * A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.
 *
 * Return a string of the words in reverse order concatenated by a single space.
 *
 * Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should
 * only have a single space separating the words. Do not include any extra spaces.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "the sky is blue"
 * Output: "blue is sky the"
 * Example 2:
 *
 * Input: s = "  hello world  "
 * Output: "world hello"
 * Explanation: Your reversed string should not contain leading or trailing spaces.
 * Example 3:
 *
 * Input: s = "a good   example"
 * Output: "example good a"
 * Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
 *
 *
 * Constraints:
 *
 * 1 <= s.length <= 104
 * s contains English letters (upper-case and lower-case), digits, and spaces ' '.
 * There is at least one word in s.
 *
 *
 * Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?
 */

function reverseWords(s: string): string {
    const parsedArray = s
        .trim()
        .split(' ')
        .filter(word => word !== '')
        .map(word => word.trim())

    let front = 0
    let back = parsedArray.length - 1

    /// without built in reverse.
    while(front < back) {
        [parsedArray[front], parsedArray[back]] = [parsedArray[back], parsedArray[front]];
        front++
        back--
    }

    return parsedArray.join(' ')
}

console.log(reverseWords("the sky is blue"))

// In place reverse
function reverseWordsInPlace(s: string): string {
    let chars = []

    for (let i = 0; i < s.length; i++) {
        chars.push(s.charAt(i))
    }

    let front = 0
    let back = chars.length - 1

    while (front < back) {
        [chars[front++], chars[back--]] = [chars[back], chars[front]]
    }    

    let start = 0
    let end = 0

    while (start < chars.length) {
        if (chars[start] !== ' ') {
            end = start

            while (end < chars.length && chars[end] !== ' ') {
                end++;
            }

            let startForReverse = start
            let endForReverse = end - 1

            while (startForReverse < endForReverse) {
                [chars[startForReverse++], chars[endForReverse--]] = [chars[endForReverse], chars[startForReverse]]
            }

            start = end
        } else {
            start++
        }
    }

    let current = 0

    while (current < chars.length) {
        if (chars[current] === ' ' && chars[current + 1] === ' ') {
            chars.splice(current, 1)
        } else {
            current++
        }
    }

    if (chars[0] === ' ') {
        chars.splice(0, 1)
    }

    if (chars[chars.length - 1] === ' ') {
        chars.splice(chars.length - 1, 1)
    }

    let result = ''

    for (let i = 0; i < chars.length; i++) {
        result += chars[i]
    }

    return result
}

console.log(reverseWordsInPlace("the sky is blue"))
