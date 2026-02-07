export type Edge = { node: number; cost: number };

export function bellmanFord(n: number, graph: Edge[][], src: number, maxStops: number): number[] {
    const dist: number[] = Array(n).fill(Infinity);
    dist[src] = 0;

    for (let i = 0; i <= maxStops; i++) {
        const temp = dist.slice();

        for (let u = 0; u < n; u++) {
            if (dist[u] === Infinity) continue;

            for (const { node: v, cost: w } of graph[u]) {
                if (dist[u] + w < temp[v]) {
                    temp[v] = dist[u] + w;
                }
            }
        }

        dist.splice(0, n, ...temp);
    }

    return dist;
}