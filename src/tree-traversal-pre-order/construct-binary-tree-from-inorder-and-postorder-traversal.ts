/**
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 * 106. Construct Binary Tree from Inorder and Postorder Traversal
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
