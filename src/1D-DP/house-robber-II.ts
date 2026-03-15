/**
 * https://leetcode.com/problems/house-robber-ii/description/
 * 213. House Robber II
 */

function houseRobber1(nums: number[]): number {
    let withoutPreviousHouse = 0
    let previousHouse = 0

    for (let i = 0; i < nums.length; i++) {
        const result = Math.max(
            nums[i] + withoutPreviousHouse, 
            previousHouse
        )
        withoutPreviousHouse = previousHouse
        previousHouse = result
    }

    return previousHouse
};

function rob2(nums: number[]): number {
    return Math.max(
        nums[0],
        houseRobber1(nums.slice(0, nums.length - 1)),
        houseRobber1(nums.slice(1))
    )
};

console.log(rob2([1, 2, 3, 1]))
console.log(rob2([2, 7, 9, 3, 1]))