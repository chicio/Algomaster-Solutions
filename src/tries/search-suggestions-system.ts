class TrieNode {
    constructor(
        public children: Map<string, TrieNode> = new Map<string, TrieNode>(),
        public isEndOfWord: boolean = false,
        public suggestion: string[] = []
    ) { }
}

class Trie {
    private root = new TrieNode()

    insert(word: string): void {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }

            currentNode = currentNode.children.get(char)!;

            if (currentNode.suggestion.length < 3) {
                currentNode.suggestion.push(word);
            }
        }
        currentNode.isEndOfWord = true;
    }

    searchSuggestions(word: string): string[][] {
        const result: string[][] = [];
        let currentNode = this.root

        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);

            if (currentNode.children.has(char)) {
                currentNode = currentNode.children.get(char)!;
                result.push(currentNode.suggestion);
            } else {
                while (result.length < word.length) {
                    result.push([]);
                }
                break;
            }
        }

        return result
    }
}

function suggestedProducts(products: string[], searchWord: string): string[][] {
    let suggester = new Trie()
    products.sort();
    products.map(it => suggester.insert(it))

    return suggester.searchSuggestions(searchWord)
}

console.log(suggestedProducts(["mobile","mouse","moneypot","monitor","mousepad"], 'mouse'));
