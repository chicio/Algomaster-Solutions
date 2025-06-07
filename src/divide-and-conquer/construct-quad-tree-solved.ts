/**
 * https://leetcode.com/problems/construct-quad-tree/description/
 * 427. Construct Quad Tree
 *
 * Given a n * n matrix grid of 0's and 1's only. We want to represent grid with a Quad-Tree.
 *
 * Return the root of the Quad-Tree representing grid.
 *
 * A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:
 *
 * val: True if the node represents a grid of 1's or False if the node represents a grid of 0's. Notice that you can assign the val to True or False when isLeaf is False, and both are accepted in the answer.
 * isLeaf: True if the node is a leaf node on the tree or False if the node has four children.
 * class Node {
 *     public boolean val;
 *     public boolean isLeaf;
 *     public Node topLeft;
 *     public Node topRight;
 *     public Node bottomLeft;
 *     public Node bottomRight;
 * }
 * We can construct a Quad-Tree from a two-dimensional area using the following steps:
 *
 * If the current grid has the same value (i.e all 1's or all 0's) set isLeaf True and set val to the value of the grid and set the four children to Null and stop.
 * If the current grid has different values, set isLeaf to False and set val to any value and divide the current grid into four sub-grids as shown in the photo.
 * Recurse for each of the children with the proper sub-grid.
 *
 * If you want to know more about the Quad-Tree, you can refer to the wiki.
 *
 * Quad-Tree format:
 *
 * You don't need to read this section for solving the problem. This is only if you want to understand the output format here. The output represents the serialized format of a Quad-Tree using level order traversal, where null signifies a path terminator where no node exists below.
 *
 * It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list [isLeaf, val].
 *
 * If the value of isLeaf or val is True we represent it as 1 in the list [isLeaf, val] and if the value of isLeaf or val is False we represent it as 0.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: grid = [[0,1],[1,0]]
 * Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
 * Explanation: The explanation of this example is shown below:
 * Notice that 0 represents False and 1 represents True in the photo representing the Quad-Tree.
 *
 * Example 2:
 *
 *
 *
 * Input: grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
 * Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
 * Explanation: All values in the grid are not the same. We divide the grid into four sub-grids.
 * The topLeft, bottomLeft and bottomRight each has the same value.
 * The topRight have different values so we divide it into 4 sub-grids where each has the same value.
 * Explanation is shown in the photo below:
 *
 *
 *
 * Constraints:
 *
 * n == grid.length == grid[i].length
 * n == 2x where 0 <= x <= 6
 */


class _QuadNode {
    val: boolean
    isLeaf: boolean
    topLeft: _QuadNode | null
	topRight: _QuadNode | null
	bottomLeft: _QuadNode | null
	bottomRight: _QuadNode | null
	constructor(val?: boolean, isLeaf?: boolean, topLeft?: _QuadNode | null, topRight?: _QuadNode | null, bottomLeft?: _QuadNode | null, bottomRight?: _QuadNode | null) {
        this.val = (val===undefined ? false : val)
        this.isLeaf = (isLeaf===undefined ? false : isLeaf)
        this.topLeft = (topLeft===undefined ? null : topLeft)
        this.topRight = (topRight===undefined ? null : topRight)
        this.bottomLeft = (bottomLeft===undefined ? null : bottomLeft)
        this.bottomRight = (bottomRight===undefined ? null : bottomRight)
  }
}


function allQuadrantsAreLeafAndEqual(
    topLeft: _QuadNode | null,
    topRight: _QuadNode | null,
    bottomLeft: _QuadNode | null,
    bottomRight: _QuadNode | null
): boolean {
    return (topLeft?.isLeaf &&
        topRight?.isLeaf &&
        bottomLeft?.isLeaf &&
        bottomRight?.isLeaf &&
        topLeft.val === topRight.val &&
        topRight.val === bottomLeft.val &&
        bottomLeft.val === bottomRight.val) ?? false;
}

function constructQuad(grid: number[][], row: number, column: number, size: number): _QuadNode | null {
    if (size === 1) {
        return new _QuadNode(grid[row][column] == 1, true)
    }

    let middle = Math.floor(size / 2)
    let topLeft = constructQuad(grid, row, column, middle)
    let topRight = constructQuad(grid, row, column + middle, middle)
    let bottomLeft = constructQuad(grid, row + middle, column, middle)
    let bottomRight = constructQuad(grid, row + middle, column + middle, middle)

    if (allQuadrantsAreLeafAndEqual(topLeft, topRight, bottomLeft, bottomRight)) {
        return new _QuadNode(topLeft?.val, true);
    }

    return new _QuadNode(
        false, // when you have leafs, it doesn't matter!
        false,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    )
}

function construct(grid: number[][]): _QuadNode | null {
    return constructQuad(grid, 0, 0, grid.length)
}
