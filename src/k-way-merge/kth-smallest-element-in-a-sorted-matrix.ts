/**
 * https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
 * 378. Kth Smallest Element in a Sorted Matrix
 * Solved
 * Medium
 * 
 * Topics
 * premium lock icon
 * Companies
 * Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.
 * 
 * Note that it is the kth smallest element in the sorted order, not the kth distinct element.
 * 
 * You must find a solution with a memory complexity better than O(n2).
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
 * Output: 13
 * Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13
 * Example 2:
 * 
 * Input: matrix = [[-5]], k = 1
 * Output: -5
 *  
 * 
 * Constraints:
 * 
 * n == matrix.length == matrix[i].length
 * 1 <= n <= 300
 * -109 <= matrix[i][j] <= 109
 * All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.
 * 1 <= k <= n2
 *  
 * 
 * Follow up:
 * 
 * Could you solve the problem with a constant memory (i.e., O(1) memory complexity)?
 * Could you solve the problem in O(n) time complexity? The solution may be too advanced for an interview but you may find reading this paper fun.
 */

import { Heap } from "../heap"

interface Position {
    i: number
    j: number
}

function kthSmallest(matrix: number[][], k: number): number {
    const heap = new Heap<{ position: Position, value: number }>((a, b) => a.value - b.value)
    const visited = new Set<string>()

    heap.insert({ position: { i: 0, j: 0}, value: matrix[0][0] })
    visited.add("0,0")

    while (--k > 0 && heap.size() > 0) {
        const { position } = heap.extract()!

        if (position.j + 1 < matrix[0].length && !visited.has(`${position.i},${position.j + 1}`)) {
            heap.insert({ 
                value: matrix[position.i][position.j + 1], 
                position: { i: position.i, j: position.j + 1 } 
            })
            visited.add(`${position.i},${position.j + 1}`)
        }

        if (position.j === 0 && position.i + 1 < matrix.length && !visited.has(`${position.i + 1},0`)) {
            heap.insert({ 
                value: matrix[position.i + 1][0], 
                position: { i: position.i + 1, j: 0 } 
            })
            visited.add(`${position.i + 1},0`)
        }
    }

    return heap.extract()!.value
}