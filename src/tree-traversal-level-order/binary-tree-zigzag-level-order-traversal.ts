/**
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/
 * 103. Binary Tree Zigzag Level Order Traversal
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
