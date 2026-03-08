/**
 * https://leetcode.com/problems/move-zeroes/description/
 * 283. Move Zeroes
 */
function moveZeroes(nums: number[]): void {
    let firstZero = 0
    let tempElement = Infinity

    for (let current = 0; current < nums.length; current++) {
        tempElement = nums[current]
        nums[current] = 0

        if (tempElement !== 0) {
            nums[firstZero] = tempElement
            firstZero++
        }
    }
}

let nums = [0,1,0,3,12];
moveZeroes(nums)
console.log(nums)
