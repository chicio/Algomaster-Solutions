/**
 * https://leetcode.com/problems/sum-of-two-integers/description/
 * 371. Sum of Two Integers
 *
 * Given two integers a and b, return the sum of the two integers without using the operators + and -.
 *
 *
 *
 * Example 1:
 *
 * Input: a = 1, b = 2
 * Output: 3
 * Example 2:
 *
 * Input: a = 2, b = 3
 * Output: 5
 *
 *
 * Constraints:
 *
 * -1000 <= a, b <= 1000
 */

// Well, this is quite a bit of a challenge. 
// After getting the general approach, i was getting lost in the loop with temp variables....
function getSum(a: number, b: number): number {
    let carry = a & b
    let sum = a ^ b

    while (carry) {
        let carryShift = carry << 1
        carry = sum & carryShift
        sum = sum ^ carryShift
    }

    return sum
};

console.log(getSum(3, 2))