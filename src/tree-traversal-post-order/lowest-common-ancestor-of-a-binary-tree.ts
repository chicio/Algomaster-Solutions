/**
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/
 * 236. Lowest Common Ancestor of a Binary Tree
 */

import {TreeNode} from "../tree-node";

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (root === null || root === p || root === q) {
        return root
    }

    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)

    if (left && right) {
        return root
    }

    return left || right
}

// Iterative solution

function lowestCommonAncestorIterative(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root || !p || !q) {
        return null;
    }

    const stack: TreeNode[] = [root];
    const parent = new Map<TreeNode, TreeNode | null>();
    parent.set(root, null);

    while (!parent.has(p) || !parent.has(q)) {
        const node = stack.pop()!;
        if (node.left) {
            parent.set(node.left, node);
            stack.push(node.left);
        }
        if (node.right) {
            parent.set(node.right, node);
            stack.push(node.right);
        }
    }

    const ancestors = new Set<TreeNode>();
    while (p !== null) {
        ancestors.add(p);
        p = parent.get(p)!;
    }

    while (!ancestors.has(q)) {
        q = parent.get(q)!;
    }

    return q;
}
