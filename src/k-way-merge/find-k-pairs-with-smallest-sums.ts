/**
 * https://leetcode.com/problems/find-k-pairs-with-smallest-sums/description/
 * 373. Find K Pairs with Smallest Sums
 */

import { Heap } from "../heap"

interface Position {
    i: number
    j: number
}

interface Pair {
    first: number
    second: number
}

function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    const result: number[][] = []

    if (nums1.length === 0 || nums2.length === 0) {
        return result
    } 

    const heap = new Heap<{ position: Position, pair: Pair }>((a, b) =>
        (a.pair.first + a.pair.second) - (b.pair.first + b.pair.second)
    )
    const visited = new Set<string>()

    heap.insert({ pair: { first: nums1[0], second: nums2[0] }, position: { i: 0, j: 0} })
    visited.add("0,0")

    while (k > 0 && heap.size() > 0) {
        const { position, pair } = heap.extract()!
        result.push([pair.first, pair.second])
        k--

        if (position.j + 1 < nums2.length && !visited.has(`${position.i},${position.j + 1}`)) {
            heap.insert({ 
                pair: { first: nums1[position.i], second: nums2[position.j + 1] }, 
                position: { i: position.i, j: position.j + 1 } 
            })
            visited.add(`${position.i},${position.j + 1}`)
        }

        if (position.j === 0 && position.i + 1 < nums1.length && !visited.has(`${position.i + 1},0`)) {
            heap.insert({ 
                pair: { first: nums1[position.i + 1], second: nums2[0] }, 
                position: { i: position.i + 1, j: 0 } 
            })
            visited.add(`${position.i + 1},0`)
        }
    }

    return result
}

console.log(kSmallestPairs([1,7,11], [2,4,6], 3)) // [[1,2],[1,4],[1,6]]
console.log(kSmallestPairs([1,1,2], [1,2,3], 2)) // [[1,1],[1,1]]