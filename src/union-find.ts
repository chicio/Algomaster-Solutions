export class UnionFind {
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