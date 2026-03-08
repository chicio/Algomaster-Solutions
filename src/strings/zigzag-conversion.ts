/**
 * https://leetcode.com/problems/zigzag-conversion/description/
 * 6. Zigzag Conversion
 */

function convert(s: string, numRows: number): string {
    if (numRows === 1) {
        return s
    }

    let zigZagStrings: string[] = Array(numRows).fill('')
    let currentArrayIndex = 0
    let direction: 1 | -1 = 1

    for (let i = 1; i <= s.length; i++) {
        zigZagStrings[currentArrayIndex] = zigZagStrings[currentArrayIndex] + s.charAt(i - 1)

        if (currentArrayIndex === 0) {
            direction = 1
        }

        if (currentArrayIndex === numRows - 1) {
            direction = -1
        }

        currentArrayIndex += direction
    }

    return zigZagStrings.join('')
}

console.log(convert("PAYPALISHIRING", 3))
