/**
 * https://leetcode.com/problems/is-subsequence/description/
 * 392. Is Subsequence
 */

function isSubsequence(s: string, t: string): boolean {
    let sPosition = 0

    for (let tPosition = 0; tPosition < t.length; tPosition++) {
        let currentCharS = s.charAt(sPosition)
        let currentCharT = t.charAt(tPosition)

        if (currentCharS === currentCharT) {
            sPosition++
        }
    }

    return sPosition === s.length
}

console.log(isSubsequence("axc", "ahbgdc"))
console.log(isSubsequence("abc", "ahbgdc"))
