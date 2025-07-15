/**
 * https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/
 * 114. Flatten Binary Tree to Linked List
 *
 * Given the root of a binary tree, flatten the tree into a "linked list":
 *
 * The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
 * The "linked list" should be in the same order as a pre-order traversal of the binary tree.
 *
 *
 * Example 1:
 *
 *
 * Input: root = [1,2,5,3,4,null,6]
 * Output: [1,null,2,null,3,null,4,null,5,null,6]
 * Example 2:
 *
 * Input: root = []
 * Output: []
 * Example 3:
 *
 * Input: root = [0]
 * Output: [0]
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 2000].
 * -100 <= Node.val <= 100
 *
 *
 * Follow up: Can you flatten the tree in-place (with O(1) extra space)?
 */

import {TreeNode} from "../tree-node";

function flatten(root: TreeNode | null): void {
    if (!root) {
        return
    }

    let stack = [root]
    let previous: TreeNode | null = null

    while (stack.length > 0) {
        const current = stack.pop()!

        if (previous) {
            previous.right = current
            previous.left = null
        }

        if (current.right) {
            stack.push(current.right)
        }

        if (current.left) {
            stack.push(current.left)
        }

        previous = current
    }
}

/// Recursive approach


function flattenList(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null
    }

    if (root.left === null && root.right === null) {
        return root
    }

    let leftNode = flattenList(root.left)
    let rightNode = flattenList(root.right)

    if (leftNode) {
        leftNode.right = root.right
        root.right = root.left
        root.left = null
    }

    return rightNode || leftNode
}


function flatten2(root: TreeNode | null): void {
    if (root === null) {
        return
    }

    flattenList(root)
};
