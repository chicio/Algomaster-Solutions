/**
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
 * 17. Letter Combinations of a Phone Number
 *
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
 *
 * A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
 *
 *
 *
 *
 * Example 1:
 *
 * Input: digits = "23"
 * Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * Example 2:
 *
 * Input: digits = ""
 * Output: []
 * Example 3:
 *
 * Input: digits = "2"
 * Output: ["a","b","c"]
 *
 *
 * Constraints:
 *
 * 0 <= digits.length <= 4
 * digits[i] is a digit in the range ['2', '9'].
 */

const numbersToLetters: Record<number, string[]> = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
}

function backtrackLetterCombinations(results: string[], digits: string[]): string[] {
    if (digits.length === 0) {
        return results
    }

    let currentDigit = parseInt(digits.pop()!)
    let currentChars = numbersToLetters[currentDigit]!
    let newResults = []

    for (const char of currentChars) {
        for (const result of results) {
            newResults.push(`${char}${result}`)
        }
    }

    return backtrackLetterCombinations(newResults, digits)
}

function letterCombinations(digits: string): string[] {
    if (digits.length === 0) {
        return []
    }

    return backtrackLetterCombinations([''], digits.split(""))
}

console.log(letterCombinations("23")) // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
