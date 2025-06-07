/**
 * https://leetcode.com/problems/palindrome-linked-list/description/
 * 234. Palindrome Linked List
 *
 * Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: head = [1,2,2,1]
 * Output: true
 * Example 2:
 *
 *
 * Input: head = [1,2]
 * Output: false
 *
 *
 * Constraints:
 *
 * The number of nodes in the list is in the range [1, 105].
 * 0 <= Node.val <= 9
 *
 *
 * Follow up: Could you do it in O(n) time and O(1) space?
 */

import { ListNode } from "../list-node"

function isPalindrome(head: ListNode | null): boolean {
    let stack: number[] = []
    let current = head
    let count = 0

    while (current) {
        stack.push(current.val)
        current = current.next
    }

    current = head

    while (current) {
        if (stack[stack.length - 1] === current.val) {
            stack.pop()
        }
        current = current.next
    }

    return stack.length === 0
};
