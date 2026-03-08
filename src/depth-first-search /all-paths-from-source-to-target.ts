/**
 * https://leetcode.com/problems/all-paths-from-source-to-target/description/
 * 797. All Paths From Source to Target
 */

function dfs(node: number, graph: number[][], path: number[], result: number[][]) {
    path.push(node)

    if (node === graph.length - 1) {
        result.push([...path])
    } else {
        for (const child of graph[node]) {
            dfs(child, graph, path, result)
        }
    }

    path.pop()
}

function allPathsSourceTarget(graph: number[][]): number[][] {
    const result: number[][] = []
    dfs(0, graph, [], result)
    return result
};
