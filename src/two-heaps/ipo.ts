/**
 * https://leetcode.com/problems/ipo/description/
 * 502. IPO
 */

import {Heap} from "../heap";

type Project = {
    capital: number;
    profits: number;
}

function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
    const minCapital = new Heap<Project>((a, b) => a.capital - b.capital)
    const maxProfits = new Heap<Project>((a, b) => b.profits - a.profits)

    for (let i = 0; i < capital.length; i++) {
        minCapital.insert({ capital: capital[i], profits: profits[i] })
    }

    let currentCapital = w

    for (let i = 0; i < k; i++) {
        while (minCapital.size() > 0 && minCapital.peek()!.capital <= currentCapital) {
            maxProfits.insert(minCapital.extract()!)
        }

        if (maxProfits.size() === 0) {
            break;
        }

        currentCapital = currentCapital + maxProfits.extract()!.profits
    }

    return currentCapital
}

console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1])) // Output: 4
