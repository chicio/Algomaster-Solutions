/**
 * https://leetcode.com/problems/design-add-and-search-words-data-structure/description/
 * 211. Design Add and Search Words Data Structure
 *
 * Design a data structure that supports adding new words and finding if a string matches any previously added string.
 *
 * Implement the WordDictionary class:
 *
 * WordDictionary() Initializes the object.
 * void addWord(word) Adds word to the data structure, it can be matched later.
 * bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
 *
 *
 * Example:
 *
 * Input
 * ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
 * [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
 * Output
 * [null,null,null,null,false,true,true,true]
 *
 * Explanation
 * WordDictionary wordDictionary = new WordDictionary();
 * wordDictionary.addWord("bad");
 * wordDictionary.addWord("dad");
 * wordDictionary.addWord("mad");
 * wordDictionary.search("pad"); // return False
 * wordDictionary.search("bad"); // return True
 * wordDictionary.search(".ad"); // return True
 * wordDictionary.search("b.."); // return True
 *
 *
 * Constraints:
 *
 * 1 <= word.length <= 25
 * word in addWord consists of lowercase English letters.
 * word in search consist of '.' or lowercase English letters.
 * There will be at most 2 dots in word for search queries.
 * At most 104 calls will be made to addWord and search.
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
