/**
 * https://leetcode.com/problems/count-complete-tree-nodes/description/
 * 222. Count Complete Tree Nodes
 */

import {TreeNode} from "../tree-node";

function countNodes(root: TreeNode | null): number {
    if (!root) {
        return 0
    }

    let countLeft = countNodes(root.left)
    let countRight = countNodes(root.right)

    return 1 + countLeft + countRight
};
