/**
 * 
 * https://leetcode.com/problems/top-k-frequent-elements/description/
 * 347. Top K Frequent Elements
 * 
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. 
 * 
 * Example 1:
 * 
 * Input: nums = [1,1,1,2,2,3], k = 2
 * 
 * Output: [1,2]
 * 
 * Example 2:
 * 
 * Input: nums = [1], k = 1
 * 
 * Output: [1]
 * 
 * Example 3:
 * 
 * Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
 * 
 * Output: [1,2]
 * 
 *  
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 105
 * -104 <= nums[i] <= 104
 * k is in the range [1, the number of unique elements in the array].
 * It is guaranteed that the answer is unique.
 *  
 * 
 * Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
 */

import { Heap } from "../heap"

function topKFrequent(nums: number[], k: number): number[] {
    const kFrequentElements = new Heap<{ element: number, frequency: number}>(
        (a, b) => a.frequency - b.frequency
    )
    const frequencies = new Map<number, number>()

    for (const num of nums) {
        frequencies.set(num, (frequencies.get(num) || 0) + 1)
    }

    for (const [element, frequency] of frequencies) {
        kFrequentElements.insert({ element, frequency })
        
        if (kFrequentElements.size() > k) {
            kFrequentElements.extract()
        }
    }

    const result: number[] = []

    while (kFrequentElements.size() > 0) {
        result.push(kFrequentElements.extract()!.element)
    }

    return result
}

console.log(topKFrequent([1,2,1,2,1,2,3,1,3,2], 2)) // Output: [1,2]