/**
 * https://leetcode.com/problems/online-stock-span/description/
 * 901. Online Stock Span
 */

class StockSpanner {
    constructor(private readonly stack: { price: number; days: number }[] = []) {}

    next(price: number): number {
        let days = 1

        while (this.stack.length > 0 && this.stack[this.stack.length - 1].price <= price) {
            days = days + this.stack.pop()!.days
        }

        this.stack.push({ price, days })

        return days
    }
}
