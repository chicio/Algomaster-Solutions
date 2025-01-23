/**
 * 
 * 843. Guess the Word
 * Solved
 * Hard
 *
 * Topics
 * Companies
 * You are given an array of unique strings words where words[i] is six letters long. One word of words was chosen as a secret word.
 *
 * You are also given the helper object Master. You may call Master.guess(word) where word is a six-letter-long string, and it must be from words. Master.guess(word) returns:
 *
 * -1 if word is not from words, or
 * an integer representing the number of exact matches (value and position) of your guess to the secret word.
 *
 * There is a parameter allowedGuesses for each test case where allowedGuesses is the maximum number of times you can call Master.guess(word).
 *
 * For each test case, you should call Master.guess with the secret word without exceeding the maximum number of allowed guesses. You will get:
 *
 * - Either you took too many guesses, or you did not find the secret word. if you called Master.guess more than allowedGuesses times or if you did not call Master.guess with the secret word, or
 * - You guessed the secret word correctly. if you called Master.guess with the secret word with the number of calls to Master.guess less than or equal to allowedGuesses.
 *
 * The test cases are generated such that you can guess the secret word with a reasonable strategy (other than using the bruteforce method).
 *
 *
 * Example 1:
 *
 * Input: secret = "acckzz", words = ["acckzz","ccbazz","eiowzz","abcczz"], allowedGuesses = 10
 * Output: You guessed the secret word correctly.
 * Explanation:
 * master.guess("aaaaaa") returns -1, because "aaaaaa" is not in wordlist.
 * master.guess("acckzz") returns 6, because "acckzz" is secret and has all 6 matches.
 * master.guess("ccbazz") returns 3, because "ccbazz" has 3 matches.
 * master.guess("eiowzz") returns 2, because "eiowzz" has 2 matches.
 * master.guess("abcczz") returns 4, because "abcczz" has 4 matches.
 *
 * We made 5 calls to master.guess, and one of them was the secret, so we pass the test case.
 *
 * Example 2:
 *
 * Input: secret = "hamada", words = ["hamada","khaled"], allowedGuesses = 10
 * Output: You guessed the secret word correctly.
 * Explanation: Since there are two words, you can guess both.
 */
class Master {
      guess(word: string): number { return 0}
}

function findSecretWord(words: string[], master: Master) {
    let candidates = words

    for (let attempts = 0; attempts < 30; attempts++) {
        const guess = minMax(candidates); 
        const matches = master.guess(guess);

        if (matches === guess.length) {
            return;
        } else {
            let newCandidates = []

            for (let i = 0; i < candidates.length; i++) {
                let matchesForCandidate = 0
                let candidate = candidates[i]

                for (let k = 0; k < guess.length; k++) {
                    if (guess.charAt(k) === candidate.charAt(k)) {
                        matchesForCandidate++
                    }
                }
                
                if (matches === matchesForCandidate) {
                    newCandidates.push(candidate)
                }
            }

            candidates = newCandidates
        }
    }
};

/// https://en.wikipedia.org/wiki/Minimax
/// https://brilliant.org/wiki/minimax/
function minMax(words: string[]): string {
    let bestWord = words[0];
    let minMaxSize = Infinity;

    for (const word of words) {
        const groupSizes: Record<number, number> = {};

        for (const other of words) {
            let matchCount = 0;
            for (let k = 0; k < word.length; k++) {
                if (word[k] === other[k]) {
                    matchCount++;
                }
            }

            groupSizes[matchCount] = (groupSizes[matchCount] || 0) + 1;
        }

        const maxSize = Math.max(...Object.values(groupSizes));

        if (maxSize < minMaxSize) {
            minMaxSize = maxSize;
            bestWord = word;
        }
    }

    return bestWord;
}