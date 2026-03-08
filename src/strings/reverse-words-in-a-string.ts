/**
 * https://leetcode.com/problems/reverse-words-in-a-string/description/
 * 151. Reverse Words in a String
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
