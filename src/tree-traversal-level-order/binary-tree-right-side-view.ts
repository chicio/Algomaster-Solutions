/**
 * https://leetcode.com/problems/binary-tree-right-side-view/description/
 * 199. Binary Tree Right Side View
 */

import {TreeNode} from "../tree-node";

function rightSideView(root: TreeNode | null): number[] {
    if (!root) {
        return []
    }

    let queue: TreeNode[] = [root]
    let results: number[] = []

    while (queue.length > 0) {
        let levelSize = queue.length

        while (levelSize > 0) {
            const currentNode = queue.shift()!

            if (levelSize === 1) {
                results.push(currentNode.val)
            }

            if (currentNode.left) {
                queue.push(currentNode.left)
            }

            if (currentNode.right) {
                queue.push(currentNode.right)
            }

            levelSize--
        }
    }

    return results
}
