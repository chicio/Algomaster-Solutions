import { Heap } from "./heap";

export type Edge = { node: number, cost: number };
export type HeapNode = { node: number; cost: number };

export function dijkstra(
    n: number,
    graph: Edge[][],
    start: number
): number[] {
    const dist: number[] = Array(n).fill(Infinity);
    dist[start] = 0;

    const minCostHeap = new Heap<HeapNode>((a, b) => a.cost - b.cost);
    minCostHeap.insert({ node: start, cost: 0 });

    while (minCostHeap.size() > 0) {
        const current = minCostHeap.extract()!;
        const { node, cost } = current;

        // entry is outdated
        if (cost > dist[node]) { 
            continue;
        }

        for (const { node: next, cost: weight } of graph[node]) {
            const newCost = cost + weight;

            if (newCost < dist[next]) {
                dist[next] = newCost;
                minCostHeap.insert({ node: next, cost: newCost });
            }
        }
    }

    return dist;
}