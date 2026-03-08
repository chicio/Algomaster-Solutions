/**
 * https://leetcode.com/problems/happy-number/description/
 * 202. Happy Number
 */

function perfectDigitalInvariantFor(number: number) {
    let total = 0;
    
    while (number > 0) {
        total += Math.pow(number % 10, 2);
        number = Math.floor(number / 10);
    }

    return total;
}

function isHappy(n: number): boolean {
    let pdis = new Map<number, number>()
    
    while (n > 0 && pdis.get(n) === undefined) {
        let pdi = perfectDigitalInvariantFor(n)
        pdis.set(n, pdi)
        n = pdi
    }

    if (n === 1) {
        return true
    } else {
        return false
    }
};

console.log(isHappy(19))
console.log(isHappy(2))