/**
 * https://leetcode.com/problems/increasing-triplet-subsequence/description/
 * 334. Increasing Triplet Subsequence
 */

function increasingTriplet(nums: number[]): boolean {
    let currentI = Infinity
    let currentJ = Infinity

    for (let current = 0; current < nums.length; current++) {
        if (nums[current] <= currentI) {
            currentI = nums[current]
        } else if (nums[current] <= currentJ) {
            currentJ = nums[current]
        } else {
            return true
        }
    }

    return false
};

console.log([2,1,5,0,4,6])
