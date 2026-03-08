/**
 * https://leetcode.com/problems/design-a-food-rating-system/description/
 * 2353. Design a Food Rating System
 */

import { Heap } from "../heap";

interface Food { 
    cuisine: string, 
    rating: number 
}

interface FoodRating {
    name: string;
    rating: number;
}

class FoodRatings {
    private readonly foods: Map<string, Food> = new Map()
    private readonly cuisines: Map<string, Heap<FoodRating>> = new Map();

    constructor(
        foods: string[], 
        cuisines: string[], 
        ratings: number[]
    ) { 
        for (let i = 0; i < foods.length; i++) {
            const food = foods[i]
            const cuisine = cuisines[i]
            const rating = ratings[i]

            this.foods.set(food, { cuisine, rating })

            if (!this.cuisines.has(cuisine)) {
                this.cuisines.set(
                    cuisine, 
                    new Heap<FoodRating>((a, b) => {
                        if (a.rating === b.rating) { 
                            return a.name.localeCompare(b.name)
                        }

                        return b.rating - a.rating
                    })
                );
            }

            this.cuisines.get(cuisine)!.insert({ name: food, rating });
        }
    }

    changeRating(food: string, newRating: number): void {
        const info = this.foods.get(food)!;
        info.rating = newRating;

        this.cuisines.get(info.cuisine)!.insert({ name: food, rating: newRating });
    }

    highestRated(cuisine: string): string {
        const cuisineSorted = this.cuisines.get(cuisine)!

        while (
            cuisineSorted.peek() !== null && 
            cuisineSorted.peek()!.rating !== this.foods.get(cuisineSorted.peek()!.name)!.rating
        ) {
            cuisineSorted.extract()
        }

        return cuisineSorted.peek()!.name
    }
}
  