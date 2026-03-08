/**
 * https://leetcode.com/problems/design-add-and-search-words-data-structure/description/
 * 211. Design Add and Search Words Data Structure
 */

import {TrieNode} from "../trie";

class WordDictionary {
    private root: TrieNode = new TrieNode()

    addWord(word: string): void {
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

    search(word: string): boolean {
        return this.searchRecursive(word, 0, this.root)
    }

    private searchRecursive(word: string, index: number, node: TrieNode): boolean {
        if (index === word.length) {
            return node.isEndOfWord
        }

        let currentChar = word.charAt(index)

        if (currentChar === '.') {
            for (let child of node.children.values()) {
                if (this.searchRecursive(word, index + 1, child)) {
                    return true
                }
            }
            return false
        } else {
            if (!node.children.has(currentChar)) {
                return false;
            }
            return this.searchRecursive(word, index + 1, node.children.get(currentChar)!)
        }
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
