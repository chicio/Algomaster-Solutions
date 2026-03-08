/**
 * https://leetcode.com/problems/word-search-ii/description/
 * 212. Word Search II
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
