/**
 * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/
 * 297. Serialize and Deserialize Binary Tree
 *
 * Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
 *
 * Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
 *
 * Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: root = [1,2,3,null,null,4,5]
 * Output: [1,2,3,null,null,4,5]
 * Example 2:
 *
 * Input: root = []
 * Output: []
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 104].
 * -1000 <= Node.val <= 1000
 */

import {TreeNode} from "../tree-node";

function levelOrderSerialize(root: TreeNode | null): string {
    if (!root) {
        return ''
    }

    let queue: (TreeNode | null)[] = [root]
    let levels: (number | null)[] = []

    while (queue.length > 0) {
        let current = queue.shift()

        if (current) {
            levels.push(current.val)
            queue.push(current.left)
            queue.push(current.right)
        } else {
            levels.push(null)
        }
    }

    while (levels[levels.length - 1] === null) {
        levels.pop();
    }

    return levels.map(v => v === null ? "null" : v.toString()).join(",");
};

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
    return levelOrderSerialize(root)
};

function levelOrderDeserialize(data: string): TreeNode | null {
    if (data === '') {
        return null;
    }

    const values = data.split(',').map(v => v === "null" ? null : Number(v));
    const root = new TreeNode(values[0]!);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (queue.length > 0 && i < values.length) {
        const node = queue.shift()!;

        const left = values[i++];

        if (left !== null) {
            node.left = new TreeNode(left);
            queue.push(node.left);
        }

        if (i < values.length) {
            const right = values[i++];

            if (right !== null) {
                node.right = new TreeNode(right);
                queue.push(node.right);
            }
        }
    }

    return root;
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    return levelOrderDeserialize(data)
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
