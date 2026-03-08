/**
 * https://leetcode.com/problems/reconstruct-itinerary/
 * 332. Reconstruct Itinerary
 */

import { eulerianPath } from "../eulerian-path"

function constructGraph(tickets: string[][]) {
    const graph = new Map<string, string[]>()

    for (const [from, to] of tickets) {
        const toList = graph.get(from)

        if (toList) {
            graph.set(from, (graph.get(from) || []).concat(to))
        } else {
            graph.set(from, [to])
        }
    }

    for (const [from, toList] of graph) {
        toList.sort()
    }

    return graph
}


function findItinerary(tickets: string[][]): string[] {
    const graph = constructGraph(tickets)
    
    return eulerianPath("JFK", graph)
};

console.log(findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]))
console.log(findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]))