/**
 * https://leetcode.com/problems/network-delay-time/description/
 * 743. Network Delay Time
 */

import { dijkstra, Edge } from "../dijkstra";

function createGraph(times: number[][], n: number) { 
    const graph: Edge[][] =  Array.from({ length: n }, () => []);

    for (const [u, v, w] of times) {
        graph[u - 1].push({ node: v - 1, cost: w }); // -1, nodes are labelled from 1 to n
    }

    return graph;
}

function networkDelayTime(times: number[][], n: number, k: number): number {
    const graph: Edge[][] = createGraph(times, n);
    const distances = dijkstra(n, graph, k - 1); // -1, nodes are labelled from 1 to n
    const maxDist = Math.max(...distances);

    return maxDist === Infinity ? -1 : maxDist;
};

console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // 2
console.log(networkDelayTime([[1,2,1]], 2, 1));
