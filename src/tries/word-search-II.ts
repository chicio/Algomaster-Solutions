/**
 * https://leetcode.com/problems/word-search-ii/description/
 * 212. Word Search II
 *
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 *
 * Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
 * Output: ["eat","oath"]
 * Example 2:
 *
 *
 * Input: board = [["a","b"],["c","d"]], words = ["abcb"]
 * Output: []
 *
 *
 * Constraints:
 *
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 12
 * board[i][j] is a lowercase English letter.
 * 1 <= words.length <= 3 * 104
 * 1 <= words[i].length <= 10
 * words[i] consists of lowercase English letters.
 * All the strings of words are unique.
 */


// Taken from https://github.com/AlgoMaster-io/leetcode-solutions/blob/main/typescript/word-search-ii.md#approach-2-trie--backtracking

class TrieNodeWords {
    children: { [key: string]: TrieNodeWords } = {}
    word: string | null = null
}

function findWords(board: string[][], words: string[]): string[] {
    const root = new TrieNodeWords()

    const buildTrie = (word: string) => {
        let node = root

        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNodeWords()
            }
            node = node.children[char]
        }

        node.word = word
    }

    for (const word of words) {
        buildTrie(word);
    }

    const result: string[] = [];

    function search(x: number, y: number, node: TrieNodeWords) {
        if (node.word !== null) {
            result.push(node.word);
            node.word = null;
        }

        // Outside of the boards
        if (x < 0 || y < 0 || x >= board.length || y >= board[0].length || !node.children[board[x][y]]) {
            return;
        }

        const char = board[x][y];
        const childNode = node.children[char];

        // Visit cell
        board[x][y] = '#';

        // Explore all directions
        search(x + 1, y, childNode);
        search(x - 1, y, childNode);
        search(x, y + 1, childNode);
        search(x, y - 1, childNode);

        // Backtracking
        board[x][y] = char; // Restore original state

        // Optimization: prune leaf node
        if (Object.keys(childNode.children).length === 0) {
            delete node.children[char];
        }
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (root.children[board[i][j]]) {
                search(i, j, root);
            }
        }
    }

    return result;
}
