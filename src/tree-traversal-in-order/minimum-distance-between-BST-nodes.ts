/**
 * https://leetcode.com/problems/minimum-distance-between-bst-nodes/description/
 * 783. Minimum Distance Between BST Nodes
 *
 * Given the root of a Binary Search Tree (BST), return the minimum difference between the values of any two different nodes in the tree.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: root = [4,2,6,1,3]
 * Output: 1
 * Example 2:
 *
 *
 * Input: root = [1,0,48,null,null,12,49]
 * Output: 1
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [2, 100].
 * 0 <= Node.val <= 105
 *
 *
 * Note: This question is the same as 530: https://leetcode.com/problems/minimum-absolute-difference-in-bst/
 */

import { TreeNode } from "../tree-node"

function minDiffInBST(root: TreeNode | null): number {
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
            min = Math.min(min, current.val - previous)
        }

        previous = current.val
        current = current.right
    }

    return min
}
