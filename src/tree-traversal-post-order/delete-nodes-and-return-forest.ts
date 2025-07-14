/**
 * https://leetcode.com/problems/delete-nodes-and-return-forest/description/
 * 1110. Delete Nodes And Return Forest
 *
 * Given the root of a binary tree, each node in the tree has a distinct value.
 *
 * After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).
 *
 * Return the roots of the trees in the remaining forest. You may return the result in any order.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
 * Output: [[1,2,null,4],[6],[7]]
 * Example 2:
 *
 * Input: root = [1,2,4,null,3], to_delete = [3]
 * Output: [[1,2,4]]
 *
 *
 * Constraints:
 *
 * The number of nodes in the given tree is at most 1000.
 * Each node has a distinct value between 1 and 1000.
 * to_delete.length <= 1000
 * to_delete contains distinct values between 1 and 1000.
 */

import {TreeNode} from "../tree-node";

function delNodes(root: TreeNode | null, to_delete: number[]): Array<TreeNode | null> {
    let result: (TreeNode | null)[] = []

    if (root == null) {
        return result;
    }

    let stackVisit: TreeNode[] = [root]
    let stackVisited: TreeNode[] = []
    let parents = new Map<TreeNode, TreeNode>()

    while (stackVisit.length > 0) {
        let current = stackVisit.pop()!
        stackVisited.push(current)

        if (current.left) {
            stackVisit.push(current.left)
            parents.set(current.left, current)
        }

        if (current.right) {
            stackVisit.push(current.right)
            parents.set(current.right, current)
        }
    }

    const toDelete = new Set(to_delete)

    while (stackVisited.length > 0) {
        const current = stackVisited.pop()!

        if (toDelete.has(current.val)) {
            if (current.left && !toDelete.has(current.left.val)) {
                result.push(current.left)
            }

            if (current.right && !toDelete.has(current.right.val)) {
                result.push(current.right)
            }

            const parent = parents.get(current)

            if (parent) {
                if (parent.left === current) {
                    parent.left = null
                } else {
                    parent.right = null
                }
            }
        }
    }

    if (!toDelete.has(root.val)) {
        result.push(root)
    }

    return result
}
