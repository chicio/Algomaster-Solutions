/**
 * https://leetcode.com/problems/binary-search-tree-iterator/description/
 * 173. Binary Search Tree Iterator
 */

import {TreeNode} from "../tree-node";

class BSTIterator {
    private stack: TreeNode[] = []

    constructor(root: TreeNode | null) {
        this.goLeft(root)
    }

    private goLeft(root: TreeNode | null) {
        let current = root

        while (current) {
            this.stack.push(current)
            current = current.left
        }
    }

    next(): number {
        let current = this.stack.pop()!

        if (current.right) {
            this.goLeft(current.right)
        }

        return current.val
    }

    hasNext(): boolean {
        return this.stack.length > 0
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
