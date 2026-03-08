/**
 * https://leetcode.com/problems/climbing-stairs/description/
 * 70. Climbing Stairs
 */

function climbStairs(n: number): number {
    let one = 1
    let two = 1

    for (let i = 0; i < n - 1; i++) {
        const tempOne = one
        one = one + two
        two = tempOne 
    }

    return one
};

console.log(climbStairs(2)) // 2
console.log(climbStairs(3)) // 3
console.log(climbStairs(4)) // 5
console.log(climbStairs(5)) // 8
