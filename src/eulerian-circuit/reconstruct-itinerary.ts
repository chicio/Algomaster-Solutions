/**
 * https://leetcode.com/problems/reconstruct-itinerary/
 * 332. Reconstruct Itinerary
 * 
 * You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.
 * 
 * All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.
 * 
 * For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
 * You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
 * Output: ["JFK","MUC","LHR","SFO","SJC"]
 * Example 2:
 * 
 * 
 * Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
 * Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
 * Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.
 *  
 * 
 * Constraints:
 * 
 * 1 <= tickets.length <= 300
 * tickets[i].length == 2
 * fromi.length == 3
 * toi.length == 3
 * fromi and toi consist of uppercase English letters.
 * fromi != toi
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