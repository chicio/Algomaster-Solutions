/**
 * https://leetcode.com/problems/minimum-distance-between-bst-nodes/description/
 * 783. Minimum Distance Between BST Nodes
 */

import { TreeNode } from "../tree-node"

function minDiffInBST(root: TreeNode | null): number {
    let stack: TreeNode[] = []
    let result: number[] = []
    let current = root
    let previous: number | null = null
    let min = Infinity

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current)
            current = current.left
        }

        current = stack.pop()!

        if (previous !== null) {
            min = Math.min(min, current.val - previous)
        }

        previous = current.val
        current = current.right
    }

    return min
}
