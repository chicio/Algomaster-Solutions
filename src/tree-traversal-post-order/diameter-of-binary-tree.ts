/**
 * https://leetcode.com/problems/diameter-of-binary-tree/description/
 * 543. Diameter of Binary Tree
 */

import {TreeNode} from "../tree-node";

function diameterOfBinaryTree(root: TreeNode | null): number {
    let maxDiameter = 0

    function height(root: TreeNode | null): number {
        if (!root) {
            return 0
        }

        const leftHeight = height(root.left)
        const rightHeight = height(root.right)

        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight)

        return 1 + Math.max(leftHeight, rightHeight)
    }

    height(root)

    return maxDiameter
}
