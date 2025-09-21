/**
 * 
 * https://leetcode.com/problems/find-k-pairs-with-smallest-sums/description/
 * 373. Find K Pairs with Smallest Sums
 * Solved
 * Medium
 * Topics
 * premium lock icon
 * Companies
 * You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k.
 * 
 * Define a pair (u, v) which consists of one element from the first array and one element from the second array.
 * 
 * Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
 * Output: [[1,2],[1,4],[1,6]]
 * Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
 * Example 2:
 * 
 * Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
 * Output: [[1,1],[1,1]]
 * Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
 *  
 * 
 * Constraints:
 * 
 * 1 <= nums1.length, nums2.length <= 105
 * -109 <= nums1[i], nums2[i] <= 109
 * nums1 and nums2 both are sorted in non-decreasing order.
 * 1 <= k <= 104
 * k <= nums1.length * nums2.length
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