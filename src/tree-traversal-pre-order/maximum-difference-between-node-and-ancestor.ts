/**
 * https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/
 * 1026. Maximum Difference Between Node and Ancestor
 */

import {TreeNode} from "../tree-node";

interface SubTreeMaxMin {
    max: number
    min: number
}

function findDiff(root: TreeNode | null, currentMaxMin: SubTreeMaxMin): number {
    if (!root) {
        return currentMaxMin.max - currentMaxMin.min
    }

    const newMaxMin = {
        min: Math.min(currentMaxMin.min, root.val),
        max: Math.max(currentMaxMin.max, root.val)
    }
    const leftDiff = findDiff(root.left, newMaxMin)
    const rightDiff = findDiff(root.right, newMaxMin)

    return Math.max(rightDiff, leftDiff)
}

function maxAncestorDiff(root: TreeNode | null): number {
    const defaultMinMax = { max: -Infinity, min: Infinity }
    return findDiff(root, defaultMinMax)
}
