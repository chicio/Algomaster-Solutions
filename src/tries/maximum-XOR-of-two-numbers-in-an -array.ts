/**
 * https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/description/
 * 421. Maximum XOR of Two Numbers in an Array
 *
 * Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [3,10,5,25,2,8]
 * Output: 28
 * Explanation: The maximum result is 5 XOR 25 = 28.
 * Example 2:
 *
 * Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
 * Output: 127
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 2 * 105
 * 0 <= nums[i] <= 231 - 1
 */

class TrieNodeNumber {
    constructor(
        public children: Map<number, TrieNodeNumber> = new Map()
    ) { }
}

class TrieXor {
    private root: TrieNodeNumber = new TrieNodeNumber()

    insert(num: number): void {
        let node = this.root

        for (let i = 31; i >= 0; i--) {
            let bit = (num >> i) & 1;

            if (!node.children.has(bit)) {
                node.children.set(bit, new TrieNodeNumber());
            }

            node =  node.children.get(bit)!;
        }
    }

    xor(num: number): number {
        let node = this.root;
        let maxXOR = 0;

        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            const oppositeBit = 1 - bit;

            if (node.children.has(oppositeBit)) {
                maxXOR |= (1 << i);
                node = node.children.get(oppositeBit)!;
            } else {
                node =  node.children.get(bit)!;
            }
        }

        return maxXOR;
    }
}

function findMaximumXOR(nums: number[]): number {
    const search  = new TrieXor()
    let maxXor = 0

    search.insert(nums[0])

    for (let i = 1; i < nums.length; i++) {
        let currentNum = nums[i]
        let newXor = search.xor(currentNum)

        if (newXor > maxXor) {
            maxXor = newXor
        }

        search.insert(currentNum)
    }

    return maxXor
}

console.log(findMaximumXOR([3, 10, 5, 25, 2, 8])) // Output: 28
