/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
 * 26. Remove Duplicates from Sorted Array
 */

function removeDuplicates(nums: number[]): number {
    let leftLimit = 0

    for (let current = 1; current < nums.length; current++) {
        if (nums[leftLimit] !== nums[current]) {
            nums[++leftLimit] = nums[current]
        }
    }

    return leftLimit + 1
};

console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
