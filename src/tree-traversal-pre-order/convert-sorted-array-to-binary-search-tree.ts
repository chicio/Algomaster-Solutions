/**
 * https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/
 * 108. Convert Sorted Array to Binary Search Tree
 */

import {TreeNode} from "../tree-node";

interface Middle {
    value: number
    position: number
}

function middle(array: number[]): Middle {
    const position = Math.round((array.length - 1) / 2)
    return { value: array[Math.round((array.length - 1) / 2)], position }
}

function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (nums.length === 0) {
        return null
    }

    const middleElement = middle(nums)
    const root = new TreeNode(
        middleElement.value,
        sortedArrayToBST(nums.slice(0, middleElement.position)),
        sortedArrayToBST(nums.slice(middleElement.position + 1, nums.length))
    )

    return root
}
