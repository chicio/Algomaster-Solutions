/**
 * https://leetcode.com/problems/distribute-coins-in-binary-tree/description/
 * 979. Distribute Coins in Binary Tree
 */

import {TreeNode} from "../tree-node";

function distributeCoins(root: TreeNode | null): number {
    let moves = 0

    function distribute(root: TreeNode | null): number {
        if (!root) {
            return 0
        }

        const leftExcess = distribute(root.left)
        const rightExcess = distribute(root.right)
        const excess = root.val + leftExcess + rightExcess - 1

        moves += Math.abs(leftExcess) + Math.abs(rightExcess)

        return excess
    }

    distribute(root)

    return moves
}
