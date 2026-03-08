/**
 * https://leetcode.com/problems/product-of-array-except-self/description/
 * 238. Product of Array Except Self
 */

function productExceptSelf(nums: number[]): number[] {
    let result = []
    let prefix = 1
    let suffix = 1

    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix
        prefix = nums[i] * prefix
    }

    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] = result[i] * suffix
        suffix = nums[i] * suffix
    }

    return result
}

console.log(productExceptSelf([1,2,3,4]))
