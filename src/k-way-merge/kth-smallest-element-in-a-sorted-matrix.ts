/**
 * https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
 * 378. Kth Smallest Element in a Sorted Matrix
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