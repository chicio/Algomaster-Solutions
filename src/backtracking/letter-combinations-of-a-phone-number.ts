/**
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
 * 17. Letter Combinations of a Phone Number
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
