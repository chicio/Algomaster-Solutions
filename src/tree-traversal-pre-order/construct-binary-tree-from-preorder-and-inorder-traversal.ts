/**
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 * 105. Construct Binary Tree from Preorder and Inorder Traversal
 *
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 * Example 2:
 *
 * Input: preorder = [-1], inorder = [-1]
 * Output: [-1]
 *
 *
 * Constraints:
 *
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder and inorder consist of unique values.
 * Each value of inorder also appears in preorder.
 * preorder is guaranteed to be the preorder traversal of the tree.
 * inorder is guaranteed to be the inorder traversal of the tree.
 */

import {TreeNode} from "../tree-node";

function buildTreeWith(
    preorder: number[],
    inorder: number[],
    inorderRootIndexes: Map<number, number>
) {
    if (preorder.length === 0 || inorder.length === 0) {
        return null
    }

    const root = preorder[0]
    const rootIndex = inorderRootIndexes.get(root)!

    return new TreeNode(
        root,
        buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex)),
        buildTree(preorder.slice(rootIndex + 1, preorder.length), inorder.slice(rootIndex + 1, inorder.length))
    )
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const inorderIndexes = new Map<number, number>()

    for (let i = 0; i < inorder.length; i++) {
        inorderIndexes.set(inorder[i], i)
    }

    return buildTreeWith(preorder, inorder, inorderIndexes)
}
