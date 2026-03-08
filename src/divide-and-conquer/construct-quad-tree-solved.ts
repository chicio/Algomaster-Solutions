/**
 * https://leetcode.com/problems/construct-quad-tree/description/
 * 427. Construct Quad Tree
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
