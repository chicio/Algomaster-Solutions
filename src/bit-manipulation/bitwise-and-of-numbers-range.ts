/**
 * https://leetcode.com/problems/bitwise-and-of-numbers-range/description/
 * 201. Bitwise AND of Numbers Range
 *
 * Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.
 *
 *
 *
 * Example 1:
 *
 * Input: left = 5, right = 7
 * Output: 4
 *
 * Example 2:
 *
 * Input: left = 0, right = 0
 * Output: 0
 *
 * Example 3:
 *
 * Input: left = 1, right = 2147483647
 * Output: 0
 *
 *
 * 0 <= left <= right <= 231 - 1
 */

function rangeBitwiseAnd(left: number, right: number): number {
    let shift = 0

    while (left !== right) {
        left = left >> 1
        right = right >> 1
        shift++
    }

    return left << shift
};

// Beautiful solution from ChatGPT notes => use xor to find the different bits and then use the mask to get the result (common bits between left and right)
function rangeBitwiseAnd2(left: number, right: number): number {
    let diff = left ^ right;  
    let mask = ~diff + 1;     
    return left & mask;
};

console.log(rangeBitwiseAnd(5, 7))