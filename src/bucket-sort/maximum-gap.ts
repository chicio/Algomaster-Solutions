/**
 * https://leetcode.com/problems/maximum-gap/description/
 * 164. Maximum Gap
 *
 * Given an integer array nums, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0.
 *
 * You must write an algorithm that runs in linear time and uses linear extra space.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [3,6,9,1]
 * Output: 3
 * Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.
 * Example 2:
 *
 * Input: nums = [10]
 * Output: 0
 * Explanation: The array contains less than 2 elements, therefore return 0.
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 105
 * 0 <= nums[i] <= 109
 */

interface Bucket {
    min: number
    max: number
}

function maximumGap(nums: number[]): number {
    let min = Infinity
    let max = -Infinity

    for (let i = 0; i < nums.length; i++) {
        const current = nums[i]
        min = Math.min(min, current)
        max = Math.max(max, current)
    }

    if (min === max) {
        return 0;
    }

    const bucketSize = Math.ceil((max - min) / (nums.length - 1))
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets: Bucket[] = Array.from({ length: bucketCount }, () => ({ min: Infinity, max: -Infinity }));

    for (const num of nums) {
        const index = Math.floor((num - min) / bucketSize);
        buckets[index].min = Math.min(num, buckets[index].min);
        buckets[index].max = Math.max(num, buckets[index].max);
    }

    let maxGap = 0;
    let prevMax = min;

    for (const bucket of buckets) {
        if (bucket.min !== Infinity) {
            maxGap = Math.max(maxGap, bucket.min - prevMax);
            prevMax = bucket.max;
        }
    }

    return maxGap
}

console.log(maximumGap([3,6,9,1]))
