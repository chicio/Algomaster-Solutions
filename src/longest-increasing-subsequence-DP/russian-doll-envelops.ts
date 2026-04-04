/**
 * https://leetcode.com/problems/russian-doll-envelopes/
 * 354. Russian Doll Envelopes
 */

function maxEnvelopes(envelopes: number[][]): number {
    envelopes.sort((a, b) => {
        if (a[0] === b[0]) { 
            return b[1] - a[1]
        }
        
        return a[0] - b[0]
    })
    const heights = envelopes.map(e => e[1])
    const tails: number[] = []

    for (const h of heights) {
        let left = 0
        let right = tails.length

        while (left < right) {
            const mid = Math.floor((left + right) / 2)
            if (tails[mid] < h) {
                left = mid + 1
            } else {
                right = mid
            }
        }

        if (left === tails.length) {
            tails.push(h)
        } else {
            tails[left] = h
        }
    }

    return tails.length
}
