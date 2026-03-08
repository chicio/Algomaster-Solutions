/**
 * https://leetcode.com/problems/binary-tree-postorder-traversal/description/
 * 145. Binary Tree Postorder Traversal
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
