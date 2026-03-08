/**
 * https://leetcode.com/problems/path-sum-iii/description/
 * 437. Path Sum III
 */

import {TreeNode} from "../tree-node";

function checkPathSum(root: TreeNode | null, targetSum: number): number {
    if (!root) {
        return 0
    }

    const validPath = root.val === targetSum ? 1 : 0

    return validPath + checkPathSum(root.left, targetSum - root.val) + checkPathSum(root.right, targetSum - root.val);
}

function pathSum(root: TreeNode | null, targetSum: number): number {
    if (!root) {
        return 0
    }

    let rootCount = checkPathSum(root, targetSum)
    let countLeft = pathSum(root.left, targetSum)
    let countRight = pathSum(root.right, targetSum)

    return rootCount + countLeft + countRight
}
