/**
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/
 * 230. Kth Smallest Element in a BST
 */

import {TreeNode} from "../tree-node";

function kthSmallest(root: TreeNode | null, k: number): number {
    let stack: TreeNode[] = []
    let current = root
    let currentIndex = 1

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current)
            current = current.left
        }

        current = stack.pop()!

        if (currentIndex++ === k) {
            return current.val
        }

        current = current.right
    }

    return -1
}
