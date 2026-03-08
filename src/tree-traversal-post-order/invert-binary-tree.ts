/**
 * https://leetcode.com/problems/invert-binary-tree/description/
 * 226. Invert Binary Tree
 */
import {TreeNode} from "../tree-node";

function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return root
    }

    const leftNode = invertTree(root.left)
    const rightNode = invertTree(root.right)

    root.left = rightNode
    root.right = leftNode

    return root
}
