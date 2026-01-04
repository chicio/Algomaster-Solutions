/**
 * https://leetcode.com/problems/find-eventual-safe-states/description/
 * 802. Find Eventual Safe States
 * 
 * There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].
 * 
 * A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).
 * 
 * Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.
 * 
 *  
 * 
 * Example 1:
 * 
 * Illustration of graph
 * Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
 * Output: [2,4,5,6]
 * Explanation: The given graph is shown above.
 * Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
 * Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
 * Example 2:
 * 
 * Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
 * Output: [4]
 * Explanation:
 * Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
 */

function safeNodeDfs(
    node: number, 
    graph: number[][], 
    visitingNodes: Set<number>,
    unsafeVisitedNodes: Set<number>,
    safeVisitedNodes: Set<number>
): boolean {
    if (visitingNodes.has(node)) {
        return false
    }

    if (safeVisitedNodes.has(node)) {
        return true
    }

    if (unsafeVisitedNodes.has(node)) {
        return false
    }

    visitingNodes.add(node)
    const nextNodes = graph[node]

    for (const nextNode of nextNodes) {
        if(!safeNodeDfs(nextNode, graph, visitingNodes, unsafeVisitedNodes, safeVisitedNodes)) {
            visitingNodes.delete(node)
            unsafeVisitedNodes.add(node)
            return false
        }
    }

    visitingNodes.delete(node)
    safeVisitedNodes.add(node)

    return true
}

function eventualSafeNodes(graph: number[][]): number[] {
    const visitingNodes = new Set<number>()
    const unsafeVisitedNodes = new Set<number>()
    const safeVisitedNodes = new Set<number>()
    const results: number[] = []

    for (let node = 0; node < graph.length; node++) {
        if (safeNodeDfs(node, graph, visitingNodes, unsafeVisitedNodes, safeVisitedNodes)) {
            results.push(node)
        }
    }

    return results
};

console.log(eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])) // [2,4,5,6]
console.log(eventualSafeNodes([[1,2,3,4],[1,2],[3,4],[0,4],[]])) // [4]
