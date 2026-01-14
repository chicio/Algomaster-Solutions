/**
 * 547. Number of Provinces
 * 
 * There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.
 * 
 * A province is a group of directly or indirectly connected cities and no other cities outside of the group.
 * 
 * You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
 * 
 * Return the total number of provinces.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * Output: 2
 * Example 2:
 * 
 * 
 * Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
 * Output: 3
 *  
 * 
 * Constraints:
 * 
 * 1 <= n <= 200
 * n == isConnected.length
 * n == isConnected[i].length
 * isConnected[i][j] is 1 or 0.
 * isConnected[i][i] == 1
 * isConnected[i][j] == isConnected[j][i]
 */

class UnionFind {
    parent: number[]
    rank: number[]

    constructor(n: number) {
        this.parent = Array(n)
        this.rank = Array(n).fill(0)

        for (let i = 0; i < n; i++) {
            this.parent[i] = i
        }
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]) // path compression
        }
        return this.parent[x]
    }

    union(x: number, y: number): boolean {
        const rootX = this.find(x)
        const rootY = this.find(y)

        if (rootX === rootY) {
            return false
        }

        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX
        } else {
            this.parent[rootY] = rootX
            this.rank[rootX]++
        }

        return true
    }
}

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