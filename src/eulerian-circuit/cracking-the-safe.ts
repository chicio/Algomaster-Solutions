/**
 * https://leetcode.com/problems/cracking-the-safe/
 * 753. Cracking the Safe
 */

function hierholzer(node: string, k: number, visited: Set<string>, path: string[]) {
    for (let i = 0; i < k; i++) {
        const edge = node + i; 

        if (!visited.has(edge)) {
            visited.add(edge);
            hierholzer(edge.slice(1), k, visited, path);
            path.push(i.toString());
        }
    }
}

function crackSafe(n: number, k: number): string {
    const visited = new Set<string>();
    const path: string[] = [];
    const startNode = "0".repeat(n - 1);

    hierholzer(startNode, k, visited, path);

    return startNode + path.reverse().join("");
}

console.log(crackSafe(1, 2))
console.log(crackSafe(2, 2))
console.log(crackSafe(3, 2))
console.log(crackSafe(4, 2))