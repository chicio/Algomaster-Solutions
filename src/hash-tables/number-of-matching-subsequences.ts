/**
 * https://leetcode.com/problems/number-of-matching-subsequences/description/
 * 792. Number of Matching Subsequences
 * 
 * Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.
 * 
 * A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
 * 
 * For example, "ace" is a subsequence of "abcde".
 *  
 * 
 * Example 1:
 * 
 * Input: s = "abcde", words = ["a","bb","acd","ace"]
 * Output: 3
 * Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".
 * Example 2:
 * 
 * Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
 * Output: 2
 *  
 * 
 * Constraints:
 * 
 * 1 <= s.length <= 5 * 104
 * 1 <= words.length <= 5000
 * 1 <= words[i].length <= 50
 * s and words[i] consist of only lowercase English letters.
 */

function numMatchingSubseq(s: string, words: string[]): number {
    let dictionaryOfWords = new Map<string, string[]>()

    for (let i = 0; i < words.length; i++) {
        let currentWord = words[i]
        let initialChar = currentWord.charAt(0)
        let currentListOfWords = dictionaryOfWords.get(initialChar)

        if (currentListOfWords)  {
            currentListOfWords.push(currentWord)
        } else {
            currentListOfWords = [currentWord]
        }

        dictionaryOfWords.set(initialChar, currentListOfWords)
    }

    let numberOfMatchingSubsequences = 0

    for (let i = 0; i < s.length; i++) {
        let currentChar = s.charAt(i)
        let currentListOfWords = dictionaryOfWords.get(currentChar)

        if (currentListOfWords) {
            let wordsToReAdd = []

            while(currentListOfWords.length > 0) {
                let currentWord = currentListOfWords.shift() ?? ""

                if (currentWord.length === 1) {
                    numberOfMatchingSubsequences++
                } else {
                    let newCurrentWord = currentWord.substring(1)
                    wordsToReAdd.push(newCurrentWord)
                }
            }

            dictionaryOfWords.set(currentChar, [])

            for (let j = 0; j < wordsToReAdd.length; j++) {
                let currentWordToReAdd = wordsToReAdd[j]
                let wordToReadInitialChar = currentWordToReAdd.charAt(0)
                let listForChar = dictionaryOfWords.get(wordToReadInitialChar)

                if (listForChar)  {
                    listForChar.push(currentWordToReAdd)
                } else {
                    listForChar = [currentWordToReAdd]
                }

                dictionaryOfWords.set(wordToReadInitialChar, listForChar)                
            }
        }
    }

    return numberOfMatchingSubsequences
};

console.log(numMatchingSubseq("abcdea", ["a","bb","acd","ace", "aa"]))