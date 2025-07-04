/**
 * https://leetcode.com/problems/binary-tree-preorder-traversal/description/
 * 144. Binary Tree Preorder Traversal
 *
 * Given the root of a binary tree, return the preorder traversal of its nodes' values.
 *
 *
 *
 * Example 1:
 *
 * Input: root = [1,null,2,3]
 *
 * Output: [1,2,3]
 *
 * Explanation:
 *
 *
 *
 * Example 2:
 *
 * Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
 *
 * Output: [1,2,4,5,6,7,3,8,9]
 *
 * Explanation:
 *
 *
 *
 * Example 3:
 *
 * Input: root = []
 *
 * Output: []
 *
 * Example 4:
 *
 * Input: root = [1]
 *
 * Output: [1]
 *
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
 *
 *
 * Follow up: Recursive solution is trivial, could you do it iteratively?
 */

import {TreeNode} from "../tree-node";

// Iterative Preorder Traversal

function preorderTraversalIterative(root: TreeNode | null): number[] {
    if (!root) {
        return []
    }

    let stack = [root]
    let preorder: number[] = []

    while (stack.length > 0) {
        const current = stack.pop()!
        preorder.push(current.val)

        if (current.right) {
            stack.push(current.right)
        }

        if (current.left) {
            stack.push(current.left)
        }
    }

    return preorder
}

// Recursive Preorder Traversal
function traverse(node: TreeNode | null, preorder: number[]) {
    if (!node) {
        return
    }

    preorder.push(node.val)

    traverse(node.left, preorder)
    traverse(node.right, preorder)
}

function preorderTraversalRecursive(root: TreeNode | null): number[] {
    const preorder: number[] = []

    traverse(root, preorder)
    return preorder
}
