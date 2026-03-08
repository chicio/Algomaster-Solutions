/**
 * https://leetcode.com/problems/rotate-array/description/
 * 189. Rotate Array
 */

function rotate(nums: number[], k: number): void {
    const kModulo = k % nums.length

    for(let i = 0, j = nums.length - 1; i < j; i++, j--) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }

    for(let i = 0, j = kModulo - 1; i < j; i++, j--) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }

    for(let i = kModulo, j = nums.length - 1; i < j; i++, j--) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
}

const example = [1,2,3,4,5,6,7]
rotate(example, 3)

console.log(example)
