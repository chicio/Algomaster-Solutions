/**
 * https://leetcode.com/problems/minimum-cost-to-hire-k-workers/description/
 * 857. Minimum Cost to Hire K Workers
 */

import { Heap } from "../heap"

interface Worker { 
    ratio: number
    quality: number
}

function mincostToHireWorkers(quality: number[], wage: number[], k: number): number {
    const workers: Worker[] = []

    for (let i = 0; i < quality.length; i++) {
        let currentQuality = quality[i]
        let ratio = wage[i] / currentQuality
        workers.push({ ratio, quality: currentQuality })
    }

    workers.sort((a, b) => a.ratio - b.ratio)
    
    const maxHeap = new Heap<number>((a, b) => b - a)
    let sumQualities = 0
    let result = Infinity

    for (let i = 0; i < workers.length; i++) {
        let currentWorker = workers[i]
        sumQualities = sumQualities + currentWorker.quality
        
        maxHeap.insert(currentWorker.quality)

        if (maxHeap.size() > k) {
            sumQualities = sumQualities - maxHeap.extract()!
        }

        if (maxHeap.size() === k) {
            result = Math.min(result, sumQualities * currentWorker.ratio)
        }
    }

    return result
};