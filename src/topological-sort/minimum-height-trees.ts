/**
 * 
 * 310. Minimum Height Trees
 * 
 * A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.
 * 
 * Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).
 * 
 * Return a list of all MHTs' root labels. You can return the answer in any order.
 * 
 * The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: n = 4, edges = [[1,0],[1,2],[1,3]]
 * Output: [1]
 * Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
 * Example 2:
 * 
 * 
 * Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
 * Output: [3,4]
 *  
 * 
 * Constraints:
 * 
 * 1 <= n <= 2 * 104
 * edges.length == n - 1
 * 0 <= ai, bi < n
 * ai != bi
 * All the pairs (ai, bi) are distinct.
 * The given input is guaranteed to be a tree and there will be no repeated edges.
 */

function createAdjacencyListAndDegree(edges: number[][], n: number) {
    const adjacencyList: number[][] = Array.from({ length: n }, () => [])
    const degree: number[] = Array(n).fill(0)

    for (const [u, v] of edges) {
        adjacencyList[u].push(v)
        adjacencyList[v].push(u)
        degree[u]++
        degree[v]++
    }

    return {
        adjacencyList,
        degree
    }
}

function prepareQueue(degree: number[], n: number) {
    const queue: number[] = []

    for (let i = 0; i < n; i ++) {
        if (degree[i] === 1) {
            queue.push(i)
        }
    }

    return queue    
}

function findMinHeightTrees(n: number, edges: number[][]): number[] {
    if (n === 1) {
        return [0]
    }

    const { adjacencyList, degree } = createAdjacencyListAndDegree(edges, n)
    const queue: number[] = prepareQueue(degree, n)

    let remainingNodes = n

    while (remainingNodes > 2) {
        const levelSize = queue.length
        remainingNodes -= levelSize

        for (let i = 0; i < levelSize; i++) {
            const leaf = queue.shift()!

            for (const neighbor of adjacencyList[leaf]) {
                degree[neighbor]--

                if (degree[neighbor] === 1) {
                    queue.push(neighbor)
                }
            }
        }
    }

    return queue
};

console.log(findMinHeightTrees(4, [[1,0],[1,2],[1,3]])) // [1]
console.log(findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]])) // [3,4]