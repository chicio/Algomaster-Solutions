/**
 * https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/submissions/1846270218/
 * 863. All Nodes Distance K in Binary Tree
 */

import { TreeNode } from "../tree-node"

function dfsToConvertToGraph(node: TreeNode | null, par: TreeNode | null, parent: Map<TreeNode, TreeNode | null>) {
    if (!node) { 
        return
    }
    
    parent.set(node, par)

    dfsToConvertToGraph(node.left, node, parent)
    dfsToConvertToGraph(node.right, node, parent)
}

function distanceK(root: TreeNode | null, target: TreeNode | null, k: number): number[] {
    // Step 1: parent map
    const parent = new Map<TreeNode, TreeNode | null>()
    dfsToConvertToGraph(root, null, parent)

    // Step 2: BFS from target
    const queue: [TreeNode, number][] = [[target!, 0]]
    const visited = new Set<TreeNode>()
    visited.add(target!)

    const result: number[] = []

    while (queue.length > 0) {
        const [node, dist] = queue.shift()!

        if (dist === k) {
            result.push(node.val)
            continue
        }

        // neighbor(node) = [node.left, node.right, parent[node]]
        for (const neighbor of [node.left, node.right, parent.get(node)]) {
            if (neighbor && !visited.has(neighbor)) {
                visited.add(neighbor)
                queue.push([neighbor, dist + 1])
            }
        }
    }

    return result;    
};