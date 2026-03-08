/**
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/
 * 122. Best Time to Buy and Sell Stock II
 */

function maxProfit2(prices: number[]): number {
    let maxProfit = 0

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1]
        }
    }

    return maxProfit
}

console.log(maxProfit2([7,1,5,3,6,4]))