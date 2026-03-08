/**
 * https://leetcode.com/problems/longest-common-prefix/description/
 * Longest Common Prefix
 */

function longestCommonPrefix(strs: string[]): string {
    strs.sort()

    const first = strs[0] ?? ""
    const last = strs[strs.length - 1] ?? ""
    const minStringLength = Math.min(first.length, last.length)
    let i = 0
    let common = ""

    while (first.charAt(i) === last.charAt(i) && i < minStringLength) {
        common = common + first.charAt(i)
        i++
    }

    return common
}

console.log(longestCommonPrefix(["flower","flow","flight"]))
console.log(longestCommonPrefix(["dog","racecar","car"]))
