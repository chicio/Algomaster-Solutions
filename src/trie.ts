export class TrieNode {
    constructor(
        public children: Map<string, TrieNode> = new Map<string, TrieNode>(),
        public isEndOfWord: boolean = false
    ) { }
}
