/**
 * https://leetcode.com/problems/symmetric-tree/description/
 * 101. Symmetric Tree
 */

import {TreeNode} from "../tree-node";

function isSymmetricRecursive(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) {
        return true
    }

    if (!p || !q) {
        return false
    }

    return p.val === q.val && isSymmetricRecursive(p.left, q.right) && isSymmetricRecursive(p.right, q.left)
}


function isSymmetric(root: TreeNode | null): boolean {
    if (!root) {
        return true
    }

    return isSymmetricRecursive(root.left, root.right)
}
