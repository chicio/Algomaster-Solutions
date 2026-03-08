/**
 * https://leetcode.com/problems/longest-word-in-dictionary/description/
 * 720. Longest Word in Dictionary
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
