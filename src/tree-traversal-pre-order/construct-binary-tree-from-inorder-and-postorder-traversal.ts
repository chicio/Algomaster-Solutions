/**
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 * 106. Construct Binary Tree from Inorder and Postorder Traversal
 *
 * Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * Output: [3,9,20,null,null,15,7]
 * Example 2:
 *
 * Input: inorder = [-1], postorder = [-1]
 * Output: [-1]
 *
 *
 * Constraints:
 *
 * 1 <= inorder.length <= 3000
 * postorder.length == inorder.length
 * -3000 <= inorder[i], postorder[i] <= 3000
 * inorder and postorder consist of unique values.
 * Each value of postorder also appears in inorder.
 * inorder is guaranteed to be the inorder traversal of the tree.
 * postorder is guaranteed to be the postorder traversal of the tree.
 */

import {TreeNode} from "../tree-node";

function buildTreeWith(
    inorder: number[],
    postorder: number[],
    inorderRootIndexes: Map<number, number>
): TreeNode | null {
    if (inorder.length === 0 || postorder.length === 0) {
        return null
    }

    const root = postorder[postorder.length - 1]
    const rootIndex = inorderRootIndexes.get(root)!

    return new TreeNode(
        root,
        buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex)),
        buildTree(inorder.slice(rootIndex + 1, inorder.length), postorder.slice(rootIndex, postorder.length - 1))
    )
}

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    const inorderIndexes = new Map<number, number>()

    for (let i = 0; i < inorder.length; i++) {
        inorderIndexes.set(inorder[i], i)
    }

    return buildTreeWith(inorder, postorder, inorderIndexes)
}
