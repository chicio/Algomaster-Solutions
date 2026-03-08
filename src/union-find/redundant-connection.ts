/**
 * https://leetcode.com/problems/redundant-connection
 * 684. Redundant Connection
 */

import { UnionFind } from "../union-find"

function findRedundantConnection(edges: number[][]): number[] {
    const n = edges.length
    const uf = new UnionFind(n + 1)

    for (const edge of edges) {
        const [u, v] = edge
        if (uf.find(u) === uf.find(v)) {
            return edge
        } else {
            uf.union(u, v)
        }
    }

    return [-1, -1]
};

console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]]))