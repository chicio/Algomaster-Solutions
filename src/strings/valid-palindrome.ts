/**
 * https://leetcode.com/problems/valid-palindrome/description/
 * 125. Valid Palindrome
 */

function isPalindrome(s: string): boolean {
    let stringWithoutSpaces = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s@;\"\[\]'\?]/g,"").toLowerCase()

    for (let i = 0, k = stringWithoutSpaces.length - 1; i < stringWithoutSpaces.length / 2; i++, k--) {
        if (stringWithoutSpaces.charAt(i) !== stringWithoutSpaces.charAt(k)) {
            return false
        }
    }

    return true
}

console.log(isPalindrome("A man, a plan, a canal: Panama"))
console.log(isPalindrome("race a car"))
console.log(isPalindrome(" "))
