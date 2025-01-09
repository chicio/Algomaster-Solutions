/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
 * Remove Duplicates from Sorted Array
 * Easy
 *
 *
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.
 *
 * Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:
 *
 * Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
 * Return k.
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
