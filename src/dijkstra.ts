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

type MatrixElement = { row: number; column: number; cost: number };

export function dijkstraMatrix(
    graph: number[][],
    distanceInit: number = 0,
    newCostCondition: (currentCost: number, currentValue: number, nextValue: number) => number
): number {
    const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]]
    const rows = graph.length
    const columns = graph[0].length
    const dist: number[][] = Array.from({ length: rows }, () => Array(columns).fill(Infinity));
    dist[0][0] = distanceInit;

    const minCostHeap = new Heap<MatrixElement>((a, b) => a.cost - b.cost);
    minCostHeap.insert({ row: 0, column: 0, cost: distanceInit });

    while (minCostHeap.size() > 0) {
        const current = minCostHeap.extract()!;
        const { row, column, cost } = current;

        if (cost > dist[row][column]) { 
            continue;
        }

        if (row == rows - 1 && column === columns - 1) {
            return cost
        }

        for (const [moveX, moveY] of directions) {
            const newRow = row + moveX
            const newColumn = column + moveY

            if (newRow < 0 || newRow >= rows || newColumn < 0 || newColumn >= columns) {
                continue;
            }

            const newCost = newCostCondition(cost, graph[row][column], graph[newRow][newColumn]);

            if (newCost < dist[newRow][newColumn]) {
                dist[newRow][newColumn] = newCost;
                minCostHeap.insert({ row: newRow, column: newColumn, cost: newCost });
            }
        }
    }

    return 0;
}