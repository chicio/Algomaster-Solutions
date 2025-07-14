/**
 * https://leetcode.com/problems/binary-tree-postorder-traversal/description/
 * 145. Binary Tree Postorder Traversal
 *
 * Given the root of a binary tree, return the postorder traversal of its nodes' values.
 *
 *
 *
 * Example 1:
 *
 * Input: root = [1,null,2,3]
 *
 * Output: [3,2,1]
 *
 * Explanation:
 *
 *
 *
 * Example 2:
 *
 * Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
 *
 * Output: [4,6,7,5,2,9,8,3,1]
 *
 * Explanation:
 *
 *
 *
 * Example 3:
 *
 * Input: root = []
 *
 * Output: []
 *
 * Example 4:
 *
 * Input: root = [1]
 *
 * Output: [1]
 */
import {TreeNode} from "../tree-node";

function postorderTraversal(root: TreeNode | null): number[] {
    let result: number[] = []

    if (root == null) {
        return result;
    }

    let stackVisit: TreeNode[] = [root]
    let stackVisited: number[] = []

    while (stackVisit.length > 0) {
        let current = stackVisit.pop()!
        stackVisited.push(current.val)

        if (current.left) {
            stackVisit.push(current.left)
        }

        if (current.right) {
            stackVisit.push(current.right)
        }
    }

    while (stackVisited.length > 0) {
        result.push(stackVisited.pop()!)
    }

    return result
}
