/**
 * https://leetcode.com/problems/find-eventual-safe-states/description/
 * 802. Find Eventual Safe States
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
