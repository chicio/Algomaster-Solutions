/**
 * https://leetcode.com/problems/binary-tree-inorder-traversal/description/
 * 94. Binary Tree Inorder Traversal
 */

import {TreeNode} from "../tree-node";

function inorderTraversal(root: TreeNode | null): number[] {
    let stack: TreeNode[] = []
    let result: number[] = []
    let current = root

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current)
            current = current.left
        }

        current = stack.pop()!
        result.push(current.val)
        current = current.right
    }

    return result
}
