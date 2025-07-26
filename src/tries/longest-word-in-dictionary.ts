/**
 * https://leetcode.com/problems/longest-word-in-dictionary/description/
 * 720. Longest Word in Dictionary
 *
 * Given an array of strings words representing an English Dictionary, return the longest word in words that can be built one character at a time by other words in words.
 *
 * If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.
 *
 * Note that the word should be built from left to right with each additional character being added to the end of a previous word.
 *
 *
 *
 * Example 1:
 *
 * Input: words = ["w","wo","wor","worl","world"]
 * Output: "world"
 * Explanation: The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".
 * Example 2:
 *
 * Input: words = ["a","banana","app","appl","ap","apply","apple"]
 * Output: "apple"
 * Explanation: Both "apply" and "apple" can be built from other words in the dictionary. However, "apple" is lexicographically smaller than "apply".
 *
 *
 * Constraints:
 *
 * 1 <= words.length <= 1000
 * 1 <= words[i].length <= 30
 * words[i] consists of lowercase English letters.
 */

class TrieCanBeBuilt {
    private root: TrieNode = new TrieNode()

    insert(word: string): void {
        let currentNode = this.root

        for (const char of word) {
            let currentCharNode = currentNode.children.get(char)

            if (!currentCharNode) {
                currentCharNode = new TrieNode()
                currentNode.children.set(char, currentCharNode)
            }

            currentNode = currentCharNode
        }

        currentNode.isEndOfWord = true
    }

    canBeBuilt(word: string): boolean {
        let currentNode = this.root

        for (const char of word) {
            let currentCharNode = currentNode.children.get(char)

            if (!currentCharNode || !currentCharNode.isEndOfWord) {
                return false
            }

            currentNode = currentCharNode
        }

        return currentNode.isEndOfWord
    }
}

function longestWord(words: string[]): string {
    const search = new TrieCanBeBuilt()
    let maxString = ""

    for (let word of words) {
        search.insert(word)
    }

    for (let word of words) {
        let canBeBuilt = search.canBeBuilt(word)

        if (canBeBuilt && (word.length > maxString.length || (word.length === maxString.length && word < maxString))) {
            maxString = word
        }
    }

    return maxString
};
