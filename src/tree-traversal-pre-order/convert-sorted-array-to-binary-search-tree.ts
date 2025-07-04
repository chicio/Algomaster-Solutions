/**
 * https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/
 * 108. Convert Sorted Array to Binary Search Tree
 *
 * Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: nums = [-10,-3,0,5,9]
 * Output: [0,-3,9,-10,null,5]
 * Explanation: [0,-10,5,null,-3,null,9] is also accepted:
 *
 * Example 2:
 *
 *
 * Input: nums = [1,3]
 * Output: [3,1]
 * Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 104
 * -104 <= nums[i] <= 104
 * nums is sorted in a strictly increasing order.
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
