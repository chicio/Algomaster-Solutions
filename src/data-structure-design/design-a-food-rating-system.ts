/**
 * https://leetcode.com/problems/design-a-food-rating-system/description/
 * 2353. Design a Food Rating System
 * 
 * Design a food rating system that can do the following:
 * 
 * Modify the rating of a food item listed in the system.
 * Return the highest-rated food item for a type of cuisine in the system.
 * Implement the FoodRatings class:
 * 
 * FoodRatings(String[] foods, String[] cuisines, int[] ratings) Initializes the system. The food items are described by foods, cuisines and ratings, all of which have a length of n.
 * foods[i] is the name of the ith food,
 * cuisines[i] is the type of cuisine of the ith food, and
 * ratings[i] is the initial rating of the ith food.
 * void changeRating(String food, int newRating) Changes the rating of the food item with the name food.
 * String highestRated(String cuisine) Returns the name of the food item that has the highest rating for the given type of cuisine. If there is a tie, return the item with the lexicographically smaller name.
 * Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.
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
  