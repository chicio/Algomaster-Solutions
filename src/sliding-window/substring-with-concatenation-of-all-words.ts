/**
 * https://leetcode.com/problems/substring-with-concatenation-of-all-words/description/
 * 30. Substring with Concatenation of All Words
 * 
 * You are given a string s and an array of strings words. All the strings of words are of the same length.
 * 
 * A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.
 * 
 * For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
 * Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: s = "barfoothefoobarman", words = ["foo","bar"]
 * 
 * Output: [0,9]
 * 
 * Explanation:
 * 
 * The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
 * The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.
 * 
 * Example 2:
 * 
 * Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
 * 
 * Output: []
 * 
 * Explanation:
 * 
 * There is no concatenated substring.
 * 
 * Example 3:
 * 
 * Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
 * 
 * Output: [6,9,12]
 * 
 * Explanation:
 * 
 * The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].
 * The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].
 * The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].
 * 
 *  
 * 
 * Constraints:
 * 
 * 1 <= s.length <= 104
 * 1 <= words.length <= 5000
 * 1 <= words[i].length <= 30
 * s and words[i] consist of lowercase English letters.
 *  
 * 
 */

function areSubstringMapsEqual(map1: Map<string, number>, map2: Map<string, number>): boolean {
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

function findSubstring(s: string, words: string[]): number[] {
    let wordLength = words[0].length
    let wordsLength = words[0].length * words.length
    let wordsWithFrequency = new Map<string, number>()
    let indexes = []

    for (let i = 0; i < words.length; i++) {
        wordsWithFrequency.set(words[i], (wordsWithFrequency.get(words[i]) || 0) + 1)   
    }

    const currentWordsFrequency = new Map<string, number>()

    for (let i = 0; i < wordLength; i++) {
        currentWordsFrequency.clear()
        let left = i
        let right = i

        while (right <= s.length - wordLength) {
            let word = s.substring(right, right + wordLength)
            right = right + wordLength

            if (wordsWithFrequency.has(word)) { 
                currentWordsFrequency.set(word, (currentWordsFrequency.get(word) || 0) + 1)   

                while (currentWordsFrequency.get(word)! > wordsWithFrequency.get(word)!) {
                    let leftWord = s.substring(left, left + wordLength);
                    left += wordLength;
                    
                    currentWordsFrequency.set(leftWord, currentWordsFrequency.get(leftWord)! - 1);
                }

                /// In the best solution, this maps comparison is substituted by a match count
                if (areSubstringMapsEqual(currentWordsFrequency, wordsWithFrequency)) {
                    indexes.push(left)
                }
            } else {
                currentWordsFrequency.clear();
                left = right
            }
        }
    }

    return indexes
};

console.log(findSubstring("barfoothefoobarman", ["foo","bar"]))
console.log(findSubstring("rfoothefoobarman", ["foo","bar"]))