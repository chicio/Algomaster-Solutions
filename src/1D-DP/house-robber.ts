/**
 * https://leetcode.com/problems/house-robber/description/
 * 198. House Robber
 */

function rob(nums: number[]): number {
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

console.log(rob([1, 2, 3, 1])) // 4
console.log(rob([2, 7, 9, 3, 1])) // 12