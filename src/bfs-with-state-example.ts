type FlightEdge = [number, number]; // [neighbor, price]

function cheapestFlight(
    n: number,
    graph: FlightEdge[][],
    src: number,
    dst: number,
    k: number
): number {
    type State = {
        node: number;
        stops: number;
        cost: number;
    };

    const queue: State[] = [];
    queue.push({ node: src, stops: 0, cost: 0 });

    const visited: number[][] = Array.from({ length: n }, () =>
        Array(k + 2).fill(Infinity)
    );
    visited[src][0] = 0;

    while (queue.length > 0) {
        const { node, stops, cost } = queue.shift()!;

        if (stops > k) {
            continue;
        }

        for (const [next, price] of graph[node]) {
            const newCost = cost + price;
            const nextStops = stops + 1;

            if (newCost < visited[next][nextStops]) {
                visited[next][nextStops] = newCost;
                queue.push({
                    node: next,
                    stops: nextStops,
                    cost: newCost
                });
            }
        }
    }

    let answer = Infinity;
    for (let s = 0; s <= k + 1; s++) {
        answer = Math.min(answer, visited[dst][s]);
    }

    return answer === Infinity ? -1 : answer;
}