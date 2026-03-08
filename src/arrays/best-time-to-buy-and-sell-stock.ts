/**
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
 * 121. Best Time to Buy and Sell Stock
 */

function maxProfit(prices: number[]): number {
    let minPrice = Infinity
    let maxProfit = 0

    for(let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i]
        } else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice)
        }
    }

    return maxProfit
}

console.log(maxProfit([7,1,5,3,6,4]))
