/**
 * https://leetcode.com/problems/maximum-binary-tree/description/
 * 654. Maximum Binary Tree
 */

import {TreeNode} from "../tree-node";

function constructMaximumBinaryTreeUsing(nums: number[], start: number, end: number): TreeNode | null  {
    if (start > end) {
        return null
    }

    let maxIndex = start

    for (let i = start + 1; i <= end; i++) {
        if (nums[i] > nums[maxIndex]) {
            maxIndex = i
        }
    }

    return new TreeNode(
        nums[maxIndex],
        constructMaximumBinaryTreeUsing(nums, start, maxIndex - 1),
        constructMaximumBinaryTreeUsing(nums, maxIndex + 1, end),
    )
}

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
    return constructMaximumBinaryTreeUsing(nums, 0, nums.length - 1)
}
