/**
 * https://leetcode.com/problems/top-k-frequent-words/description/
 * 692. Top K Frequent Words
 *
 * Given an array of strings words and an integer k, return the k most frequent strings.
 *
 * Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.
 *
 *
 *
 * Example 1:
 *
 * Input: words = ["i","love","leetcode","i","love","coding"], k = 2
 * Output: ["i","love"]
 * Explanation: "i" and "love" are the two most frequent words.
 * Note that "i" comes before "love" due to a lower alphabetical order.
 * Example 2:
 *
 * Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
 * Output: ["the","is","sunny","day"]
 * Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.
 *
 *
 * Constraints:
 *
 * 1 <= words.length <= 500
 * 1 <= words[i].length <= 10
 * words[i] consists of lowercase English letters.
 * k is in the range [1, The number of unique words[i]]
 *
 *
 * Follow-up: Could you solve it in O(n log(k)) time and O(n) extra space?
 *
 */

function topKFrequent(words: string[], k: number): string[] {
    let wordsFrequencies = new Map<string, number>()

    for (let i = 0; i < words.length; i++) {
        let currentWord = words[i]
        wordsFrequencies.set(currentWord, (wordsFrequencies.get(currentWord) || 0) + 1)
    }

    let bucketsOfFrequencies = new Map<number, string[]>()

    for (const [word, frequency] of wordsFrequencies) {
        let bucket = bucketsOfFrequencies.get(frequency) || []
        bucket.push(word)
        bucketsOfFrequencies.set(frequency, bucket)
    }

    let result = []

    let sortedFrequencies = Array
        .from(bucketsOfFrequencies.keys())
        .sort((a, b) => b - a)

    console.log(sortedFrequencies)

    for (const frequency of sortedFrequencies) {
        let bucket = bucketsOfFrequencies.get(frequency)!
        result.push(...bucket.sort())
    }

    return result.slice(0, k);
}

console.log(topKFrequent(["i","love","leetcode","i","love","coding"], 2))
