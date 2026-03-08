/**
 * https://leetcode.com/problems/top-k-frequent-elements/description/
 * 347. Top K Frequent Elements
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