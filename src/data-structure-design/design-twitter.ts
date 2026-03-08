/**
 * https://leetcode.com/problems/design-twitter/description/
 * 355. Design Twitter
 */

import { Heap } from "../heap";

interface Tweet { 
    id: number,
    counter: number
}

class Twitter {
    private counter: number = 0

    constructor(
        private readonly tweets: Map<number, Tweet[]> = new Map(),
        private readonly following: Map<number, Set<number>> = new Map()
    ) { }

    postTweet(userId: number, tweetId: number): void {
        if (this.tweets.has(userId)) {
            this.tweets.get(userId)!.push({ id: tweetId, counter: this.counter++ })
        } else {
            this.tweets.set(userId, [{ id: tweetId, counter: this.counter++ }])
        }
    }

    getNewsFeed(userId: number): number[] {
        const users = new Set<number>([userId, ...(this.following.get(userId) ?? [])]);
        const heap = new Heap<Tweet>((a, b) => a.counter - b.counter);

        for (const user of users) {
            for (const tweet of this.tweets.get(user) ?? []) {
                heap.insert(tweet);
                if (heap.size() > 10) heap.extract();
            }
        }

        const feed: number[] = [];
        while (heap.size() > 0) {
            feed.push(heap.extract()!.id);
        }

        return feed.reverse(); 
    }

    follow(followerId: number, followeeId: number): void {
        if (this.following.has(followerId)) {
            this.following.get(followerId)!.add(followeeId)
        } else {
            this.following.set(followerId, new Set([followeeId]))
        }
    }

    unfollow(followerId: number, followeeId: number): void {
        this.following.get(followerId)?.delete(followeeId);
    }
}