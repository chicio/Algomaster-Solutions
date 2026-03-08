/**
 * https://leetcode.com/problems/number-of-zero-filled-subarrays/description/
 * 2348. Number of Zero-Filled Subarrays
 */

function zeroFilledSubarray(nums: number[]): number {
    let numberOfSubarrays = 0
    let currentZeroCount = 0

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            currentZeroCount++
        } else {
            if (currentZeroCount > 0) {
                // see https://en.wikipedia.org/wiki/Arithmetic_progression
                let arithmeticProgression = (currentZeroCount * (currentZeroCount + 1))/2
                numberOfSubarrays = numberOfSubarrays + arithmeticProgression
                currentZeroCount = 0
            }
        }
    }

    if (currentZeroCount > 0) {
        numberOfSubarrays += (currentZeroCount * (currentZeroCount + 1)) / 2;
    }

    return numberOfSubarrays
}

console.log(zeroFilledSubarray([1,3,0,0,2,0,0,4]))
