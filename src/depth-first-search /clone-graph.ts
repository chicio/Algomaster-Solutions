/**
 * https://leetcode.com/problems/clone-graph/description/
 * 133. Clone Graph
 */

  // Definition for _Node.
  class _Node2 {
      val: number
      neighbors: _Node2[]

      constructor(val?: number, neighbors?: _Node2[]) {
          this.val = (val===undefined ? 0 : val)
          this.neighbors = (neighbors===undefined ? [] : neighbors)
      }
  }

function cloneDfs(currentNode: _Node2 | null, visited: Map<_Node2, _Node2>): _Node2 | null {
    if (!currentNode) {
        return null
    }

    if (visited.has(currentNode)) {
        return visited.get(currentNode)!
    }

    const clonedNode = new _Node2(currentNode.val, [])
    visited.set(currentNode, clonedNode)

    for (const neighbor of currentNode.neighbors) {
        clonedNode.neighbors.push(cloneDfs(neighbor, visited)!)
    }

    return clonedNode
}

function cloneGraph(node: _Node2 | null): _Node2 | null {
	return cloneDfs(node, new Map<_Node2, _Node2>())
};