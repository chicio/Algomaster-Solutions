/**
 * https://leetcode.com/problems/binary-tree-right-side-view/description/
 * 199. Binary Tree Right Side View
 *
 * Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
 *
 *
 *
 * Example 1:
 *
 * Input: root = [1,2,3,null,5,null,4]
 *
 * Output: [1,3,4]
 *
 * Explanation:
 *
 *
 *
 * Example 2:
 *
 * Input: root = [1,2,3,4,null,null,null,5]
 *
 * Output: [1,3,4,5]
 *
 * Explanation:
 *
 *
 *
 * Example 3:
 *
 * Input: root = [1,null,3]
 *
 * Output: [1,3]
 *
 * Example 4:
 *
 * Input: root = []
 *
 * Output: []
 *
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
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
