/**
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/
 * 103. Binary Tree Zigzag Level Order Traversal
 *
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).
 *
 *
 *
 * Example 1:
 *
 *
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[20,9],[15,7]]
 * Example 2:
 *
 * Input: root = [1]
 * Output: [[1]]
 * Example 3:
 *
 * Input: root = []
 * Output: []
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 2000].
 * -100 <= Node.val <= 100
 */

import {TreeNode} from "../tree-node";

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (!root) {
        return []
    }

    let queue = [root]
    let levels: number[][] = []
    let levelIndex = 0

    while (queue.length > 0) {
        let levelSize = queue.length
        let level = []

        while (levelSize > 0) {
            let currentNode: TreeNode = queue.shift()!

            if (levelIndex % 2 === 0) {
                level.push(currentNode.val)
            } else {
                level.unshift(currentNode.val)
            }

            if (currentNode.left) {
                queue.push(currentNode.left)
            }

            if (currentNode.right) {
                queue.push(currentNode.right)
            }

            levelSize--
        }

        levelIndex++
        levels.push(level)
    }

    return levels
}
