/**
 * https://leetcode.com/problems/number-of-provinces
 * 547. Number of Provinces
 */

import { UnionFind } from "../union-find"

function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length
    const uf = new UnionFind(n)
    let count = n

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (isConnected[i][j] === 1) {
                if (uf.find(i) !== uf.find(j)) {
                    uf.union(i, j)
                    count--
                }
            }
        }
    }

    return count
};

console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))