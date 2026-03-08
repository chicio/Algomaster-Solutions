/**
 * https://leetcode.com/problems/implement-trie-prefix-tree/description/
 * 208. Implement Trie (Prefix Tree)
 */
import {TrieNode} from "../trie";

class Trie {
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

    search(word: string): boolean {
        let currentNode = this.root

        for (const char of word) {
            let currentCharNode = currentNode.children.get(char)

            if (!currentCharNode) {
                return false
            }

            currentNode = currentCharNode
        }

        return currentNode.isEndOfWord
    }

    startsWith(prefix: string): boolean {
        let currentNode = this.root

        for (const char of prefix) {
            let currentCharNode = currentNode.children.get(char)

            if (!currentCharNode) {
                return false
            }

            currentNode = currentCharNode
        }

        return true
    }
}
