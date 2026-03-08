/**
 * https://leetcode.com/problems/max-value-of-equation/description/
 * 1499. Max Value of Equation
 */

/// Failed the first time. See below.
///Data una lista di punti 2D ordinati per x, devi trovare il massimo valore dell’espressione:
/// \text{max}(y_i + y_j + |x_i - x_j|) \quad \text{tale che } |x_i - x_j| \leq k \text{ e } i < j
/// Poiché i punti sono ordinati per x, e i < j, possiamo rimuovere il valore assoluto, trasformandolo in:
/// \text{max}(y_j + y_i + (x_j - x_i)) = \text{max}((y_i - x_i) + (y_j + x_j)) \quad \text{con } x_j - x_i \leq k
function findMaxValueOfEquation(points: number[][], k: number): number {
    let deque: [number, number][] = [];
    let maxVal = -Infinity;

    for (const [x, y] of points) {
        while (deque.length && x - deque[0][1] > k) {
            deque.shift();
        }

        if (deque.length > 0) {
            maxVal = Math.max(maxVal, y + x + deque[0][0]);
        }

        while (deque.length && deque[deque.length - 1][0] <= y - x) {
            deque.pop();
        }

        deque.push([y - x, x]);
    }

    return maxVal;
}


console.log(findMaxValueOfEquation([[1,3],[2,0],[5,10],[6,-10]], 1))
