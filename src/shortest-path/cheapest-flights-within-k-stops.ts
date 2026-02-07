/**
 * 787. Cheapest Flights Within K Stops
 * 
 * There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.
 * 
 * You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
 * Output: 700
 * Explanation:
 * The graph is shown above.
 * The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
 * Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
 * Example 2:
 * 
 * 
 * Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
 * Output: 200
 * Explanation:
 * The graph is shown above.
 * The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
 * Example 3:
 * 
 * 
 * Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
 * Output: 500
 * Explanation:
 * The graph is shown above.
 * The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.
 *  
 * 
 * Constraints:
 * 
 * 2 <= n <= 100
 * 0 <= flights.length <= (n * (n - 1) / 2)
 * flights[i].length == 3
 * 0 <= fromi, toi < n
 * fromi != toi
 * 1 <= pricei <= 104
 * There will not be any multiple flights between two cities.
 * 0 <= src, dst, k < n
 * src != dst
 */

import { Edge } from "../dijkstra";

type State = {
    node: number,
    cost: number,
    stops: number
}

function createGraph(flights: number[][], n: number) { 
    const graph: Edge[][] =  Array.from({ length: n }, () => []);

    for (const [u, v, w] of flights) {
        graph[u].push({ node: v, cost: w });
    }

    return graph;
}

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
    const graph = createGraph(flights, n);
    let head = 0;
    const queue: State[] = [{ node: src, cost: 0, stops: 0 }];
    const visited: number[][] = Array.from({ length: n }, () =>
        Array(k + 2).fill(Infinity)
    );
    visited[src][0] = 0;

    while (head < queue.length) {
        const { node, cost, stops } = queue[head++];
        
        if (node === dst) {
            continue;
        }

        if (stops > k) {
            continue;
        }

        for (const { node: next, cost: nextCost } of graph[node]) {
            const newCost = cost + nextCost
            const newStops = stops + 1

            if (newCost < visited[next][newStops]) {
                visited[next][newStops] = newCost
                queue.push({
                    node: next,
                    cost: newCost,
                    stops: newStops
                })
            }
        }
    }
    
    let answer = Infinity;
    for (let s = 0; s <= k + 1; s++) {
        answer = Math.min(answer, visited[dst][s]);
    }

    return answer === Infinity ? -1 : answer;
};

console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1)); // 200
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0)); // 500