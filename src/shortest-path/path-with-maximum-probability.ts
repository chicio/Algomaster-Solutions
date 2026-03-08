/**
 * https://leetcode.com/problems/path-with-maximum-probability/description/
 * 1514. Path with Maximum Probability
 */

import { Edge, HeapNode } from "../dijkstra";
import { Heap } from "../heap";

/// this version of dijkstra's algorithm is for maximization problems, instead of minimization problems.
/// it tries to find the path with the maximum product of edge weights, instead of the path with the minimum sum of edge weights.
function dijkstraMaximixation(
    n: number,
    graph: Edge[][],
    start: number
): number[] {
    const dist: number[] = Array(n).fill(0);
    dist[start] = 1;

    const maxCostHeap = new Heap<HeapNode>((a, b) => b.cost - a.cost);
    maxCostHeap.insert({ node: start, cost: 1 });

    while (maxCostHeap.size() > 0) {
        const current = maxCostHeap.extract()!;
        const { node, cost } = current;

        if (cost < dist[node]) { 
            continue;
        }

        for (const { node: next, cost: weight } of graph[node]) {
            const newCost = cost * weight;

            if (newCost > dist[next]) {
                dist[next] = newCost;
                maxCostHeap.insert({ node: next, cost: newCost });
            }
        }
    }

    return dist;
}

function createUndirectedGraph(edges: number[][], succProb: number[], n: number) { 
    const graph: Edge[][] =  Array.from({ length: n }, () => []);

    for (let i = 0; i < edges.length; i++) {
        const [u, v] = edges[i]
        const cost = succProb[i]
        graph[u].push({ node: v, cost }); 
        graph[v].push({ node: u, cost });
    }

    return graph;
}

function maxProbability(n: number, edges: number[][], succProb: number[], start_node: number, end_node: number): number {
    const graph = createUndirectedGraph(edges, succProb, n)
    const distances = dijkstraMaximixation(n, graph, start_node)
    return distances[end_node]
};

console.log(maxProbability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2)); // 0.25
console.log(maxProbability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.3], 0, 2)); // 0.3
console.log(maxProbability(3, [[0,1]], [0.5], 0, 2)); // 0