/**
 * https://leetcode.com/problems/stock-price-fluctuation/
 * 2034. Stock Price Fluctuation
 */

/// Impossible to use a BST for this problem because of typescript, I chose another path (heaps)

import {Heap} from "../heap";

interface StockValue {
    timestamp: number;
    price: number;
}

class StockPrice {
    private maxStock = new Heap<StockValue>((a, b) => b.price - a.price)
    private minStock = new Heap<StockValue>((a, b) => a.price - b.price)
    private prices = new Map<number, number>();
    private latest: number = 0;

    update(timestamp: number, price: number): void {
        this.prices.set(timestamp, price);
        this.latest = Math.max(this.latest, timestamp)
        this.minStock.insert({ price, timestamp })
        this.maxStock.insert({ price, timestamp })
    }

    current(): number {
        return this.prices.get(this.latest)!;
    }

    maximum(): number {
        while (true) {
            const stockValue = this.maxStock.peek()!;
            if (this.prices.get(stockValue.timestamp) === stockValue.price) {
                return stockValue.price;
            }

            this.maxStock.extract();
        }
    }

    minimum(): number {
        while (true) {
            const stockValue = this.minStock.peek()!;
            if (this.prices.get(stockValue.timestamp) === stockValue.price) {
                return stockValue.price;
            }

            this.minStock.extract();
        }
    }
}
