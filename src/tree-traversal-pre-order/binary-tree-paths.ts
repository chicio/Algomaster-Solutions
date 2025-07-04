/**
 * https://leetcode.com/problems/binary-tree-paths/
 * 257. Binary Tree Paths
 * Easy
 * Topics
 * premium lock icon
 * Companies
 * Given the root of a binary tree, return all root-to-leaf paths in any order.
 *
 * A leaf is a node with no children.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: root = [1,2,3,null,5]
 * Output: ["1->2->5","1->3"]
 * Example 2:
 *
 * Input: root = [1]
 * Output: ["1"]
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [1, 100].
 * -100 <= Node.val <= 100
 */

import {TreeNode} from "../tree-node";

function binaryTreePathsRecursive(root: TreeNode | null, rootToLeafs: string[], path: string) {
    if (!root) {
        return
    }

    if (!root.left && !root.right) {
        rootToLeafs.push(`${path}${root.val}`)
        return
    }

    binaryTreePathsRecursive(root.left, rootToLeafs, `${path}${root.val}->`)
    binaryTreePathsRecursive(root.right, rootToLeafs, `${path}${root.val}->`)
}

function binaryTreePaths(root: TreeNode | null): string[] {
    const rootToLeafs: string[] = []
    binaryTreePathsRecursive(root, rootToLeafs, "")
    return rootToLeafs
};
