/**
 * https://leetcode.com/problems/symmetric-tree/description/
 * 101. Symmetric Tree
 *
 * Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
 *
 *
 *
 * Example 1:
 *
 *
 * Input: root = [1,2,2,3,4,4,3]
 * Output: true
 * Example 2:
 *
 *
 * Input: root = [1,2,2,null,3,null,3]
 * Output: false
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [1, 1000].
 * -100 <= Node.val <= 100
 *
 *
 * Follow up: Could you solve it both recursively and iteratively?
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
