/**
 * https://leetcode.com/problems/validate-binary-search-tree/description/
 * 98. Validate Binary Search Tree
 */

import {TreeNode} from "../tree-node";

function isValidBST(root: TreeNode | null): boolean {
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
            if (current.val <= previous) {
                return false
            }
        }

        previous = current.val
        current = current.right
    }

    return true
}
